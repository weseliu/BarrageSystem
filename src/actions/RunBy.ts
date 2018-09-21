module actions {
	export class RunBy extends MoveBy {
		protected degrees: number = 0;
		protected runSpeed: number = 0;

		constructor(duration?: number, degrees?: number, speed?: number) {
			super();
			this.degrees = degrees;
			this.runSpeed = speed;

			var moveSpeed = common.Vec3.fromDegrees(degrees).normalize().mul(speed);
			duration && this.initWithDurationInner(duration, moveSpeed.x, moveSpeed.y);
		}

		public startWithTarget(target: ActionObject) {
			super.startWithTarget(target);
			target.setRotation(this.degrees);
		}

		public clone() {
			var action = new RunBy();
			this.cloneDecoration(action);
			action.initWithDurationInner(this.duration, this.positionDelta.x, this.positionDelta.y);
			return action;
		}

		public reverse() {
			var action = new RunBy(this.duration, this.degrees, -this.runSpeed);
			this.cloneDecoration(action);
			this.reverseEaseList(action);
			return action;
		}
	}

	export function runBy(duration: number, degrees: number, speed: number){
		return new RunBy(duration, degrees, speed);
	}
}