module actions {
	export class RotateTo extends ActionInterval {
		protected _dstAngle: number = 0;
		protected _startAngle: number = 0;
		protected _diffAngle: number = 0;

		constructor(duration: number, deltaAngle: number) {
			super(duration);
			this.initWithDurationInner(duration, deltaAngle)
		}

		private initWithDurationInner(duration: number, deltaAngleX: number): boolean {
			if (super.initWithDuration(duration)) {
				this._dstAngle = deltaAngleX || 0;
				return true;
			}
			return false;
		}

		public clone() {
			var action = new RotateTo(this.duration, this._dstAngle);
			this.cloneDecoration(action);
			action.initWithDurationInner(this.duration, this._dstAngle);
			return action;
		}

		public startWithTarget(target) {
			super.startWithTarget(target);

			// Calculate X
			var locStartAngle = target.rotation % 360.0;
			var locDiffAngle = this._dstAngle - locStartAngle;
			if (locDiffAngle > 180) {
				locDiffAngle -= 360;
			}
			if (locDiffAngle < -180) {
				locDiffAngle += 360;
			}
			this._startAngle = locStartAngle;
			this._diffAngle = locDiffAngle;
		}

		public reverse() {
		}

		public update(dt) {
			dt = this.computeEaseTime(dt);
			if (this.target) {
				this.target.rotation = this._startAngle + this._diffAngle * dt;
			}
		}
	}

	export function rotateTo(duration, deltaAngle) : RotateTo{
		return new RotateTo(duration, deltaAngle);
	};
}