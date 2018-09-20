module actions {
	export class MoveTo extends MoveBy {

		protected endPosition: Point = new Point();

		constructor(duration?: number, x?: number, y?: number) {
			super();

			this.endPosition = new Point();
			duration && this.initWithDurationInner(duration, x, y);
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
			var action = new MoveTo();
			this.cloneDecoration(action);
			action.initWithDurationInner(this.duration, this.endPosition.x, this.endPosition.y);
			return action;
		}

		public startWithTarget(target: ActionObject) {
			super.startWithTarget(target);
			this.positionDelta.x = this.endPosition.x - target.getPosition().x;
			this.positionDelta.y = this.endPosition.y - target.getPosition().y;
		}
	}

	export function moveTo(duration: number, x: number, y: number){
		return new MoveTo(duration, x, y);
	}
}