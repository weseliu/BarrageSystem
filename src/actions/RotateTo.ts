module actions {
	export class RotateTo extends ActionInterval {
		protected _dstAngleX: number = 0;
		protected _startAngleX: number = 0;
		protected _diffAngleX: number = 0;

		protected _dstAngleY: number = 0;
		protected _startAngleY: number = 0;
		protected _diffAngleY: number = 0;

		constructor(duration: number, deltaAngleX: number, deltaAngleY: number) {
			super(duration);
			this.initWithDurationInner(duration, deltaAngleX, deltaAngleY)
		}

		private initWithDurationInner(duration: number, deltaAngleX: number, deltaAngleY: number): boolean {
			if (super.initWithDuration(duration)) {
				this._dstAngleX = deltaAngleX || 0;
				this._dstAngleY = deltaAngleY || this._dstAngleX;
				return true;
			}
			return false;
		}

		public clone() {
			var action = new RotateTo(this.duration, this._dstAngleX, this._dstAngleY);
			this.cloneDecoration(action);
			action.initWithDurationInner(this.duration, this._dstAngleX, this._dstAngleY);
			return action;
		}

		public startWithTarget(target) {
			super.startWithTarget(target);

			// Calculate X
			var locStartAngleX = target.rotationX % 360.0;
			var locDiffAngleX = this._dstAngleX - locStartAngleX;
			if (locDiffAngleX > 180) {
				locDiffAngleX -= 360;
			}
			if (locDiffAngleX < -180) {
				locDiffAngleX += 360;
			}
			this._startAngleX = locStartAngleX;
			this._diffAngleX = locDiffAngleX;

			// Calculate Y  It's duplicated from calculating X since the rotation wrap should be the same
			this._startAngleY = target.rotationY % 360.0;
			var locDiffAngleY = this._dstAngleY - this._startAngleY;
			if (locDiffAngleY > 180) {
				locDiffAngleY -= 360;
			}
			if (locDiffAngleY < -180) {
				locDiffAngleY += 360;
			}
			this._diffAngleY = locDiffAngleY;
		}

		public reverse() {
		}

		public update(dt) {
			dt = this.computeEaseTime(dt);
			if (this.target) {
				this.target.rotationX = this._startAngleX + this._diffAngleX * dt;
				this.target.rotationY = this._startAngleY + this._diffAngleY * dt;
			}
		}
	}

	export function rotateTo(duration, deltaAngleX, deltaAngleY) : RotateTo{
		return new RotateTo(duration, deltaAngleX, deltaAngleY);
	};
}