module actions {
	export class SkewBy extends SkewTo {

		public initWithDurationInner(t, deltaSkewX, deltaSkewY) {
			if (super.initWithDurationInner(t, deltaSkewX, deltaSkewY)) {
				this.skewX = deltaSkewX;
				this.skewY = deltaSkewY;
				return true;
			}
			return false;
		}

		public clone() {
			var action = new SkewBy(this.duration, this.skewX, this.skewY);
			this.cloneDecoration(action);
			action.initWithDurationInner(this.duration, this.skewX, this.skewY);
			return action;
		}

		public startWithTarget(target) {
			super.startWithTarget(target);
			this.deltaX = this.skewX;
			this.deltaY = this.skewY;
			this.endSkewX = this.startSkewX + this.deltaX;
			this.endSkewY = this.startSkewY + this.deltaY;
		}

		public reverse() {
			var action = new SkewBy(this.duration, -this.skewX, -this.skewY);
			this.cloneDecoration(action);
			this.reverseEaseList(action);
			return action;
		}
	}

	export function skewBy(t, deltaSkewX, deltaSkewY){
		return new SkewBy(t, deltaSkewX, deltaSkewY);
	}
}