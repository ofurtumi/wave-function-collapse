import { getMousePos } from './lib/utils.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

if (window.location.hostname !== 'www.sjomli.is') {
	document.querySelector('header').remove();
}


const size = 50;
const dim = canvas.width / size;
const num = dim * dim;

const imgs = Array(5)
	.fill(0)
	.map((p, i) => {
		let img = new Image(size, size);
		img.src = 'sprites/s' + i + '.png';
		return img;
	});

function CAD(ref, img) {
	ctx.drawImage(imgs[img], ref.x * size, ref.y * size, size, size);

	ref.collapsed = true;
	ref.available = [];
	ref.img = img;
}

function checkNeighbors(tiles, current, offset, pos, otherPos) {
	let tileFilter = tiles[current].available;
	let tempFilter = tileFilter;
	let temp = tiles[current + offset];

	if (
		!(
			(current % dim === 0 && offset === -1) ||
			((current + 1) % dim === 0 && offset == 1)
		) &&
		temp &&
		!Number.isNaN(temp.img)
	) {
		tempFilter = possibilities
			.map((val, i) => {
				if (possibilities[temp.img][otherPos] === val[pos]) {
					return i;
				}
			})
			.filter((elem) => {
				return elem !== undefined;
			});

		tiles[current].available = tileFilter.filter((val) =>
			tempFilter.includes(val)
		);
	}
}

window.onload = async () => {
	let tiles = Array(num)
		.fill(0)
		.map((val, i) => {
			let yPos = Math.floor(i / dim);
			let xPos = i - dim * yPos;
			return {
				x: xPos,
				y: yPos,
				collapsed: false,
				available: [0, 1, 2, 3, 4],
				img: NaN,
			};
		});

	// * first tile

	let firstTile = Math.floor(Math.random() * num);
	let firstImg = Math.floor(Math.random() * imgs.length);

	CAD(tiles[firstTile], firstImg);

	// * keyra loop en stoppa ef ehv allt er collapsed
	for (let u = 0; u < num; u++) {
		let allCollapsed = true;
		// while (!allCollapsed)
		let lengths = [[], []];
		let lengthCount = 0;
		for (let i = 0; i < num; i++) {
			if (tiles[i].collapsed) continue;

			checkNeighbors(tiles, i, -dim, 0, 2); // ? skoða fyrir ofan:	i - dim
			checkNeighbors(tiles, i, 1, 1, 3); // ? skoða hægra megin:		i + 1
			checkNeighbors(tiles, i, dim, 2, 0); // ? skoða neðan við:		i + dim
			checkNeighbors(tiles, i, -1, 3, 1); // ? skoða vinstra megin:	i - 1

			allCollapsed = allCollapsed & tiles[i].collapsed;
			lengths[0][lengthCount] = i;
			lengths[1][lengthCount++] = tiles[i].available.length;
		}

		let min = Math.min(...lengths[1]);
		let indexMin = lengths[0][lengths[1].indexOf(min)];
		const chosen = tiles[indexMin];
		const randImg = chosen.available[Math.floor(Math.random() * min)];
		CAD(tiles[indexMin], randImg);
		await new Promise((r) => setTimeout(r, 25));
	}
};

// ? núllstillt í klukkuröð?? heitir það það?? up: 0, right: 1 osfr...
// ? 4 er tómi kassinn
// prettier-ignore
const possibilities = [
  [1,1,0,1],  // * 0: upp
  [1,1,1,0],  // * 1: hægri
  [0,1,1,1],  // * 2: niður
  [1,0,1,1],  // * 3: vinstri
  [0,0,0,0]   // * 4: tómt
]
