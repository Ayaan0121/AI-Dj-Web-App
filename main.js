leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
sound="";
//Score left wrist
slw=0;
srw=0;
function preload() {
sound=loadSound("Upwind.mp3");
}

function setup(){
canvas=createCanvas(600 , 500);
canvas.center();
//camera
video=createCapture(VIDEO);
video.hide();
poseNet= ml5.poseNet(video , modelLoaded);
poseNet.on('pose' , gotPoses );
}

function modelLoaded() {
        console.log("Model Loaded!")
}

function gotPoses(results) {
        if (results.length > 0) {
         console.log(results);
         leftWristX=results[0].pose.leftWrist.x;
         leftWristY=results[0].pose.leftWrist.y;
         rightWristX=results[0].pose.rightWrist.x;
         rightWristY=results[0].pose.rightWrist.y;
         slw=results[0].pose.keypoints[9].score;
         srw=results[0].pose.keypoints[10].score;
         console.log("Left wrist y="+leftWristY);
         console.log("Left wrist x="+leftWristX);
         console.log("Right wrist x="+rightWristX);
         console.log("Right wrist y="+rightWristY);
        }
}

function draw() {
image(video ,0,0,600,500);
stroke("#FF0000");
fill("#FF0000");
//If statement to indentify left wrist is in web cam
if (slw>0.2) {
       circle(leftWristX , leftWristY, 20);
       //To convert volume string in number 
       lwn=Number(leftWristY);
       // round of  
       rd=floor(lwn);
       //finally divinding with height of canvas
       volume=rd/500;
       //setting the inside text
       document.getElementById("volume").innerHTML="Volume: "+ volume;
       //applying volume to song
       sound.setVolume(volume);    
}

// for speed
if (srw >0.2) {

//circle at right wrist
circle(rightWristX , rightWristY , 20);
//0 to 100
if (rightWristY > 0 && rightWristY <= 100) {
        document.getElementById("speed").innerHTML="Speed: 0.5x" ;
        sound.rate(0.5);
}//100 to 200
else if (rightWristY > 100 && rightWristY <= 200) {
        document.getElementById("speed").innerHTML="Speed: 1x" ;
        sound.rate(1);
}//200 to 300
else if (rightWristY > 200 && rightWristY <= 300) {
        document.getElementById("speed").innerHTML="Speed: 1.5x" ;
        sound.rate(1.5);
}//300 to 400
else if (rightWristY > 300 && rightWristY <= 400) {
        document.getElementById("speed").innerHTML="Speed: 2x" ;
        sound.rate(2);
}//400 to 500
else if (rightWristY > 400) {
        document.getElementById("speed").innerHTML="Speed: 2.5x" ;
        sound.rate(2.5);
}
}
}

function play() {
        sound.play();
        document.getElementById("yo").innerHTML="Stop (Double click)";
        document.getElementById("yo").style.backgroundColor="red";
        sound.setVolume(0.5);
        sound.rate(1);
}

function stop() {
        sound.stop();
        document.getElementById("yo").innerHTML="Play";
        document.getElementById("yo").style.backgroundColor="green";
    }

