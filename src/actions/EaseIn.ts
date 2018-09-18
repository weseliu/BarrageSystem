module actions {
	export class EaseIn extends EaseRateAction {

		public update(dt) {
			this.innerAction.update(Math.pow(dt, this.rate));
		}

		public reverse() {
			return new EaseIn(this.innerAction.reverse(), 1 / this.rate);
		}

		public clone() {
			var action = new EaseIn(null, this.rate);
			action.initWithActionInner(this.innerAction.clone(), this.rate);
			return action;
		}
	}

	export function easeIn(action, rate){
		return new EaseIn(action, rate);
	}
}