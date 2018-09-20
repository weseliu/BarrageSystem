module actions {
	export class ActionInstant extends FiniteTimeAction {
		constructor() {
			super();
		}

		public isDone() {
			return true;
		}

		public step(dt: number) {
		}

		public update(dt: number) {
		}

		public reverse() {
			return this.clone();
		}

		public clone() {
			return new ActionInstant();
		}
	}
}