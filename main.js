object=[];
video="";
status="";
function preload(){
    video=createVideo('video.mp4');
    video.hide();
}

function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
}

function draw(){
    image(video,0,0,480,380);
    if(status!=""){
        objectDetector.detect(video,gotResult);
        for(i=0;i<object.length;i++){
            document.getElementById("status").innerHTML="STATUS: OBJECT DETECTED";
            document.getElementById("number_of_objects").innerHTML="number of objects detected are"+ objects.length;
            fill("#4287f5");
            percent=floor(objects[i].confident*100);
            text=(objects[i].label+""+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("#4287f9");
            rect(objects[i].x,objects[i].y,objects[i].width,object[i].height);
        }
    }
}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status: detecting object";
}

function modelLoaded(){
    console.log("modelLoaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}
