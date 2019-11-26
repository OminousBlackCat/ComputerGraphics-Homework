var scene = null;
var camera = null;
var renderer = null;
var mesh = null;
var id = null;
var myCanvas = null;


window.onload = function init() {
    renderer = new THREE.WebGLRenderer({//渲染器
        canvas: document.getElementById('myCanvas')//画布
    });
    myCanvas = document.getElementById('myCanvas');
    renderer.setClearColor(0x000000);//画布颜色
    scene = new THREE.Scene();//创建场景
    camera = new THREE.PerspectiveCamera(45,1,0.1,100);//透视投影照相机
    camera.position.set(0, 25, -10);//相机位置
    camera.lookAt(new THREE.Vector3(0, 5, 0));//lookAt()设置相机所看的位置
    scene.add(camera);//把相机添加到场景中

    var OBJloader = new THREE.OBJLoader();
    var MTLloader = new THREE.MTLloader();
    MTLloader.load('thor hammer .mtl', function(material){
        consle.log(material);
        OBJloader.setMaterials(material);
        OBJLoader.load('thor hammer .obj',function (obj){
            obj.scale.set(0.05,0.05,0.05);
            mesh = obj;
            console.log(mesh);
            scene.add(obj);
        })
    })

    var light = new THREE.SpotLight(0xffffff);//光源颜色
    light.position.set(20, 10, 5);//光源位置
    scene.add(light);//光源添加到场景中
    id = setInterval(draw,10);//每隔20s重绘一次
};



function draw() {
    renderer.render(scene, camera);//调用WebGLRenderer的render函数刷新场景
}