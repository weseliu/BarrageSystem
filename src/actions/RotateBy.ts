module actions {
	export class RotateBy extends ActionInterval {
		protected angle: number = 0;
		protected startAngle: number = 0;

		constructor(duration?: number, deltaAngle?: number) {
			super(duration);
			this.initWithDurationInner(duration, deltaAngle);
		}

		private initWithDurationInner(duration: number, deltaAngle: number) : boolean{
			if (super.initWithDuration(duration)) {
				this.angle = deltaAngle || 0;
				return true;
			}
			return false;
		}

		public clone() {
			var action = new RotateBy();
			this.cloneDecoration(action);
			action.initWithDurationInner(this.duration, this.angle);
			return action;
		}

		public startWithTarget(target: ActionObject) {
			super.startWithTarget(target);
			this.startAngle = target.getRotation();
		}

		public update(dt: number) {
			dt = this.computeEaseTime(dt);
			if (this.target) {
				this.target.setRotation(this.startAngle + this.angle * dt);
			}
		}

		public reverse() {
			var action = new RotateBy(this.duration, -this.angle);
			this.cloneDecoration(action);
			this.reverseEaseList(action);
			return action;
		}
	}

	export function rotateBy(duration: number, deltaAngle: number) {
		return new RotateBy(duration, deltaAngle);
	};
}