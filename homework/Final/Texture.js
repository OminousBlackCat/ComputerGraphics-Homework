var scene = null;
var camera = null;
var renderer = null;
var control = null;
var cubeMesh = null;
var cubeMesh2 = null;
var sphereMesh = null;
var id = null;
var myCanvas = null;
var light = null;


window.onload = function init() {
    renderer = new THREE.WebGLRenderer({//渲染器
        canvas: document.getElementById('myCanvas')//画布
    });
    myCanvas = document.getElementById('myCanvas');
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000);//画布颜色
    scene = new THREE.Scene();//创建场景

    scene.background = new THREE.CubeTextureLoader().load([
        "Textures/posx.jpg",
        "Textures/negx.jpg",
        "Textures/posy.jpg",
        "Textures/negy.jpg",
        "Textures/posz.jpg",
        "Textures/negz.jpg"
        ]);

    camera = new THREE.PerspectiveCamera(45,1,0.1,300);//透视投影照相机
    camera.position.set(0, 10, 10);//相机位置
    camera.lookAt(new THREE.Vector3(0, 0, 0));//lookAt()设置相机所看的位置
    scene.add(camera);//把相机添加到场景中


    var plane2Geometry = new THREE.PlaneGeometry(30,5,1,1);
    var plane2Material = new THREE.MeshPhysicalMaterial({color: 0xcccccc,side: THREE.DoubleSide});
    var plane2 = new THREE.Mesh(plane2Geometry,plane2Material);
    scene.add(plane2);
    plane2.rotation.x = -0.5*Math.PI;
    plane2.position.y = -0.8;
    plane2.position.x = 0;
    plane2.receiveShadow = true;

    var texture = new THREE.TextureLoader().load( "Textures/90003.jpg" );
    var textureB = new THREE.TextureLoader().load("Textures/90003bump.jpg");


    var cubeGeo = new THREE.CubeGeometry(2, 2, 2, 5, 5, 5);
    var cubeMat = new THREE.MeshPhongMaterial({
        wireframe:false
    });
    cubeMat.map = texture;
    cubeMat.bumpMap = textureB;
    cubeMat.bumpscale = 0.4;
    cubeMesh = new THREE.Mesh(cubeGeo, cubeMat);
    cubeMesh.rotation.y = -0.25*Math.PI;
    cubeMesh.position.set(1, 0.5, 0);
    cubeMesh.castShadow = true;
    scene.add(cubeMesh);

    var cubeGeo2 = new THREE.CubeGeometry(2, 2, 2, 5, 5, 5);
    var cubeMat2 = new THREE.MeshPhongMaterial({
        wireframe:false
    });
    cubeMat2.map = texture;
    cubeMesh2 = new THREE.Mesh(cubeGeo2, cubeMat2);
    cubeMesh2.rotation.y = -0.25*Math.PI;
    cubeMesh2.position.set(-2, 0, 0);
    cubeMesh2.castShadow = true;
    scene.add(cubeMesh2);

    var sphereGeo = new THREE.SphereBufferGeometry(1.5, 40, 16);//创建球体
    var sphereMat = new THREE.MeshLambertMaterial( { envMap: scene.background });
    sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);//创建球体网格模型
    sphereMesh.position.set(4, 0, 0);//设置球的坐标
    sphereMesh.castShadow = true;
    scene.add(sphereMesh);



    document.body.onmousewheel = function(event) {
        event = event || window.event;
        if(event.deltaY < 0){
            zoomIn();
        }
        if(event.deltaY > 0){
            zoomOut();
        }
    };



    window.onkeydown = function(event) {
        var key = String.fromCharCode(event.keyCode);
        switch (key) {
            case 'W':
                stop = 0;
                zoomIn();
                break;
            case 'S':
                stop = 0;
                zoomOut();
                break;
            case 'A':
                cameraLeft();
                break;
            case 'D':
                cameraRight();
                break;
            case 'Q':
                lightLeft();
                break;
            case 'E':
                lightRight();
                break;
        }
    };



    light = new THREE.SpotLight(0xFFFFFF,1,50,0.5,0.1);//光源颜色
    light.position.set(0, 5, 0);//光源位置置
    var object = new THREE.Object3D();
    object.position.set(0,0,0);
    light.target = object;
    light.castShadow = true;
    light.shadowCameraVisible = true;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 20;
    light.shadowMapHeight = 1024;
    light.shadowMapWidth = 1024;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;

    scene.add(object);
    scene.add(light);//光源添加到场景中
    id = setInterval(draw,10);//每隔20s重绘一次

    var helper = new THREE.CameraHelper(light.shadow.camera );
    scene.add(helper);

};


var zoomparameter  = 0.6;
function zoomIn() {
    if(camera.position.y > 1.5){
        camera.position.y -= (0.15 * zoomparameter);
        camera.position.z -= (0.2 * zoomparameter);
        renderer.render(scene,camera);
    }
}

function zoomOut() {
    if(camera.position.y < 15){
        camera.position.y += (0.15 * zoomparameter);
        camera.position.z += (0.2 * zoomparameter);
        renderer.render(scene,camera);
    }
}

function cameraLeft() {
    if(camera.position.x >= -5){
        camera.position.x -= 0.2;
        renderer.render(scene,camera);
    }
}

function cameraRight() {
    if(camera.position.x <= 20){
        camera.position.x += 0.2;
        renderer.render(scene,camera);
    }
}

function lightLeft() {
    if(light.position.x >= -5){
        light.position.x -= 0.2;
        light.target.position.x -= 0.2;
        renderer.render(scene,camera);
    }
}

function lightRight() {
    if(light.position.x <= 20){
        light.position.x += 0.2;
        light.target.position.x += 0.2;
        renderer.render(scene,camera);
    }
}

function draw() {
    renderer.render(scene, camera);//调用WebGLRenderer的render函数刷新场景
}