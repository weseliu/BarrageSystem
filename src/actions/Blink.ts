module actions {
	export class Blink extends ActionInterval {
		protected times: number = 0;
		protected originalState: boolean = false;

		constructor(duration, blinks) {
			super(duration);
			this.initWithDurationInner(duration, blinks);
		}

		public initWithDurationInner(duration, blinks) {
			if (super.initWithDuration(duration)) {
				this.times = blinks;
				return true;
			}
			return false;
		}

		public clone() {
			var action = new Blink(this.duration, this.times);
			this.cloneDecoration(action);
			action.initWithDurationInner(this.duration, this.times);
			return action;
		}

		public update(dt) {
			dt = this.computeEaseTime(dt);
			if (this.target && !this.isDone()) {
				var slice = 1.0 / this.times;
				var m = dt % slice;
				this.target.setVisible(m > (slice / 2));
			}
		}

		public startWithTarget(target: ActionObject) {
			super.startWithTarget(target);
			this.originalState = target.getVisible();
		}

		public stop() {
			this.target.setVisible(this.originalState);
			super.stop();
		}

		public reverse() {
			var action = new Blink(this.duration, this.times);
			this.cloneDecoration(action);
			this.reverseEaseList(action);
			return action;
		}
	}

	export function blink(duration, blinks) {
		return new Blink(duration, blinks);
	};
}