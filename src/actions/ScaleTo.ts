module actions {
	export class ScaleTo extends ActionInterval {
		protected _scaleX: number = 1;
		protected _scaleY: number = 1;
		protected _startScaleX: number = 1;
		protected _startScaleY: number = 1;
		protected _endScaleX: number = 0;
		protected _endScaleY: number = 0;
		protected _deltaX: number = 0;
		protected _deltaY: number = 0;

		constructor(duration, sx, sy) {
			super(duration);
			this.initWithDurationInner(duration, sx, sy);
		}

		public initWithDurationInner(duration, sx, sy) {
			if (super.initWithDuration(duration)) {
				this._endScaleX = sx;
				this._endScaleY = sy;
				return true;
			}
			return false;
		}

		public clone() {
			var action = new ScaleTo(this.duration, this._endScaleX, this._endScaleY);
			this.cloneDecoration(action);
			action.initWithDurationInner(this.duration, this._endScaleX, this._endScaleY);
			return action;
		}

		public startWithTarget(target: ActionObject) {
			super.startWithTarget(target);
			this._startScaleX = target.getScale().x;
			this._startScaleY = target.getScale().y;
			this._deltaX = this._endScaleX - this._startScaleX;
			this._deltaY = this._endScaleY - this._startScaleY;
		}

		public update(dt) {
			dt = this.computeEaseTime(dt);
			if (this.target) {
				this.target.setScale(this._startScaleX + this._deltaX * dt, this._startScaleY + this._deltaY * dt);
			}
		}
	}

	export function scaleTo(duration, sx, sy) {
		return new ScaleTo(duration, sx, sy);
	};
}