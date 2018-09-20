module actions {
	export class CatmullRomTo extends CardinalSplineTo {
		
		constructor(duration?: number, points?: Array<Point>) {
			super(duration, points, 0.5);
			duration && this.initWithDurationInner(duration, points, 0.5);
		}

		public clone() {
			var action = new CatmullRomTo();
			action.initWithDurationInner(this.duration, cloneControlPoints(this.points), 0.5);
			return action;
		}
	}

	export function catmullRomTo(duration: number, points: Array<Point>) {
		return new CatmullRomTo(duration, points);
	};
}