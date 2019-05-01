/**
 * @module  pan-zoom
 *
 * Events for pan and zoom
 */

var Impetus = require('impetus')
var wheel = require('mouse-wheel')
var touchPinch = require('touch-pinch')
var raf = require('raf')
import  evPos from './ev-pos';

export default (target, cb) => {
	if (target instanceof Function) {
		cb = target
		target = document.documentElement || document.body
	}

	if (typeof target === 'string') target = document.querySelector(target)

	var cursor = {
		x:0,
		y:0
	}

	var hasPassive = () => {
		var supported = false

		try {
			var opts = Object.defineProperty({}, 'passive', {
				get: function() {
					supported = true;
				}
			});

			window.addEventListener('test', null, opts);
			window.removeEventListener('test', null, opts);
		} catch(e) {
			supported = false;
		}

		return supported;
	}

	var impetus;

	var initX = 0, initY = 0, init = true
	var initFn = function (e) { init = true }
	target.addEventListener('mousedown', initFn)
	target.addEventListener('mousemove', (e)=> {
		cursor = evPos(e);
	});
	target.addEventListener('wheel', (e)=> {
		
		if(e) {
			cursor = evPos(e);
		}
	});
	target.addEventListener('touchstart', initFn, hasPassive() ? { passive: true } : false)

	var lastY = 0, lastX = 0
	impetus = new Impetus({
		source: target,
		update: function (x, y) {
			if (init) {
				init = false
				initX = cursor.x
				initY = cursor.y
			}

			var e = {
				target: target,
				type: 'mouse',
				dx: x - lastX, dy: y - lastY, dz: 0,
				x: cursor.x,
				y: cursor.y,
				x0: initX, y0: initY
			}

			lastX = x
			lastY = y

			schedule(e)
		},
		multiplier: 1,
		friction: .75
	})

	//enable zooming
	var wheelListener = wheel(target, function (dx, dy, dz, e) {
		e.preventDefault();
		schedule({
			target: target,
			type: 'mouse',
			dx: 0, dy: 0, dz: dy,
			x: cursor.x,
			y: cursor.y,
			x0: cursor.x,
			y0: cursor.y
		})
	})

	//mobile pinch zoom
	var pinch = touchPinch(target)
	var mult = 2
	var initialCoords

	pinch.on('start', function (curr) {
		var f1 = pinch.fingers[0];
		var f2 = pinch.fingers[1];

		initialCoords = [
			f2.position[0] * .5 + f1.position[0] * .5,
			f2.position[1] * .5 + f1.position[1] * .5
		]

		impetus && impetus.pause()
	})
	pinch.on('end', function () {
		if (!initialCoords) return

		initialCoords = null

		impetus && impetus.resume()
	})
	pinch.on('change', function (curr, prev) {
		if (!pinch.pinching || !initialCoords) return

		schedule({
			target: target,
			type: 'touch',
			dx: 0, dy: 0, dz: - (curr - prev) * mult,
			x: initialCoords[0], y: initialCoords[1],
			x0: initialCoords[0], y0: initialCoords[0]
		})
	})


	// schedule function to current or next frame
	var planned, frameId
	function schedule (ev) {
		if (frameId != null) {
			if (!planned) planned = ev
			else {
				planned.dx += ev.dx
				planned.dy += ev.dy
				planned.dz += ev.dz

				planned.x = ev.x
				planned.y = ev.y
			}

			return
		}

		// Firefox sometimes does not clear webgl current drawing buffer
		// so we have to schedule callback to the next frame, not the current
		// cb(ev)

		frameId = raf(function () {
			cb(ev)
			frameId = null
			if (planned) {
				var arg = planned
				planned = null
				schedule(arg)
			}
		})
	}

	return function unpanzoom () {

		target.removeEventListener('mousedown', initFn)
		target.removeEventListener('wheel')
		target.removeEventListener('touchstart', initFn)

		impetus.destroy()

		target.removeEventListener('wheel', wheelListener)

		pinch.disable()

		raf.cancel(frameId)
	}
}