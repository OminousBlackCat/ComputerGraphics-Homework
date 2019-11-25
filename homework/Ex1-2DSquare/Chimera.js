var canvas;
var gl;

var vColor = [
    vec4(255,215,0,1.0),//Gold
    vec4(255,215,0,1.0),//Gold
    vec4(255,215,0,1.0),//Gold
    vec4(255,255,0,1.0),//yellow
    vec4(255,255,255,1.0),//Black
    vec4(255,255,255,1.0),//Black
    vec4(255,215,0,1.0),//Gold
    vec4(255,215,0,1.0),//Gold
    vec4(255,255,255,1.0),//Black
    vec4(255,106,106,1.0)//IndianRed
];

var Body = [vec2(-0.25,0.25),vec2(-0.15,0.225),vec2(-0.1,0.225),vec2(-0.075,0,225),vec2(-0.05,0.2),vec2(0.075,0.075),
    vec2(0.1,0.05),vec2(0.125,0.025),vec2(0.15,-0.025),vec2(0.175,-0.075),vec2(0.2,-0.15),vec2(0.225,-0.175),vec2(0.24,-0.225),
    vec2(0.25,-0.25),vec2(0.225,-0.325),vec2(-0.2,-0.35),vec2(-0.15,-0.4),vec2(-0.1,-0.45),vec2(-0.075,-0.475),vec2(-0.025,-0.475),
    vec2(0,-0.4),vec2(-0.1,-0.375),vec2(-0.175,-0.4),vec2(-0.225,-0.4),vec2(-0.24,-0.35),vec2(-0.325,-0.15),vec2(-0.35,-0.125),
    vec2(-0.375,-0.115),vec2(-0.4,-0.1),vec2(-0.425,-0.075),vec2(-0.45,-0.065),vec2(-0.475,-0.025),vec2(-0.49,0),vec2(-0.475,0.05),
    vec2(-0.45,0.1),vec2(-0.425,0.125),vec2(-0.4,0.175),vec2(-0.35,0.2)
];

var Lear = [vec2(-0.25,0.25),vec2(-0.3,0.35),vec2(-0.2,0.5),vec2(-0.075,0.275),vec2(-0.15,0.225)];
var Rear = [vec2(-0.05,0.2),vec2(-0.05,0.25),vec2(0.275,0.35),vec2(0.15,0.75),vec2(0.75,0.075)];
var Tail = [vec2(0.175,-0.75),vec2(0.25,0),vec2(0.05,0.2),vec2(0.4,0.4),vec2(0.5,0.3),vec2(0.3,0.1),vec2(0.4,0),vec2(0.2,0.15)];
var Leye = [vec2(-0.45,0.1),vec2(-0.425,0.05),vec2(-0.4,0.075),vec2(-0.4,0.1),vec2(-0.425,0.125),vec2(-0.45,-.15)];
var Reye = [vec2(-0.225,0.025),vec2(-0.2,0.05),vec2(-0.175,0.075),vec2(-0.15,0.05),vec2(-0.125,0.025),vec2(-0.15,0),vec2(-0.175,-0.025),vec2(-0.2,-0.025)];
var Lhand = [vec2(-0.425,-0.075),vec2(-0.475,-0.1),vec2(-0.5,-0.135),vec2(-0.45,-0.35),vec2(-0.3,-0.275)];
var Rhand = [vec2(-0.075,-0.15),vec2(-0.125,-0.2),vec2(-0.125,-0.25),vec2(-0.75,-0.275),vec2(0.025,-0.275),vec2(0.075,-0.225)];
var Nose = [vec2(-0.4,0),vec2(-0.3,-0.025),vec2(-0.365,-0.045)];
var Face = [vec2(-0.1,-0.05),vec2(-0.05,-0.1),vec2(-0.1,-0.15),vec2(-0.15,-0.1)];


window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.5, 0.5, 0.5, 1.0 );

    points = [Lear,Rear,Tail,Body,Leye,Reye,Lhand,Rhand,Nose,Face];

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );


    for (var i = 0 ; i < points.length ; i++ ){
        var vBuffer = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
        gl.bufferData( gl.ARRAY_BUFFER, flatten(points[i]), gl.STATIC_DRAW );

        var vPosition = gl.getAttribLocation(program, "vPosition");
        gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vPosition);

        var vColor = gl.getAttribLocation( program, "vColor" );
        gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( vColor );

        render();
    }

};


function render() {

    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 1000 );

    window.requestAnimFrame(render);

}
