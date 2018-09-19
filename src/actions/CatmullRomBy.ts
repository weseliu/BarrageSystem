module actions {
	export class CatmullRomBy extends CardinalSplineBy {
		constructor(duration, points) {
			super(duration, points, 0.5);
			this.initWithDurationInner(duration, points, 0.5);
		}

		public clone() {
			var action = new CatmullRomBy(0, null);
			action.initWithDurationInner(this.duration, cloneControlPoints(this.points), 0.5);
			return action;
		}
	}

	export function catmullRomBy(dt, points) {
		return new CatmullRomBy(dt, points);
	};
}