var scene = null;
var camera = null;
var renderer = null;
var control = null;
var portalMesh = null;
var hammerMesh = null;
var swordMesh = null;
var grenadeMesh = null;
var id = null;
var myCanvas = null;
var light = null;


window.onload = function init() {
    renderer = new THREE.WebGLRenderer({//渲染器
        canvas: document.getElementById('myCanvas')//画布
    });
    myCanvas = document.getElementById('myCanvas');
    renderer.setClearColor(0x808080);//画布颜色
    scene = new THREE.Scene();//创建场景
    camera = new THREE.PerspectiveCamera(45,1,0.1,300);//透视投影照相机
    camera.position.set(0, 8, 10);//相机位置
    camera.lookAt(new THREE.Vector3(0, 0, 0));//lookAt()设置相机所看的位置
    scene.add(camera);//把相机添加到场景中

    var portalOBJLoader = new THREE.OBJLoader();
    var portalMTLLoader = new THREE.MTLLoader();
    portalMTLLoader.load('Portal Gun.mtl', function(material){
        portalOBJLoader.setMaterials(material);
        portalOBJLoader.load('Portal Gun.obj',function (obj){
            obj.scale.set(1,1,1);
            portalMesh = obj;
            console.log(portalMesh);
            scene.add(portalMesh);
        })
    });

    var hammerOBJLoader = new THREE.OBJLoader();
    var hammerMTLLoader = new THREE.MTLLoader();
    hammerMTLLoader.load('Mjolnir.mtl', function(material){
        hammerOBJLoader.setMaterials(material);
        hammerOBJLoader.load('Mjolnir.obj',function (obj){
            obj.position.set(5,0,0);
            obj.scale.set(0.3,0.3,0.3);
            hammerMesh = obj;
            console.log(hammerMesh);
            scene.add(hammerMesh);
        })
    });


    var youmuOBJLoader = new THREE.OBJLoader();
    var youmuMTLLoader = new THREE.MTLLoader();
    youmuMTLLoader.load('katana.mtl', function(material){
        youmuOBJLoader.setMaterials(material);
        youmuOBJLoader.load('katana.obj',function (obj){
            obj.position.set(10,0,0);
            obj.scale.set(0.012,0.012,0.012);
            swordMesh = obj;
            console.log(swordMesh);
            scene.add(obj);
        })
    });

    var grenadeOBJLoader = new THREE.OBJLoader();
    var grenadeMTLLoader = new THREE.MTLLoader();
    grenadeMTLLoader.load('Grenade.mtl', function(material){
        grenadeOBJLoader.setMaterials(material);
        grenadeOBJLoader.load('Grenade.obj',function (obj){
            obj.position.set(15,0,0);
            obj.scale.set(0.005,0.005,0.005);
            grenadeMesh = obj;
            console.log(grenadeMesh);
            scene.add(obj);
        })
    });




    document.getElementById("portalGun").onclick = function () {
        light.position.set(0,5,0);
        light.target = portalMesh;
        camera.position.set(0, 7.5, 10);
        camera.lookAt(new THREE.Vector3(0, 0, 0));

    };
    document.getElementById("hammer").onclick = function () {
        light.position.set(5,5,0);
        light.target = hammerMesh;
        camera.position.set(5, 7.5, 10);
        camera.lookAt(new THREE.Vector3(5, 0, 0));


    };

    document.getElementById("sword").onclick = function () {
        light.position.set(10,5,0);
        light.target = swordMesh;
        camera.position.set(10, 7.5, 10);
        camera.lookAt(new THREE.Vector3(10, 0, 0));
        console.log(light);

    };

    document.getElementById('grenade').onclick = function () {
        light.position.set(15,5,0);
        light.target = grenadeMesh;

        camera.position.set(15, 7.5, 10);
        camera.lookAt(new THREE.Vector3(15, 0, 0));
    };

    document.getElementById('rotate').onclick = function () {
        PortalR();
        HammerR();
        YoumuR();
        GrenadeR();
    };

    document.getElementById('near').onclick = function () {
        zoomIn();
    };

    document.getElementById('far').onclick = function () {
        zoomOut();
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
        }
    };


    light = new THREE.SpotLight(0x7FFF00,1,30,0.5,0);//光源颜色
    light.position.set(0, 5, 0);//光源位置置
    var object = new THREE.Object3D();
    object.position.set(0,0,0);
    light.target = object;

    scene.add(object);
    scene.add(light);//光源添加到场景中
    id = setInterval(draw,10);//每隔20s重绘一次



    control = new THREE.OrbitControls(camera,renderer.domElement);
    control.update();
};

var zoomparameter  = 0.3;
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

function PortalR(){
    portalMesh.rotateY(Math.PI * -0.005);
    requestAnimationFrame(PortalR);
}

function HammerR(){
    hammerMesh.rotateY(Math.PI * -0.005);
    requestAnimationFrame(HammerR);
}

function YoumuR(){
    swordMesh.rotateY(Math.PI * -0.005);
    requestAnimationFrame(YoumuR);
}

function GrenadeR(){
    grenadeMesh.rotateY(Math.PI * -0.005);
    requestAnimationFrame(GrenadeR);
}

function stop(){
    if(id!=null){
        cancelAnimationFrame(id);
        id=null;
    }
}

function draw() {
    renderer.render(scene, camera);//调用WebGLRenderer的render函数刷新场景
}