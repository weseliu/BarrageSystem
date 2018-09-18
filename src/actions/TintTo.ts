module actions {
	export class TintTo extends ActionInterval {
		protected _to: Color = new Color();
		protected _from: Color = new Color();

		constructor(duration, red, green, blue) {
			super(duration);

			this._to = new Color();
			this._from = new Color();

			this.initWithDurationInner(duration, red, green, blue);
		}

		public initWithDurationInner(duration, red, green, blue) {
			if (super.initWithDuration(duration)) {
				this._to = new Color(red, green, blue);
				return true;
			}
			return false;
		}

		public clone() {
			var action = new TintTo(this.duration, locTo.r, locTo.g, locTo.b);
			this.cloneDecoration(action);
			var locTo = this._to;
			action.initWithDurationInner(this.duration, locTo.r, locTo.g, locTo.b);
			return action;
		}

		public startWithTarget(target) {
			super.startWithTarget(target);
			this._from = this.target.color;
		}

		public update(dt) {
			dt = this.computeEaseTime(dt);
			var locFrom = this._from, locTo = this._to;
			if (locFrom) {
				this.target.setColor(
					new Color(
						locFrom.r + (locTo.r - locFrom.r) * dt,
						locFrom.g + (locTo.g - locFrom.g) * dt,
						locFrom.b + (locTo.b - locFrom.b) * dt)
				);
			}
		}
	}

	export function tintTo(duration, red, green, blue) {
		return new TintTo(duration, red, green, blue);
	};
}