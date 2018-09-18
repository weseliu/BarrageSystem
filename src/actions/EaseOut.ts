module actions {
	export class EaseOut extends EaseRateAction {

		public update(dt) {
			this.innerAction.update(Math.pow(dt, 1 / this.rate));
		}

		public reverse() {
			return new EaseOut(this.innerAction.reverse(), 1 / this.rate);
		}

		public clone() {
			var action = new EaseOut(null, this.rate);
			action.initWithActionInner(this.innerAction.clone(), this.rate);
			return action;
		}
	}

	export function easeOut(action, rate){
		return new EaseOut(action, rate);
	}
}