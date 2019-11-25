var scene = null;
var camera = null;
var renderer = null;
var mesh = null;
var id = null;
var myCanvas = null;
var clock = new THREE.Clock();
var mixer;

window.onload = function init() {
    renderer = new THREE.WebGLRenderer({//渲染器
        canvas: document.getElementById('myCanvas')//画布
    });
    myCanvas = document.getElementById('myCanvas');
    renderer.setClearColor(0x000000);//画布颜色
    scene = new THREE.Scene();//创建场景
    camera = new THREE.PerspectiveCamera(45,1,0.1,100);//正交投影照相机
    camera.position.set(0, 25, -10);//相机位置
    camera.lookAt(new THREE.Vector3(0, 5, 0));//lookAt()设置相机所看的位置
    scene.add(camera);//把相机添加到场景中
    // var OBJLoader = new THREE.OBJLoader();//在init函数中，创建loader变量，用于导入模型
    //     // var MTLLoader = new THREE.MTLLoader();
    //     // MTLLoader.load('spider.mtl',function (material) {
    //     //     console.log(material);
    //     //     OBJLoader.setMaterials(material);
    //     //     OBJLoader.load('spider.obj',function (obj) {
    //     //         obj.scale.set(0.05,0.05,0.05);
    //     //         mesh = obj;
    //     //         console.log(mesh);
    //     //         scene.add(obj);
    //     //     })
    //     // });

    var FBXLoader = new THREE.FBXLoader();
    var actions = null;
    FBXLoader.load('Spider.fbx',function (object) {
        mixer = new THREE.AnimationMixer( object );
        mesh = object;
        console.log(mesh);
        var action = mixer.clipAction( object.animations[ 2 ] );
        // action.play();
        object.traverse( function ( child ) {
            if ( child.isMesh ) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        } );
        object.scale.set(0.05,0.05,0.05);
        scene.add( object );
    });

    var light = new THREE.DirectionalLight(0xffffff);//光源颜色
    light.position.set(20, 10, 5);//光源位置
    scene.add(light);//光源添加到场景中
    id = setInterval(draw,10);//每隔20s重绘一次


    var axis = new THREE.Vector3(0,0,-1);
    var stop = 0;

    var cameraButton = false;
    function goAhead() {
        if(cameraButton){
            camera.position.x -= 0.1;
            renderer.render(scene,camera);
            console.log(camera.position);
        }
        else {
            console.log("w");
            var action = mixer.clipAction( mesh.animations[ 12] );
            console.log(action);
            action.clampWhenFinished = true;
            action.repetitions = 1;
            action.play();
            action.reset();
            moveHead();
            renderer.render(scene,camera);
        }
    }

    function moveHead() {
        var Animate = requestAnimationFrame(moveHead);
        if(stop>0.6){
            cancelAnimationFrame(Animate);
            return;
        }
        else{
            mesh.translateOnAxis(axis,0.05);
            stop += 0.008;
        }
    }

    function moveBack() {
        var Animate = requestAnimationFrame(moveBack);
        if(stop>0.6){
            cancelAnimationFrame(Animate);
            return;
        }
        else{
            mesh.translateOnAxis(axis,-0.05);
            stop += 0.008;
        }
    }

    function goBack(){
        if (cameraButton){
            camera.position.x += 0.1;
            renderer.render(scene,camera);
            console.log(camera.position);
        }else {
            console.log("s");
            var action = mixer.clipAction( mesh.animations[2] );
            console.log(action);
            action.clampWhenFinished = true;
            action.repetitions = 1;
            action.play();
            action.reset();
            moveBack();
            renderer.render(scene,camera);
        }
    }
    function turnLeft(){
        console.log("turnLeft");
        mesh.rotateY(Math.PI * 0.01)
        renderer.render(scene,camera);
    }
    function turnRight(){
        console.log("turnRight");
        mesh.rotateY(Math.PI * (-0.01));
        renderer.render(scene,camera);
    }
    function turnUp() {
        console.log("turnDown");
        mesh.rotateX(Math.PI * 0.01);
        renderer.render(scene,camera);
    }
    function turnDown(){
        console.log("turnUp");
        mesh.rotateX(Math.PI * (-0.01));
        renderer.render(scene,camera);
    }

    function Roll(){
        var Animate = requestAnimationFrame(Roll);
        if(stop>2){
            cancelAnimationFrame(Animate);
            return;
        }
        else{
            mesh.rotateX(Math.PI * -0.05);
            stop += 0.05;
        }
    }
    function jump() {
        var action = mixer.clipAction( mesh.animations[ 13] );
        action.setLoop(mesh,1);
        action.play();
        action.reset();
    }
    function attack() {
        var action = mixer.clipAction(mesh.animations[11]);
        action.setLoop(mesh,1);
        action.play();
        action.reset();
    }

    function animate() {
        requestAnimationFrame( animate );
        var delta = clock.getDelta();
        if ( mixer ) mixer.update( delta );
        renderer.render( scene, camera );
    }

    animate();
    window.onkeydown = function(event){
        var key = String.fromCharCode(event.keyCode);
        switch (key) {
            case 'W':
                stop = 0;
                goAhead();
                break;
            case 'S':
                stop = 0;
                goBack();
                break;
            case 'A':
                turnLeft();
                break;
            case 'D':
                turnRight();
                break;
            case 'Q':
                turnUp();
                break;
            case 'E':
                turnDown();
                break;
            case 'R':
                stop = 0;
                Roll();
                break;
            case ' ':
                jump();
                break;
            case 'J':
                attack();
                break;
        }
    };

    document.getElementById("controlButton").onclick = function () {
        cameraButton = !cameraButton;
    };

    var control = new THREE.OrbitControls(camera,renderer.domElement);
    control.update();
};



function draw() {
    renderer.render(scene, camera);//调用WebGLRenderer的render函数刷新场景
}