status = "";
img = "";
objects = [];

function preload(){
    img = loadImage("Clock.jpg");
}

function setup(){
    canvas = createCanvas(640,420);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
}

function modelLoaded(){
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(img,0,0,640,420);
    if(status != ""){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Detecting Objects";
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x+15,objects[i].y+15);
            fill("#00FF00");
            noFill();
            stroke("#00FF00");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

