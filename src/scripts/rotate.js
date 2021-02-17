// document.getElementsByClassName('toremove')[0].remove();

const avaiableRotations = [90, 180, 270, 360].map((v) => `la-rotate-${v}`);
const icon = [...document.getElementsByClassName('rotate')];
const old = [];

icon.forEach((v) => {
	const currentRotation = avaiableRotations[Math.floor(Math.random() * avaiableRotations.length)];
	v.classList.add(currentRotation, 'tempfix');
	old.push(currentRotation);
});

const rotate = () =>
	old.map((v) => {
		icon.forEach((j) => {
			const currentRotation = avaiableRotations[Math.floor(Math.random() * avaiableRotations.length)];
			j.classList.replace(v, currentRotation);
			old[old.indexOf(v)] = currentRotation;
		});
	});

rotate();
setInterval(rotate, 1e3);
