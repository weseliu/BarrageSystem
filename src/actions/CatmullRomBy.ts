module actions {
	export class CatmullRomBy extends CardinalSplineBy {
		constructor(duration?: number, points?: Array<Point>) {
			super(duration, points, 0.5);
			duration && this.initWithDurationInner(duration, points, 0.5);
		}

		public clone() {
			var action = new CatmullRomBy(0, null);
			action.initWithDurationInner(this.duration, cloneControlPoints(this.points), 0.5);
			return action;
		}
	}

	export function catmullRomBy(duration: number, points: Array<Point>) {
		return new CatmullRomBy(duration, points);
	};
}