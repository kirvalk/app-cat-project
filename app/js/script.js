document.addEventListener('DOMContentLoaded', function(){
	const allElems = document.querySelectorAll('*'),
	      REMOVE_INTERVAL_ID = 600;
	      SET_INTERVAL_ID = 500;
	      
	setInterval(function(){
		setElemColor(getRandomElem(allElems), getRandomColor());
	}, SET_INTERVAL_ID);

	setInterval(function(){
		removeColor(getRandomChangedElem());
	}, REMOVE_INTERVAL_ID);

	function getRandomElem (elemSet) {
		const rnd = Math.floor(Math.random()*elemSet.length);
		return elemSet[rnd];
	}

	function setElemColor (elem, color) {
		elem.style.backgroundColor = color;
		elem.classList.add('changed');
	}

	function getRandomChangedElem () {
		const changedElems = document.querySelectorAll('.changed');
		return getRandomElem(changedElems);	
	}

	function removeColor (elem) {
		elem.style.backgroundColor = '';
		elem.classList.remove('changed');
	}

	function getRandomRgbNum () {
		return Math.floor(Math.random()*256);
	}

	function getRandomColor () {
		const r = getRandomRgbNum(),
		      g = getRandomRgbNum(),
			  b = getRandomRgbNum();
		const result = `rgb(${r}, ${g}, ${b})`;
		return result;
	}
});