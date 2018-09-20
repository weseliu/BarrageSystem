module actions {

	export function cardinalSplineAt(p0, p1, p2, p3, tension, t) {
		var t2 = t * t;
		var t3 = t2 * t;
		/*
		 * Formula: s(-ttt + 2tt - t)P1 + s(-ttt + tt)P2 + (2ttt - 3tt + 1)P2 + s(ttt - 2tt + t)P3 + (-2ttt + 3tt)P3 + s(ttt - tt)P4
		 */
		var s = (1 - tension) / 2;

		var b1 = s * ((-t3 + (2 * t2)) - t);                      // s(-t3 + 2 t2 - t)P1
		var b2 = s * (-t3 + t2) + (2 * t3 - 3 * t2 + 1);          // s(-t3 + t2)P2 + (2 t3 - 3 t2 + 1)P2
		var b3 = s * (t3 - 2 * t2 + t) + (-2 * t3 + 3 * t2);      // s(t3 - 2 t2 + t)P3 + (-2 t3 + 3 t2)P3
		var b4 = s * (t3 - t2);                                   // s(t3 - t2)P4

		var x = (p0.x * b1 + p1.x * b2 + p2.x * b3 + p3.x * b4);
		var y = (p0.y * b1 + p1.y * b2 + p2.y * b3 + p3.y * b4);
		return new Point(x, y);
	};

	export function reverseControlPoints(controlPoints) {
		var newArray = [];
		for (var i = controlPoints.length - 1; i >= 0; i--) {
			newArray.push(new Point(controlPoints[i].x, controlPoints[i].y));
		}
		return newArray;
	};

	export function cloneControlPoints(controlPoints): Array<Point> {
		var newArray = [];
		for (var i = 0; i < controlPoints.length; i++)
			newArray.push(new Point(controlPoints[i].x, controlPoints[i].y));
		return newArray;
	};

	export function getControlPointAt(controlPoints, pos) {
		var p = Math.min(controlPoints.length - 1, Math.max(pos, 0));
		return controlPoints[p];
	};

	export function reverseControlPointsInline(controlPoints) {
		var len = controlPoints.length;
		var mid = 0 | (len / 2);
		for (var i = 0; i < mid; ++i) {
			var temp = controlPoints[i];
			controlPoints[i] = controlPoints[len - i - 1];
			controlPoints[len - i - 1] = temp;
		}
	};

	export class CardinalSplineTo extends ActionInterval {
		protected points: Array<Point> = null;
		protected deltaT: number = 0;
		protected tension: number = 0;
		protected previousPosition: Point = null;
		protected accumulatedDiff: Point = null;

		constructor(duration?: number, points?: Array<Point>, tension?: number) {
			super(duration);
			this.points = new Array<Point>();
			duration && this.initWithDurationInner(duration, points, tension);
		}

		public initWithDurationInner(duration: number, points: Array<Point>, tension: number) {
			if (!points || points.length === 0) {
				return false;
			}

			if (super.initWithDuration(duration)) {
				this.setPoints(points);
				this.tension = tension;
				return true;
			}
			return false;
		}

		public clone() {
			var action = new CardinalSplineTo(0, null, 0);
			action.initWithDurationInner(this.duration, cloneControlPoints(this.points), this.tension);
			return action;
		}

		public startWithTarget(target: ActionObject) {
			super.startWithTarget(target);
			// Issue #1441 from cocos2d-iphone
			this.deltaT = 1 / (this.points.length - 1);
			this.previousPosition = new Point(this.target.getPosition().x, this.target.getPosition().y);
			this.accumulatedDiff = new Point(0, 0);
		}

		public update(dt: number) {
			dt = this.computeEaseTime(dt);
			var p, lt;
			var ps = this.points;
			// eg.
			// p..p..p..p..p..p..p
			// 1..2..3..4..5..6..7
			// want p to be 1, 2, 3, 4, 5, 6
			if (dt === 1) {
				p = ps.length - 1;
				lt = 1;
			} else {
				var locDT = this.deltaT;
				p = 0 | (dt / locDT);
				lt = (dt - locDT * p) / locDT;
			}

			var newPos = cardinalSplineAt(
				getControlPointAt(ps, p - 1),
				getControlPointAt(ps, p - 0),
				getControlPointAt(ps, p + 1),
				getControlPointAt(ps, p + 2),
				this.tension, lt);

			var tempX, tempY;
			tempX = this.target.getPosition().x - this.previousPosition.x;
			tempY = this.target.getPosition().y - this.previousPosition.y;
			if (tempX !== 0 || tempY !== 0) {
				var locAccDiff = this.accumulatedDiff;
				tempX = locAccDiff.x + tempX;
				tempY = locAccDiff.y + tempY;
				locAccDiff.x = tempX;
				locAccDiff.y = tempY;
				newPos.x += tempX;
				newPos.y += tempY;
			}
			this.updatePosition(newPos);
		}

		public reverse() {
			var reversePoints = reverseControlPoints(this.points);
			return cardinalSplineTo(this.duration, reversePoints, this.tension);
		}

		public updatePosition(newPos: Point) {
			this.target.setPosition(newPos.x, newPos.y);
			this.previousPosition = newPos;
		}

		public getPoints() {
			return this.points;
		}

		public setPoints(points) {
			this.points = points;
		}
	}

	export function cardinalSplineTo(duration: number, points: Array<Point>, tension: number) {
		return new CardinalSplineTo(duration, points, tension);
	};
}