module actions {

	export class FiniteTimeAction extends Action {

		public duration: number = 0;

		constructor(duration?: number) {
			super();
			duration && (this.duration = duration);
		}

		public getDuration(): number {
			return this.duration;
		}

		public setDuration(duration: number) {
			this.duration = duration;
		}

		public reverse() : FiniteTimeAction{
			return null;
		}

		public clone() {
			return new FiniteTimeAction();
		}
	}
}