var myGL;
var keyX;
var keyY;
var offset;
var color;
var originY;
var maxHeight;



window.onload = function init(){
    var canvas = document.getElementById("gl-canvas");
    myGL = WebGLUtils.setupWebGL(canvas);
    if(!myGL){
        alert("NO GL!");
    }

    var PKQ = [
        vec2(-0.2,0.2),
        vec2(-0.2203,0.25713),
        vec2(-0.1826,0.3156),
        vec2(-0.084,0.3776),
        vec2(-0.08157,0.27904),
        vec2(-0.121741,0.197489),
        vec2(-0.14487,0.1816659),
        vec2(-0.08279,0.141499),
        vec2(0.07301,0.277824),
        vec2(0.21055,0.259566),
        vec2(0.1358854,0.16051), // n
        vec2(0.03406,0.12204),//o
        vec2(0.035277,0.08307), //p
        vec2(0.15091,-0.036211), //q
        vec2(0.2142031866397,-0.0581200285735),
        vec2(0.2714110063433,-0.097070033478),
        vec2(0.1533438039764,-0.1396716013424),
        vec2(0.1752531817352,-0.2382638012571),
        vec2(0.036615508028,-0.3908991329768),
        vec2(-0.0046582187601,-0.3142273761633),
        vec2(-0.0832221491073,-0.2954162942491),
        vec2(-0.2204323936575,-0.3120143077028),
        vec2(-0.1994082432829,-0.2345569115858),
        vec2(-0.2403500098019,-0.0774290508912),
        vec2(-0.3155943374584,-0.0409134212932),
        vec2(-0.3576426382077,-0.0010781890044),
        vec2(-0.381986391273,0.0409701117448),
        vec2(-0.3587491724379,0.1228536447828),
        vec2(-0.2801852420906,0.1593692743808),
        vec2(-0.2392434755716,0.2003110408998),
    ];

    myGL.clearColor(0.0,1.0,0.0,1.0);

    var shader = initShaders(myGL,"vertex-shader","fragment-shader");
    offset = myGL.getUniformLocation(shader,"offset");
    color = myGL.getUniformLocation(shader,"color");

    myGL.useProgram(shader);

    var myBufferedID = myGL.createBuffer();
    myGL.bindBuffer(myGL.ARRAY_BUFFER,myBufferedID);
    myGL.bufferData(myGL.ARRAY_BUFFER,new Float32Array(PKQ),myGL.STATIC_DRAW );

    var vPosition = myGL.getAttribLocation(shader,"vPosition");
    myGL.vertexAttribPointer(vPosition,3,myGL.FLOAT,false,0,0);
    myGL.enableVertexAttribArray(vPosition);

    keyX = 0.0;
    keyY = 0.0;

    var originX;
    var isClicked = false;


    canvas.addEventListener("dblclick",function (event) {
        if(!isClicked){
            isClicked = true;
            console.log(isClicked);

            myGL.uniform4f(color,1.0,0.0,1.0,1.0);
            myGL.clear( myGL.COLOR_BUFFER_BIT );
            myGL.drawArrays( myGL.TRIANGLE_FAN, 0,30 );


        }else {
            isClicked = false;
            myGL.uniform4f(color,1.0,0.0,0.0,1.0);
            myGL.clear( myGL.COLOR_BUFFER_BIT );
            myGL.drawArrays( myGL.TRIANGLE_FAN, 0,30 );
        }
    });

    canvas.addEventListener("mousemove",function (event) {
        if(isClicked){
            var newX = (2*event.clientX/canvas.width)-1;
            var newY = 2*(canvas.height-event.clientY)/canvas.height-1;
            keyX = newX ;
            keyY = newY ;

            myGL.uniform2f(offset,keyX,keyY);

            myGL.clear( myGL.COLOR_BUFFER_BIT );
            myGL.drawArrays( myGL.TRIANGLE_FAN, 0,30 );
        }
    });

    function goLeft(){
        keyX = keyX-0.02;
        console.log(keyX);
        myGL.uniform2f(offset,keyX,keyY);
        myGL.clear( myGL.COLOR_BUFFER_BIT );
        myGL.drawArrays( myGL.TRIANGLE_FAN, 0,30 );
    }
    function goRight(){
        keyX = keyX+0.02;
        console.log(keyX);
        myGL.uniform2f(offset,keyX,keyY);
        myGL.clear( myGL.COLOR_BUFFER_BIT );
        myGL.drawArrays( myGL.TRIANGLE_FAN, 0,30 );
    }


    function jump() {
        maxHeight = keyY + 1;
        originY = keyY;
        jumpUP();
    }

    var count = 1;
    var speed = 0;
    function jumpUP(){
        function speedOf(var2){
            return -var2*var2+2*var2;
        }
        var var1 = speedOf(count*0.02)-speed;
        keyY = keyY+var1;
        count++;
        speed = speedOf((count-1)*0.02);
        myGL.uniform2f(offset,keyX,keyY);
        myGL.clear( myGL.COLOR_BUFFER_BIT );
        myGL.drawArrays( myGL.TRIANGLE_FAN, 0,30 );
        setTimeout(
            function () {
                if(keyY<maxHeight){
                    window.requestAnimFrame(jumpUP());
                }else {
                    jumpDown();
                    return;
                }
            },10
        )
    }
    function jumpDown(){
        function speedOf(var2){
            return -var2*var2+2*var2;
        }
        var var1 = speedOf(count*0.02)-speed;
        keyY = keyY+var1;
        count++;
        speed = speedOf((count-1)*0.02);
        myGL.uniform2f(offset,keyX,keyY);
        myGL.clear( myGL.COLOR_BUFFER_BIT );
        myGL.drawArrays( myGL.TRIANGLE_FAN, 0,30 );
        setTimeout(
            function () {
                if(keyY>originY){
                    console.log(keyY,originY);
                    window.requestAnimFrame(jumpDown());
                }else {
                    count = 1;
                }
            },10
        )
    }
    window.onkeydown = function(event){
        var key = String.fromCharCode(event.keyCode);
        switch (key) {
            case 'A':
                goLeft();
                break;
            case 'D':
                goRight();
                break;
            case ' ':
                jump();
                break
        }
    };
    document.getElementById("selects").onclick = function (event) {
        switch (event.target.index) {
            case 0:
                goLeft();
                break;
            case 1:
                goRight();
                break;
            case 2:
                jump();
                break;
        }
    } ;

    render();
};

function render() {
    myGL.uniform2f(offset,keyX,keyY);
    myGL.uniform4f(color,1.0,0.0,0.0,1.0);
    myGL.clear( myGL.COLOR_BUFFER_BIT );
    myGL.drawArrays( myGL.TRIANGLE_FAN, 0,30 );
    // window.requestAnimFrame( render );
}