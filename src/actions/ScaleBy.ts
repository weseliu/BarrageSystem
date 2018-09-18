module actions {
	export class ScaleBy extends ScaleTo {

		public startWithTarget(target) {
			super.startWithTarget(target);
			this._deltaX = this._startScaleX * this._endScaleX - this._startScaleX;
			this._deltaY = this._startScaleY * this._endScaleY - this._startScaleY;
		}

		public reverse() {
			var action = new ScaleBy(this.duration, 1 / this._endScaleX, 1 / this._endScaleY);
			this.cloneDecoration(action);
			this.reverseEaseList(action);
			return action;
		}

		public clone() {
			var action = new ScaleBy(this.duration, this._endScaleX, this._endScaleY);
			this.cloneDecoration(action);
			action.initWithDurationInner(this.duration, this._endScaleX, this._endScaleY);
			return action;
		}
	}

	export function scaleBy(duration, sx, sy) {
		return new ScaleBy(duration, sx, sy);
	};
}