module actions {
	export class SkewTo extends ActionInterval {
		protected skewX: number = 0;
		protected skewY: number = 0;
		protected startSkewX: number = 0;
		protected startSkewY: number = 0;
		protected endSkewX: number = 0;
		protected endSkewY: number = 0;
		protected deltaX: number = 0;
		protected deltaY: number = 0;

		constructor(duration, skewX, skewY) {
			super(duration);
			this.initWithDurationInner(duration, skewX, skewY);
		}

		public initWithDurationInner(duration, skewX, skewY) {
			var ret = false;
			if (super.initWithDuration(duration)) {
				this.endSkewX = skewX;
				this.endSkewY = skewY;
				return true;
			}
			return false;
		}

		public clone() {
			var action = new SkewTo(this.duration, this.endSkewX, this.endSkewY);
			this.cloneDecoration(action);
			action.initWithDurationInner(this.duration, this.endSkewX, this.endSkewY);
			return action;
		}

		public startWithTarget(target: ActionObject) {
			super.startWithTarget(target);

			this.startSkewX = target.getSkew().x % 180;
			this.deltaX = this.endSkewX - this.startSkewX;
			if (this.deltaX > 180)
				this.deltaX -= 360;
			if (this.deltaX < -180)
				this.deltaX += 360;

			this.startSkewY = target.getSkew().y % 360;
			this.deltaY = this.endSkewY - this.startSkewY;
			if (this.deltaY > 180)
				this.deltaY -= 360;
			if (this.deltaY < -180)
				this.deltaY += 360;
		}

		public update(dt) {
			dt = this.computeEaseTime(dt);
			this.target.setSkew(this.startSkewX + this.deltaX * dt, this.startSkewY + this.deltaY * dt);
		}
	}

	export function skewTo(duration, skewX, skewY) {
		return new SkewTo(duration, skewX, skewY);
	};
}