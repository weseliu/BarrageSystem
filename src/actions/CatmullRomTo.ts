module actions {
	export class CatmullRomTo extends CardinalSplineTo {
		
		constructor(duration, points) {
			super(duration, points, 0.5);
			this.initWithDurationInner(duration, points, 0.5);
		}

		public clone() {
			var action = new CatmullRomTo(0, null);
			action.initWithDurationInner(this.duration, cloneControlPoints(this.points), 0.5);
			return action;
		}
	}

	export function catmullRomTo(dt, points) {
		return new CatmullRomTo(dt, points);
	};
}