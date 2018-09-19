module actions {
	export class Place extends ActionInstant {
		protected x: number = 0;
		protected y: number = 0;
		constructor(x, y) {
			super();
			this.initWithPosition(x, y);
		}

		public initWithPosition(x, y) {
			this.x = x;
			this.y = y;
			return true;
		}

		public update(dt) {
			this.target.setPosition(this.x, this.y);
		}

		public clone() {
			var action = new Place(this.x, this.y);
			action.initWithPosition(this.x, this.y);
			return action;
		}
	}

	export function place(x, y) {
		return new Place(x, y);
	};
}