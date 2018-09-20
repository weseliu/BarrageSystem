module actions {
	export class SkewBy extends SkewTo {

		public initWithDurationInner(duration: number, deltaSkewX: number, deltaSkewY: number) {
			if (super.initWithDurationInner(duration, deltaSkewX, deltaSkewY)) {
				this.skewX = deltaSkewX;
				this.skewY = deltaSkewY;
				return true;
			}
			return false;
		}

		public clone() {
			var action = new SkewBy();
			this.cloneDecoration(action);
			action.initWithDurationInner(this.duration, this.skewX, this.skewY);
			return action;
		}

		public startWithTarget(target: ActionObject) {
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

	export function skewBy(duration: number, deltaSkewX: number, deltaSkewY: number){
		return new SkewBy(duration, deltaSkewX, deltaSkewY);
	}
}