// ! CSS
import './main.css';
import './css/index.css';
import 'line-awesome/dist/line-awesome/css/line-awesome.min.css';

// ! Javascript
import '../tmp/scripts/toggle.js';

if (['/', '/index.html', '/portfolio', '/portfolio/'].includes(window.location.pathname)) import('../tmp/scripts/rotate.js');
