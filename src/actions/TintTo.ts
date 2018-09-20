module actions {
	export class TintTo extends ActionInterval {
		protected _to: Color = new Color();
		protected _from: Color = new Color();

		constructor(duration?: number, red?: number, green?: number, blue?: number) {
			super(duration);

			this._to = new Color();
			this._from = new Color();

			duration && this.initWithDurationInner(duration, red, green, blue);
		}

		public initWithDurationInner(duration: number, red: number, green: number, blue: number) {
			if (super.initWithDuration(duration)) {
				this._to = new Color(red, green, blue);
				return true;
			}
			return false;
		}

		public clone() {
			var action = new TintTo();
			this.cloneDecoration(action);
			var locTo = this._to;
			action.initWithDurationInner(this.duration, locTo.r, locTo.g, locTo.b);
			return action;
		}

		public startWithTarget(target: ActionObject) {
			super.startWithTarget(target);
			this._from = this.target.getColor();
		}

		public update(dt: number) {
			dt = this.computeEaseTime(dt);
			var locFrom = this._from, locTo = this._to;
			if (locFrom) {
				this.target.setColor(
					locFrom.r + (locTo.r - locFrom.r) * dt,
					locFrom.g + (locTo.g - locFrom.g) * dt,
					locFrom.b + (locTo.b - locFrom.b) * dt,
					1
				);
			}
		}
	}

	export function tintTo(duration: number, red: number, green: number, blue: number) {
		return new TintTo(duration, red, green, blue);
	};
}