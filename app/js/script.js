const allElems = document.querySelectorAll('*');

function setColor (elemSet, color) {
	rnd = Math.floor(Math.random()*elemSet.length);
	elemSet[rnd].style.backgroundColor = color;
}

setColor(allElems, "green");



function getRandomColor() {
	const r = Math.floor(Math.random()*255);
	const g = Math.floor(Math.random()*255);
	const b = Math.floor(Math.random()*255);
	const result = "rgb("+ r + "," + g + "," + b + ")";
	return result;
}

const intervalId = setInterval(function(){
	setColor(allElems, getRandomColor())
}, 2000);
