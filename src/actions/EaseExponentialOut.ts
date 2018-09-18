module actions {
	export class EaseExponentialOut extends ActionEase {
		public update(dt) {
			this.innerAction.update(dt === 1 ? 1 : (-(Math.pow(2, -10 * dt)) + 1));
		}

		public reverse() {
			return new EaseExponentialIn(this.innerAction.reverse());
		}

		public clone() {
			var action = new EaseExponentialOut(null);
			action.initWithAction(this.innerAction.clone());
			return action;
		}
	}

	export function easeExponentialOut(action) {
		return new EaseExponentialOut(action);
	}
}