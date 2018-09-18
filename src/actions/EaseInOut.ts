module actions {
	export class EaseInOut extends EaseRateAction {
		public update(dt) {
			dt *= 2;
			if (dt < 1)
				this.innerAction.update(0.5 * Math.pow(dt, this.rate));
			else
				this.innerAction.update(1.0 - 0.5 * Math.pow(2 - dt, this.rate));
		}

		public clone() {
			var action = new EaseInOut(null, 0);
			action.initWithActionInner(this.innerAction.clone(), this.rate);
			return action;
		}

		public reverse() {
			return new EaseInOut(this.innerAction.reverse(), this.rate);
		}
	}

	export function easeInOut(action, rate) {
		return new EaseInOut(action, rate);
	}
}