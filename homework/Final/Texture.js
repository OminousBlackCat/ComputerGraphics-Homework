var scene = null;
var camera = null;
var renderer = null;
var control = null;
var cubeMesh = null;
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
    camera = new THREE.PerspectiveCamera(45,1,0.1,300);//透视投影照相机
    camera.position.set(0, 8, 10);//相机位置
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



    var cubeGeo = new THREE.CubeGeometry(2, 2, 2, 5, 5, 5);
    var cubeMat = new THREE.MeshPhongMaterial({
        color:0xFF0000,
        wireframe:false
    });
    cubeMesh = new THREE.Mesh(cubeGeo, cubeMat);
    cubeMesh.rotation.y = -0.25*Math.PI;
    cubeMesh.position.set(0, 0.5, 0);
    scene.add(cubeMesh);


    var texture = new THREE.TextureLoader().load( "cheen.png" );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 5, 5 );

    var sphereGeo = new THREE.SphereGeometry(1.5, 40, 16);
    var sphereMat = new THREE.MeshPhongMaterial({
        map:texture,
        color:0xFFFFFF,
        wireframe:true
    });
    sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    sphereMesh.position.set(4, 0, 0);
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
    light.position.set(4, 5, 0);//光源位置置
    var object = new THREE.Object3D();
    object.position.set(4,0,0);
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
        renderer.render(scene,camera);
    }
}

function lightRight() {
    if(light.position.x <= 20){
        light.position.x += 0.2;
        renderer.render(scene,camera);
    }
}

function draw() {
    renderer.render(scene, camera);//调用WebGLRenderer的render函数刷新场景
}