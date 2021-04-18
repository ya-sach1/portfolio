// ! CSS
import './main.css';
import './css/index.css';
import 'line-awesome/dist/line-awesome/css/line-awesome.min.css';

// ! Javascript
import './scripts/toggle.js';

if (['/', '/index.html', '/portfolio', '/portfolio/'].includes(window.location.pathname)) import('./scripts/rotate.js');
