module actions {
	export class Repeat extends ActionInterval {
		protected _times: number = 0;
		protected _total: number  = 0;
		protected _nextDt: number = 0;
		protected _actionInstant: boolean = false;
		protected _innerAction: FiniteTimeAction = null;

		constructor(action: FiniteTimeAction, times: number) {
			super(0);
			times > 0 && this.initWithAction(action, times);
		}

		public initWithAction(action: FiniteTimeAction, times: number) {
			var duration = action.duration * times;

			if (this.initWithDuration(duration)) {
				this._times = times;
				this._innerAction = action;
				if (action instanceof ActionInstant) {
					this._actionInstant = true;
					this._times -= 1;
				}
				this._total = 0;
				return true;
			}
			return false;
		}

		public clone() {
			var action = new Repeat(null, 0);
			this.cloneDecoration(action);
			action.initWithAction(this._innerAction.clone(), this._times);
			return action;
		}

		public startWithTarget(target) {
			super.startWithTarget(target);
			this._total = 0;
			this._nextDt = this._innerAction.duration / this.duration;
			this._innerAction.startWithTarget(target);
		}

		public stop() {
			this._innerAction.stop();
			super.stop();
		}

		public update(dt) {
			dt = this.computeEaseTime(dt);
			var locInnerAction = this._innerAction;
			var locDuration = this.duration;
			var locTimes = this._times;
			var locNextDt = this._nextDt;

			if (dt >= locNextDt) {
				while (dt > locNextDt && this._total < locTimes) {
					locInnerAction.update(1);
					this._total++;
					locInnerAction.stop();
					locInnerAction.startWithTarget(this.target);
					locNextDt += locInnerAction.duration / locDuration;
					this._nextDt = locNextDt;
				}

				if (dt >= 1.0 && this._total < locTimes){
					this._total++;
				}

				if (!this._actionInstant) {
					if (this._total === locTimes) {
						locInnerAction.update(1);
						locInnerAction.stop();
					} else {
						locInnerAction.update(dt - (locNextDt - locInnerAction.duration / locDuration));
					}
				}
			} else {
				locInnerAction.update((dt * locTimes) % 1.0);
			}
		}

		public isDone() {
			return this._total === this._times;
		}

		public reverse() {
			var action = new Repeat(this._innerAction.reverse(), this._times);
			this.cloneDecoration(action);
			this.reverseEaseList(action);
			return action;
		}

		public setInnerAction(action) {
			if (this._innerAction !== action) {
				this._innerAction = action;
			}
		}

		public getInnerAction() {
			return this._innerAction;
		}
	}

	export function repeat(action: FiniteTimeAction, times: number) : Repeat{
		return new Repeat(action, times);
	}
}