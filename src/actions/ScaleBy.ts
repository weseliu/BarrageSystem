module actions {
	export class ScaleBy extends ScaleTo {

		public startWithTarget(target: ActionObject) {
			super.startWithTarget(target);
			this.deltaX = this.startScaleX * this.endScaleX - this.startScaleX;
			this.deltaY = this.startScaleY * this.endScaleY - this.startScaleY;
		}

		public reverse() {
			var action = new ScaleBy(this.duration, 1 / this.endScaleX, 1 / this.endScaleY);
			this.cloneDecoration(action);
			this.reverseEaseList(action);
			return action;
		}

		public clone() {
			var action = new ScaleBy();
			this.cloneDecoration(action);
			action.initWithDurationInner(this.duration, this.endScaleX, this.endScaleY);
			return action;
		}
	}

	export function scaleBy(duration: number, sx: number, sy: number) {
		return new ScaleBy(duration, sx, sy);
	};
}