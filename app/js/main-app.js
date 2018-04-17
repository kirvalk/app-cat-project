import {highlightActiveHeaderLink} from './script4.js';
import {initAppPageContent} from './appscript.js';


document.addEventListener('DOMContentLoaded', function() {
	highlightActiveHeaderLink();
	initAppPageContent('./api/app_packages.json');
});