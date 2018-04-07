const allElems = document.querySelectorAll('*');

function setColor (elemSet, color) {
	rnd = Math.floor(Math.random()*elemSet.length);
	elemSet[rnd].style.backgroundColor = color;
}

setColor(allElems, "green");