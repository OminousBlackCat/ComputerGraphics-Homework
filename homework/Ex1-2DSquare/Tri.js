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

    var vertices = new Float32Array ([
        0.0,0.5,0.0,
        0.42,-0.25,0.0,
        -0.42,-0.25,0.0,
        1.0,1.0,0,
    ]);
    myGL.clearColor(0.0,1.0,0.0,1.0);

    var shader = initShaders(myGL,"vertex-shader","fragment-shader");
    offset = myGL.getUniformLocation(shader,"offset");
    color = myGL.getUniformLocation(shader,"color");

    myGL.useProgram(shader);

    var myBufferedID = myGL.createBuffer();
    myGL.bindBuffer(myGL.ARRAY_BUFFER,myBufferedID);
    myGL.bufferData(myGL.ARRAY_BUFFER,vertices,myGL.STATIC_DRAW );

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
            myGL.drawArrays( myGL.TRIANGLE_STRIP, 0,4 );


        }else {
            isClicked = false;
            myGL.uniform4f(color,1.0,0.0,0.0,1.0);
            myGL.clear( myGL.COLOR_BUFFER_BIT );
            myGL.drawArrays( myGL.TRIANGLE_STRIP, 0,4 );
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
            myGL.drawArrays( myGL.TRIANGLE_STRIP, 0,4 );
        }
    });

    function goLeft(){
        keyX = keyX-0.02;
        console.log(keyX);
        myGL.uniform2f(offset,keyX,keyY);
        myGL.clear( myGL.COLOR_BUFFER_BIT );
        myGL.drawArrays( myGL.TRIANGLE_STRIP, 0,4 );
    }
    function goRight(){
        keyX = keyX+0.02;
        console.log(keyX);
        myGL.uniform2f(offset,keyX,keyY);
        myGL.clear( myGL.COLOR_BUFFER_BIT );
        myGL.drawArrays( myGL.TRIANGLE_STRIP, 0,4 );
    }
    function  goUp() {
        keyY = keyY+0.02;
        myGL.uniform2f(offset,keyX,keyY);
        myGL.clear( myGL.COLOR_BUFFER_BIT );
        myGL.drawArrays( myGL.TRIANGLE_STRIP, 0,4 );
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
        myGL.drawArrays( myGL.TRIANGLE_STRIP, 0,4 );
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
        myGL.drawArrays( myGL.TRIANGLE_STRIP, 0,4 );
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
                break;
            case 'W':
                goUp();
                break;
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
    myGL.drawArrays( myGL.TRIANGLE_STRIP, 0,4 );
    // window.requestAnimFrame( render );
}