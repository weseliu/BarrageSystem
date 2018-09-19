module actions {
	export class RotateTo extends ActionInterval {
		protected dstAngle: number = 0;
		protected startAngle: number = 0;
		protected diffAngle: number = 0;

		constructor(duration: number, deltaAngle: number) {
			super(duration);
			this.initWithDurationInner(duration, deltaAngle)
		}

		private initWithDurationInner(duration: number, deltaAngleX: number): boolean {
			if (super.initWithDuration(duration)) {
				this.dstAngle = deltaAngleX || 0;
				return true;
			}
			return false;
		}

		public clone() {
			var action = new RotateTo(this.duration, this.dstAngle);
			this.cloneDecoration(action);
			action.initWithDurationInner(this.duration, this.dstAngle);
			return action;
		}

		public startWithTarget(target: ActionObject) {
			super.startWithTarget(target);

			var locStartAngle = target.getRotation() % 360.0;
			var locDiffAngle = this.dstAngle - locStartAngle;
			if (locDiffAngle > 180) {
				locDiffAngle -= 360;
			}
			if (locDiffAngle < -180) {
				locDiffAngle += 360;
			}
			this.startAngle = locStartAngle;
			this.diffAngle = locDiffAngle;
		}

		public reverse() {
		}

		public update(dt) {
			dt = this.computeEaseTime(dt);
			if (this.target) {
				this.target.setRotation(this.startAngle + this.diffAngle * dt);
			}
		}
	}

	export function rotateTo(duration, deltaAngle) : RotateTo{
		return new RotateTo(duration, deltaAngle);
	};
}