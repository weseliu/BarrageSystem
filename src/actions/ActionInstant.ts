module actions {
	export class ActionInstant extends FiniteTimeAction {
		constructor() {
			super();
		}

		public isDone() {
			return true;
		}

		public step(dt) {
		}

		public update(dt) {
		}

		public reverse() {
			return this.clone();
		}

		public clone() {
			return new ActionInstant();
		}
	}
}