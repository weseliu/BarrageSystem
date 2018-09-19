module actions {
	export class BezierTo extends BezierBy {

		protected toConfig: Array<Point> = null;

		constructor(duration: number, points: Array<Point>) {
			super(duration, points);
			this.toConfig = [];
			this.initWithDurationInner(duration, points);
		}

		public initWithDurationInner(duration: number, points: Array<Point>) {
			if (super.initWithDurationInner(duration, points)) {
				this.toConfig = points;
				return true;
			}
			return false;
		}

		public clone() {
			var action = new BezierTo(this.duration, this.toConfig);
			this.cloneDecoration(action);
			action.initWithDurationInner(this.duration, this.toConfig);
			return action;
		}

		public startWithTarget(target: ActionObject) {
			super.startWithTarget(target);
			var locStartPos = this.startPosition;
			var locToConfig = this.toConfig;
			var locConfig = this.config;

			locConfig[0] = Point.sub(locToConfig[0], locStartPos);
			locConfig[1] = Point.sub(locToConfig[1], locStartPos);
			locConfig[2] = Point.sub(locToConfig[2], locStartPos);
		}
	}

	export function bezierTo(duration: number, points: Array<Point>) {
		return new BezierTo(duration, points);
	};
}