module actions {
	export class RotateBy extends ActionInterval {
		protected angle: number = 0;
		protected startAngle: number = 0;

		constructor(duration, deltaAngle) {
			super(duration);
			this.initWithDurationInner(duration, deltaAngle);
		}

		private initWithDurationInner(duration, deltaAngle) : boolean{
			if (super.initWithDuration(duration)) {
				this.angle = deltaAngle || 0;
				return true;
			}
			return false;
		}

		public clone() {
			var action = new RotateBy(this.duration, this.angle);
			this.cloneDecoration(action);
			action.initWithDurationInner(this.duration, this.angle);
			return action;
		}

		public startWithTarget(target) {
			super.startWithTarget(target);
			this.startAngle = target.rotation;
		}

		public update(dt) {
			dt = this.computeEaseTime(dt);
			if (this.target) {
				this.target.rotation = this.startAngle + this.angle * dt;
			}
		}

		public reverse() {
			var action = new RotateBy(this.duration, -this.angle);
			this.cloneDecoration(action);
			this.reverseEaseList(action);
			return action;
		}
	}

	export function rotateBy(duration, deltaAngle) {
		return new RotateBy(duration, deltaAngle);
	};
}