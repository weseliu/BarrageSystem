module actions {
	export class MoveTo extends MoveBy {

		protected endPosition: Point = new Point();

		constructor(duration: number, x: number, y: number) {
			super(duration, 0, 0);

			this.endPosition = new Point();
			this.initWithDurationInner(duration, x, y);
		}

		public initWithDurationInner(duration, x, y) {
			if (super.initWithDurationInner(duration, x, y)) {
				this.endPosition.x = x;
				this.endPosition.y = y;
				return true;
			}
			return false;
		}

		public clone() {
			var action = new MoveTo(this.duration, this.endPosition.x, this.endPosition.y);
			this.cloneDecoration(action);
			action.initWithDurationInner(this.duration, this.endPosition.x, this.endPosition.y);
			return action;
		}

		public startWithTarget(target) {
			super.startWithTarget(target);
			this.positionDelta.x = this.endPosition.x - target.x;
			this.positionDelta.y = this.endPosition.y - target.y;
		}
	}

	export function moveTo(duration: number, x: number, y: number){
		return new MoveTo(duration, x, y);
	}
}