module actions {
	export class MoveBy extends ActionInterval {

		protected positionDelta: Point = new Point();
		protected startPosition: Point = new Point();
		protected previousPosition: Point = new Point();

		constructor(duration?: number, deltaX?: number, deltaY?: number) {
			super();

			this.positionDelta = new Point();
			this.startPosition = new Point();
			this.previousPosition = new Point();
			duration && this.initWithDurationInner(duration, deltaX, deltaY);
		}

		public initWithDurationInner(duration: number, x: number, y: number) {
			if (super.initWithDuration(duration)) {
				this.positionDelta.x = x;
				this.positionDelta.y = y;
				return true;
			}
			return false;
		}

		public clone() {
			var action = new MoveBy();
			this.cloneDecoration(action);
			action.initWithDurationInner(this.duration, this.positionDelta.x, this.positionDelta.y);
			return action;
		}

		public startWithTarget(target: ActionObject) {
			super.startWithTarget(target);
			var locPosX = target.getPosition().x;
			var locPosY = target.getPosition().y;
			this.previousPosition.x = locPosX;
			this.previousPosition.y = locPosY;
			this.startPosition.x = locPosX;
			this.startPosition.y = locPosY;
		}

		public update(dt: number) {
			dt = this.computeEaseTime(dt);
			if (this.target) {
				var x = this.positionDelta.x * dt;
				var y = this.positionDelta.y * dt;
				var locStartPosition = this.startPosition;
				var targetX = this.target.getPosition().x;
				var targetY = this.target.getPosition().y;
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
			var action = new MoveBy(this.duration, -this.positionDelta.x, -this.positionDelta.y);
			this.cloneDecoration(action);
			this.reverseEaseList(action);
			return action;
		}
	}

	export function moveBy(duration: number, deltaX: number, deltaY: number){
		return new MoveBy(duration, deltaX, deltaY);
	}
}