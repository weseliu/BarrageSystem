module actions {
	export class Repeat extends ActionInterval {
		protected times: number = 0;
		protected total: number  = 0;
		protected nextDt: number = 0;
		protected actionInstant: boolean = false;
		protected innerAction: FiniteTimeAction = null;

		constructor(action?: FiniteTimeAction, times?: number) {
			super();
			action && this.initWithAction(action, times);
		}

		public initWithAction(action: FiniteTimeAction, times: number) {
			var duration = action.duration * times;
			if (this.initWithDuration(duration)) {
				this.times = times;
				this.innerAction = action;
				if (action instanceof ActionInstant) {
					this.actionInstant = true;
					this.times -= 1;
				}
				this.total = 0;
				return true;
			}
			return false;
		}

		public clone() {
			var action = new Repeat(null, 0);
			this.cloneDecoration(action);
			action.initWithAction(this.innerAction.clone(), this.times);
			return action;
		}

		public startWithTarget(target) {
			super.startWithTarget(target);
			this.total = 0;
			this.nextDt = this.innerAction.duration / this.duration;
			this.innerAction.startWithTarget(target);
		}

		public stop() {
			this.innerAction.stop();
			super.stop();
		}

		public update(dt: number) {
			dt = this.computeEaseTime(dt);
			var locInnerAction = this.innerAction;
			var locDuration = this.duration;
			var locTimes = this.times;
			var locNextDt = this.nextDt;

			if (dt >= locNextDt) {
				while (dt > locNextDt && this.total < locTimes) {
					locInnerAction.update(1);
					this.total++;
					locInnerAction.stop();
					locInnerAction.startWithTarget(this.target);
					locNextDt += locInnerAction.duration / locDuration;
					this.nextDt = locNextDt;
				}

				if (dt >= 1.0 && this.total < locTimes){
					this.total++;
				}

				if (!this.actionInstant) {
					if (this.total === locTimes) {
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
			return this.total === this.times;
		}

		public reverse() {
			var action = new Repeat(this.innerAction.reverse(), this.times);
			this.cloneDecoration(action);
			this.reverseEaseList(action);
			return action;
		}

		public setInnerAction(action) {
			if (this.innerAction !== action) {
				this.innerAction = action;
			}
		}

		public getInnerAction() {
			return this.innerAction;
		}
	}

	export function repeat(action: FiniteTimeAction, times: number) : Repeat{
		return new Repeat(action, times);
	}
}