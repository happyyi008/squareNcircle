
//var movObj = null;
//var move;
//var parent_bgc = "white";
var bigger;
var canvas;
var ctx;

function init(){
	//movObj = document.getElementById("sm");
	//movObj.style.position = 'relative';
	//movObj.style.left = "0px";
	canvas = document.getElementById('mycan');
	ctx = canvas.getContext("2d");

}

/*

function moveRight(){
	movObj.style.left = parseInt(movObj.style.left) + 3 + "px";
	move = setTimeout(moveRight,20);
}

function moveLeft(){
	movObj.style.left = parseInt(movObj.style.left) - 3 + "px";
	move = setTimeout(moveLeft,20);
}

function stop(){
	clearTimeout(move);
}

function dragstart(event){
	event.dataTransfer.setData("Rawr",event.target.id);
}

function dragging(event){
	event.target.style.backgroundColor = parent_bgc;
}

function allowDrop(event){
	event.preventDefault();
}

function drop(event){
	event.preventDefault();
    var data = event.dataTransfer.getData("Rawr");
    document.getElementById(data).style.left = "0px";
    event.target.appendChild(document.getElementById(data));
    document.getElementById(data).style.backgroundColor = "blue";
    parent_bgc = "green";
}

function onClick(event){
	var color = event.target.style.backgroundColor;
	if(color == "blue"){
		event.target.style.backgroundColor="white";
	}else{ 
		event.target.style.backgroundColor="blue";
	}
}

*/
var mouseX;
var mouseY;
var rectL = 30;
var rectW = 30;
var rad = 20;

var circles = [];
var rectangles = [];
var drawingShape;
var shapeGrowing = false;

setInterval(redrawShapes,10);


function onMouseDown(event){
	event.preventDefault();
	if(!shapeGrowing){
		m = event ||  window.event;
		switch(m.which){
			case 1: 
				var offset = canvas.getBoundingClientRect();
				mouseX = event.clientX - offset.left - rectW/2;
				mouseY = event.clientY - offset.top - rectL/2; 
				drawingShape = "rectangle";
				drawRect(); 
				break;
			case 3: 
				var offset = canvas.getBoundingClientRect();
				mouseX = event.clientX - offset.left;
				mouseY = event.clientY - offset.top; 
				drawingShape = "circle";
				drawCircle(); 
				break;
		}
		shapeGrowing =true;
	}
}

function drawRect(){
	rectL++; rectW++;
	if(rectW%2) mouseY--; mouseX--;
	ctx.clearRect(mouseX,mouseY,rectW,rectL);
	ctx.fillStyle = "lightblue";
	ctx.fillRect(mouseX,mouseY,rectW,rectL);
	ctx.strokeRect(mouseX,mouseY,rectW,rectL);

	if(rectW > 300) stopInc();
	bigger = setTimeout(drawRect,15);
}

function drawCircle(){ 
	ctx.fillStyle = "orange";
	ctx.beginPath();
	ctx.arc(mouseX,mouseY,rad++,0,2*Math.PI);
	ctx.fill();
	ctx.stroke();
	if(rad > 200) stopInc();
	bigger = setTimeout(drawCircle,15);
}

function redrawRect(r){
	ctx.fillStyle = "lightblue";
	ctx.clearRect(r.x-1,r.y-1,r.w+2,r.l+1);
	r.y+=3;
	ctx.fillRect(r.x,r.y,r.w,r.l);
	ctx.strokeRect(r.x,r.y,r.w,r.l);
}

function redrawCircle(c){
	ctx.fillStyle = "white";
	ctx.beginPath();
    ctx.arc(c.x, c.y, c.rad+2, 0, 2 * Math.PI, false);
    ctx.fill();

    c.y+=3;
	ctx.fillStyle = "orange";
	ctx.beginPath();
	ctx.arc(c.x,c.y,c.rad,0,2*Math.PI);
	ctx.fill();
	ctx.stroke();
	
}

function addCircle(posx,posy,circrad){
	var c = {
		rad: circrad,
		x: posx,
		y: posy
	};

	return c;
}

function addRectangle(posx,posy,rectw,rectl){
	var r = {
		l: rectl,
		w: rectw,
		x: posx,
		y: posy
	};
	return r;
}

function redrawShapes(){
	var rn = rectangles.length;
	var cn = circles.length;
	//redrawClear();
	for(var i = 0; i < rn; i++){
		redrawRect(rectangles[i]);
	}

	for(var i = 0; i< cn; i++){
		redrawCircle(circles[i]);
	}
}



var i=0;
function stopInc(){ 
	clearTimeout(bigger);
	
	if(drawingShape == "circle"){
		var c = addCircle(mouseX, mouseY,rad);
		circles.push(c);
	}else{
		var r = addRectangle(mouseX, mouseY,rectW,rectL);
		rectangles.push(r);
		console.log(rectangles[i++]);
	}
	rectW = 30;
	rectL = 30;
	rad = 20;
	bigger = null;
	shapeGrowing = false;

	
}

function nomenu(event){
	event.preventDefault();
}

function clearCanvas(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	if(bigger){
		stopInc();
	}
	circles = [];
	rectangles = [];
}