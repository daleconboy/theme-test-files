'use strict';

var CANVAS_WIDTH = 400;
var CANVAS_HEIGHT = 400;
var VELOCITY_MULTIPLIER = (Math.random()/10) * -1;

var shouldAnimate = false;
var memoizedCanvas;

var innerWidth;
var innerHeight;

function getContext (canvas) {
	var ctx;
	if (canvas.getContext) {
		ctx = canvas.getContext('2d');
	}

	return ctx;
}

function makeStars () {
	var stars = [];

	for (var i = 0; i < 100; i += 1) {
		stars.push({
			x: Math.floor(Math.random() * innerWidth),
			y: Math.floor(Math.random() * innerHeight),
			vx: VELOCITY_MULTIPLIER,
			size: setStarSize()
		});
	}

	return stars;
}

function setStarSize () {
	var reducer = Math.random();
	return Math.ceil((Math.random() * 3) * reducer);
}

function animate (ctx, stars) {


	function advance () {
		var len = stars.length;
		var star;

		// Reset the canvas
		ctx.fillStyle = 'transparent';
		ctx.clearRect(0, 0, innerWidth, innerHeight);
		ctx.fill();

		for (var i = 0; i < len; i += 1) {
			star = stars[i];
			star.x = star.x - star.vx;

			// reset x
			if (star.x > innerWidth) {
				star.x = 0;
			}

			ctx.fillStyle = '#fff';
			ctx.beginPath();
			ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();
		}
	}

	advance();
}

function addResizeListener () {
	window.addEventListener('resize', _onResize, false);
}

function removeResizeListener () {
	window.removeEventListener('resize', _onResize);
}

function _onResize () {
	reset();
}

function setCanvasSize (canvas, x, y) {
	canvas.width = x;
	canvas.height = y;
}

function memoizeWindow () {
	innerWidth = window.innerWidth;
	innerHeight = window.innerHeight;
}

function reset () {
	stop();
	start();
}

function start (canvas) {
	canvas = canvas || memoizedCanvas;
	memoizedCanvas = canvas;
	shouldAnimate = true;

	memoizeWindow();
	setCanvasSize(canvas, innerWidth, innerHeight);

	var ctx = getContext(canvas);
	var stars = makeStars();

	animate(ctx, stars);

	addResizeListener();
}

function stop () {
	removeResizeListener();
	shouldAnimate = false;
}

module.exports = {
	start: start,
	stop: stop
};
