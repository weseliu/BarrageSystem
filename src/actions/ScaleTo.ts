module actions {
	export class ScaleTo extends ActionInterval {
		protected scaleX: number = 1;
		protected scaleY: number = 1;
		protected startScaleX: number = 1;
		protected startScaleY: number = 1;
		protected endScaleX: number = 0;
		protected endScaleY: number = 0;
		protected deltaX: number = 0;
		protected deltaY: number = 0;

		constructor(duration?: number, sx?: number, sy?: number) {
			super();
			duration && this.initWithDurationInner(duration, sx, sy);
		}

		public initWithDurationInner(duration: number, sx: number, sy: number) {
			if (super.initWithDuration(duration)) {
				this.endScaleX = sx;
				this.endScaleY = sy;
				return true;
			}
			return false;
		}

		public clone() {
			var action = new ScaleTo();
			this.cloneDecoration(action);
			action.initWithDurationInner(this.duration, this.endScaleX, this.endScaleY);
			return action;
		}

		public startWithTarget(target: ActionObject) {
			super.startWithTarget(target);
			this.startScaleX = target.getScale().x;
			this.startScaleY = target.getScale().y;
			this.deltaX = this.endScaleX - this.startScaleX;
			this.deltaY = this.endScaleY - this.startScaleY;
		}

		public update(dt) {
			dt = this.computeEaseTime(dt);
			if (this.target) {
				this.target.setScale(this.startScaleX + this.deltaX * dt, this.startScaleY + this.deltaY * dt);
			}
		}
	}

	export function scaleTo(duration: number, sx: number, sy: number) {
		return new ScaleTo(duration, sx, sy);
	};
}