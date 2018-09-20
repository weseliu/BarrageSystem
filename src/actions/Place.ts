module actions {
	export class Place extends ActionInstant {
		protected x: number = 0;
		protected y: number = 0;
		constructor(x?: number, y?: number) {
			super();
			x && this.initWithPosition(x, y);
		}

		public initWithPosition(x: number, y: number) {
			this.x = x;
			this.y = y;
			return true;
		}

		public update(dt: number) {
			this.target.setPosition(this.x, this.y);
		}

		public clone() {
			var action = new Place();
			action.initWithPosition(this.x, this.y);
			return action;
		}
	}

	export function place(x: number, y: number) {
		return new Place(x, y);
	};
}