var scene = null;
var camera = null;
var renderer = null;
var portalMesh = null;
var hammerMesh = null;
var youmuMesh = null;
var grenadeMesh = null;
var id = null;
var myCanvas = null;


window.onload = function init() {
    renderer = new THREE.WebGLRenderer({//渲染器
        canvas: document.getElementById('myCanvas')//画布
    });
    myCanvas = document.getElementById('myCanvas');
    renderer.setClearColor(0x808080);//画布颜色
    scene = new THREE.Scene();//创建场景
    camera = new THREE.PerspectiveCamera(45,1,0.1,100);//透视投影照相机
    camera.position.set(0, 25, -10);//相机位置
    camera.lookAt(new THREE.Vector3(0, 5, 0));//lookAt()设置相机所看的位置
    scene.add(camera);//把相机添加到场景中

    var portalOBJLoader = new THREE.OBJLoader();
    var portalMTLLoader = new THREE.MTLLoader();
    portalMTLLoader.load('Portal Gun.mtl', function(material){
        portalOBJLoader.setMaterials(material);
        portalOBJLoader.load('Portal Gun.obj',function (obj){
            obj.scale.set(1,1,1);
            portalMesh = obj;
            console.log(portalMesh);
            scene.add(obj);
        })
    });

    var hammerOBJLoader = new THREE.OBJLoader();
    var hammerMTLLoader = new THREE.MTLLoader();
    hammerMTLLoader.load('Mjolnir.mtl', function(material){
        hammerOBJLoader.setMaterials(material);
        hammerOBJLoader.load('Mjolnir.obj',function (obj){
            obj.position.set(5,0,0);
            obj.scale.set(0.2,0.2,0.2);
            hammerMesh = obj;
            console.log(hammerMesh);
            scene.add(obj);
        })
    });


    var youmuOBJLoader = new THREE.OBJLoader();
    var youmuMTLLoader = new THREE.MTLLoader();
    youmuMTLLoader.load('katana.mtl', function(material){
        youmuOBJLoader.setMaterials(material);
        youmuOBJLoader.load('katana.obj',function (obj){
            obj.position.set(10,0,0);
            obj.scale.set(0.02,0.02,0.02);
            youmuMesh = obj;
            console.log(youmuMesh);
            scene.add(obj);
        })
    });



    var grenadeOBJLoader = new THREE.OBJLoader();
    var grenadeMTLLoader = new THREE.MTLLoader();
    grenadeMTLLoader.load('Grenade.mtl', function(material){
        grenadeOBJLoader.setMaterials(material);
        grenadeOBJLoader.load('Grenade.obj',function (obj){
            obj.position.set(15,0,0);
            obj.scale.set(0.1,0.1,0.1);
            grenadeMesh = obj;
            console.log(grenadeMesh);
            scene.add(obj);
        })
    });





    var light = new THREE.SpotLight(0xFFFFFF);//光源颜色
    light.position.set(20, 10, 5);//光源位置
    scene.add(light);//光源添加到场景中
    id = setInterval(draw,10);//每隔20s重绘一次

    var control = new THREE.OrbitControls(camera,renderer.domElement);
    control.update();
};



function draw() {
    renderer.render(scene, camera);//调用WebGLRenderer的render函数刷新场景
}