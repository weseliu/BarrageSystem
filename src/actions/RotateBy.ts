module actions {
	export class RotateBy extends ActionInterval {
		protected _angle: number = 0;
		protected _startAngle: number = 0;

		constructor(duration, deltaAngle) {
			super(duration);
			this.initWithDurationInner(duration, deltaAngle);
		}

		private initWithDurationInner(duration, deltaAngle) : boolean{
			if (super.initWithDuration(duration)) {
				this._angle = deltaAngle || 0;
				return true;
			}
			return false;
		}

		public clone() {
			var action = new RotateBy(this.duration, this._angle);
			this.cloneDecoration(action);
			action.initWithDurationInner(this.duration, this._angle);
			return action;
		}

		public startWithTarget(target) {
			super.startWithTarget(target);
			this._startAngle = target.rotation;
		}

		public update(dt) {
			dt = this.computeEaseTime(dt);
			if (this.target) {
				this.target.rotation = this._startAngle + this._angle * dt;
			}
		}

		public reverse() {
			var action = new RotateBy(this.duration, -this._angle);
			this.cloneDecoration(action);
			this.reverseEaseList(action);
			return action;
		}
	}

	export function rotateBy(duration, deltaAngle) {
		return new RotateBy(duration, deltaAngle);
	};
}