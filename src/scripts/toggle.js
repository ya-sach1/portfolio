const $ = (q) => {
	if (q[0] === '#') return document.getElementById(q.slice(1));
	if (q[0] === '.') {
		const arr = document.getElementsByClassName(q.slice(1));
		return arr ? arr[0] : null;
	}
};


$('.toggle').addEventListener('click', (_e) => {
	const menu = $('.menu').classList;
	menu.contains('activated') ? menu.remove('activated') : menu.add('activated');
});
