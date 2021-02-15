const avaiableRotations = [90, 180, 270, 360].map((v) => `fa-rotate-${v}`);
const iframes = document.querySelectorAll('i');
const old = [];

iframes.forEach((v) => {
	const currentRotation = avaiableRotations[Math.floor(Math.random() * avaiableRotations.length)];
	v.classList.add('hover:text-gray-400', 'transition-all', currentRotation);
	old.push(currentRotation);
});

const rotate = () =>
	old.map((v) => {
		iframes.forEach((j) => {
			const currentRotation = avaiableRotations[Math.floor(Math.random() * avaiableRotations.length)];
			j.classList.replace(v, currentRotation);
			old[old.indexOf(v)] = currentRotation;
		});
	});

rotate();
setInterval(rotate, 1e3);
