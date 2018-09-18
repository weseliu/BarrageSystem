module actions {
	export class Place extends ActionInstant {
		protected _x: number = 0;
		protected _y: number = 0;
		constructor(x, y) {
			super();
			this.initWithPosition(x, y);
		}

		public initWithPosition(x, y) {
			this._x = x;
			this._y = y;
			return true;
		}

		public update(dt) {
			this.target.setPosition(this._x, this._y);
		}

		public clone() {
			var action = new Place(this._x, this._y);
			action.initWithPosition(this._x, this._y);
			return action;
		}
	}

	export function place(x, y) {
		return new Place(x, y);
	};
}