import { getMousePos } from './lib/utils.js';

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

canvas.addEventListener('click', (e) => {
	let m = getMousePos(canvas, e);
	ctx.fillStyle = '#000';
	ctx.fillRect(m.x - 5, m.y - 5, 10, 10);
});

if (window.location.hostname !== 'www.sjomli.is') {
	document.querySelector('header').remove();
}
