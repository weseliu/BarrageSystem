module actions {
	export class RotateBy extends ActionInterval {
		protected _angleX: number = 0;
		protected _startAngleX: number = 0;
		protected _angleY: number = 0;
		protected _startAngleY: number = 0;

		constructor(duration, deltaAngleX, deltaAngleY) {
			super(duration);
			this.initWithDurationInner(duration, deltaAngleX, deltaAngleY);
		}

		private initWithDurationInner(duration, deltaAngleX, deltaAngleY) : boolean{
			if (super.initWithDuration(duration)) {
				this._angleX = deltaAngleX || 0;
				this._angleY = deltaAngleY || this._angleX;
				return true;
			}
			return false;
		}

		public clone() {
			var action = new RotateBy(this.duration, this._angleX, this._angleY);
			this.cloneDecoration(action);
			action.initWithDurationInner(this.duration, this._angleX, this._angleY);
			return action;
		}

		public startWithTarget(target) {
			super.startWithTarget(target);
			this._startAngleX = target.rotationX;
			this._startAngleY = target.rotationY;
		}

		public update(dt) {
			dt = this.computeEaseTime(dt);
			if (this.target) {
				this.target.rotationX = this._startAngleX + this._angleX * dt;
				this.target.rotationY = this._startAngleY + this._angleY * dt;
			}
		}

		public reverse() {
			var action = new RotateBy(this.duration, -this._angleX, -this._angleY);
			this.cloneDecoration(action);
			this.reverseEaseList(action);
			return action;
		}
	}

	export function rotateBy(duration, deltaAngleX, deltaAngleY) {
		return new RotateBy(duration, deltaAngleX, deltaAngleY);
	};
}