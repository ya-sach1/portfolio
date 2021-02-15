const avaiableRotations = [90, 180, 270, 360].map((v) => `fa-rotate-${v}`);
const icon = document.querySelectorAll('i');
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
