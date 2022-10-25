/**
 * skilar normalíseruðum vektor á milli tveggja punkta, a og b
 * tekur inn 
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */
function getVec(a, b) {
	const x = b.x - a.x;
	const y = b.y - a.y;
	const magnitude = Math.sqrt(x * x + y * y);

	const dir = { x: x / magnitude, y: y / magnitude };

	return dir;
}


/**
 * skilar hlut með staðsetningu músarinnar miðað við canvasinn
 * tekur inn reference á canvas hlut og event sem á sér stað útfrá því
 * ! held virki bara fyrir 1:1 ratio canvas
 * @param {*} canvas 
 * @param {*} evt 
 * @returns 
 */
function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top,
	};
}


/**
 * athugar hvort tvier ferningar skerist á
 * tekur inn hnit beggja hluta auk víddar og hæðar
 * @param {number} x1 
 * @param {number} y1 
 * @param {number} w1 
 * @param {number} h1 
 * @param {number} x2 
 * @param {number} y2 
 * @param {number} w2 
 * @param {number} h2 
 * @returns 
 */
function ICSquare(x1,y1,w1,h1,x2,y2,w2,h2) {
	if (
		x1 + w1 >= x2 &&
		x1 + w1 <= x2 + w2 &&
		y1 + h1 >= y2 &&
		y1 + h1 <= y2 + h2
	) {
		return true;
	}
	return false;
}

export {
    getVec,
    getMousePos,
    ICSquare
}