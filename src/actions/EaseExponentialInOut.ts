module actions {
	export class EaseExponentialInOut extends ActionEase {

		public update(dt) {
			if (dt !== 1 && dt !== 0) {
				dt *= 2;
				if (dt < 1)
					dt = 0.5 * Math.pow(2, 10 * (dt - 1));
				else
					dt = 0.5 * (-Math.pow(2, -10 * (dt - 1)) + 2);
			}
			this.innerAction.update(dt);
		}

		public reverse() {
			return new EaseExponentialInOut(this.innerAction.reverse());
		}

		public clone() {
			var action = new EaseExponentialInOut(null);
			action.initWithAction(this.innerAction.clone());
			return action;
		}
	}

	export function easeExponentialInOut(action) {
		return new EaseExponentialInOut(action);
	};
}