module actions {

	export function bezierAt(a, b, c, d, t) {
		return (Math.pow(1 - t, 3) * a +
			3 * t * (Math.pow(1 - t, 2)) * b +
			3 * Math.pow(t, 2) * (1 - t) * c +
			Math.pow(t, 3) * d);
	};

	export class BezierBy extends ActionInterval {
		protected config: Array<Point> = null;
		protected startPosition: Point = null;
		protected previousPosition: Point = null;

		constructor(duration: number, points: Array<Point>) {
			super(duration);

			this.config = new Array<Point>();
			this.startPosition = new Point();
			this.previousPosition = new Point();

			this.initWithDurationInner(duration, points);
		}

		public initWithDurationInner(duration: number, points: Array<Point>) {
			if (super.initWithDuration(duration)) {
				this.config = points;
				return true;
			}
			return false;
		}

		public clone() {
			var newConfigs = [];
			for (var i = 0; i < this.config.length; i++) {
				var selConf = this.config[i];
				newConfigs.push(new Point(selConf.x, selConf.y));
			}

			var action = new BezierBy(this.duration, newConfigs);
			this.cloneDecoration(action);
			action.initWithDurationInner(this.duration, newConfigs);
			return action;
		}

		public startWithTarget(target) {
			super.startWithTarget(target);
			var locPosX = target.getPositionX();
			var locPosY = target.getPositionY();
			this.previousPosition.x = locPosX;
			this.previousPosition.y = locPosY;
			this.startPosition.x = locPosX;
			this.startPosition.y = locPosY;
		}

		public update(dt) {
			dt = this.computeEaseTime(dt);
			if (this.target) {
				var locConfig = this.config;
				var xa = 0;
				var xb = locConfig[0].x;
				var xc = locConfig[1].x;
				var xd = locConfig[2].x;

				var ya = 0;
				var yb = locConfig[0].y;
				var yc = locConfig[1].y;
				var yd = locConfig[2].y;

				var x = actions.bezierAt(xa, xb, xc, xd, dt);
				var y = actions.bezierAt(ya, yb, yc, yd, dt);

				var locStartPosition = this.startPosition;
				var targetX = this.target.getPositionX();
				var targetY = this.target.getPositionY();
				var locPreviousPosition = this.previousPosition;

				locStartPosition.x = locStartPosition.x + targetX - locPreviousPosition.x;
				locStartPosition.y = locStartPosition.y + targetY - locPreviousPosition.y;
				x = x + locStartPosition.x;
				y = y + locStartPosition.y;
				locPreviousPosition.x = x;
				locPreviousPosition.y = y;
				this.target.setPosition(x, y);
			}
		}

		public reverse() {
			var locConfig = this.config;
			var r = [
				Point.add(locConfig[1], Point.neg(locConfig[2])),
				Point.add(locConfig[0], Point.neg(locConfig[2])),
				Point.neg(locConfig[2])];
			var action = new BezierBy(this.duration, r);
			this.cloneDecoration(action);
			this.reverseEaseList(action);
			return action;
		}
	}

	export function bezierBy(duration: number, points: Array<Point>) {
		return new BezierBy(duration, points);
	};
}