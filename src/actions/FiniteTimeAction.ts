module actions {

	export class FiniteTimeAction extends Action {

		public duration: number = 0;

		constructor() {
			super();
			this.duration = 0;
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

	export function finiteTimeAction(): FiniteTimeAction{
		return new FiniteTimeAction();
	}
}