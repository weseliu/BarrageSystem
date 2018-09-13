module actions {

	export class FiniteTimeAction extends Action {

		protected timesForRepeat: number = 1;

		constructor() {
			super();
			this.duration = 0;
			this.timesForRepeat = 1;
		}

		public getDuration(): number {
			return this.duration * this.timesForRepeat;
		}

		public setDuration(duration: number) {
			this.duration = duration;
		}

		public reverse() {
		}

		public clone() {
			return new FiniteTimeAction();
		}
	}

	export function finiteTimeAction(): FiniteTimeAction{
		return new FiniteTimeAction();
	}
}