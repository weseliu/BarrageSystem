module actions {
	export class EaseRateAction extends ActionEase {
		protected rate: number = 0;

		constructor(action, rate) {
			super(action);
			this.initWithActionInner(action, rate);
		}

		public setRate(rate) {
			this.rate = rate;
		}

		public getRate() {
			return this.rate;
		}

		public initWithActionInner(action, rate) {
			if (super.initWithAction(action)) {
				this.rate = rate;
				return true;
			}
			return false;
		}

		public clone() {
			var action = new EaseRateAction(null, this.rate);
			action.initWithActionInner(this.innerAction.clone(), this.rate);
			return action;
		}

		public reverse() {
			return new EaseRateAction(this.innerAction.reverse(), 1 / this.rate);
		}
	}

	export function easeRateAction(action, rate) {
		return new EaseRateAction(action, rate);
	};
}