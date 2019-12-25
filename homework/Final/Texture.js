var scene = null;
var camera = null;
var renderer = null;
var control = null;
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

    var planeGeometry = new THREE.PlaneGeometry(60,20,1,1);
    var planeMaterial = new THREE.MeshPhysicalMaterial({color: 0xcccccc,side: THREE.DoubleSide});
    var plane = new THREE.Mesh(planeGeometry,planeMaterial);
    scene.add(plane);
    plane.rotation.x = -0.5*Math.PI;
    plane.position.y = -0.8;
    plane.receiveShadow = true;

    document.body.onmousewheel = function(event) {
        event = event || window.event;
        if(event.deltaY < 0){
            zoomIn();
        }
        if(event.deltaY > 0){
            zoomOut();
        }
    };


    light = new THREE.SpotLight(0xFFFFFF,1,50,0.5,0.5);//光源颜色
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

function draw() {
    renderer.render(scene, camera);//调用WebGLRenderer的render函数刷新场景
}