module actions {
	export class EaseExponentialIn extends ActionEase {

		public update(dt) {
			this.innerAction.update(dt === 0 ? 0 : Math.pow(2, 10 * (dt - 1)));
		}

		public reverse() {
			return new EaseExponentialOut(this.innerAction.reverse());
		}

		public clone() {
			var action = new EaseExponentialIn(null);
			action.initWithAction(this.innerAction.clone());
			return action;
		}
	}

	export function easeExponentialIn(action) {
		return new EaseExponentialIn(action);
	}
}