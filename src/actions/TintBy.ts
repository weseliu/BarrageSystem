module actions {
	export class TintBy extends ActionInterval {
		protected deltaR: number = 0;
		protected deltaG: number = 0;
		protected deltaB: number = 0;

		protected fromR: number = 0;
		protected fromG: number = 0;
		protected fromB: number = 0;

		constructor(duration, deltaRed, deltaGreen, deltaBlue) {
			super(duration);
			this.initWithDurationInner(duration, deltaRed, deltaGreen, deltaBlue);
		}

		public initWithDurationInner(duration, deltaRed, deltaGreen, deltaBlue) {
			if (super.initWithDuration(duration)) {
				this.deltaR = deltaRed;
				this.deltaG = deltaGreen;
				this.deltaB = deltaBlue;
				return true;
			}
			return false;
		}

		public clone() {
			var action = new TintBy(this.duration, this.deltaR, this.deltaG, this.deltaB);
			this.cloneDecoration(action);
			action.initWithDurationInner(this.duration, this.deltaR, this.deltaG, this.deltaB);
			return action;
		}

		public startWithTarget(target) {
			super.startWithTarget(target);

			var color = target.color;
			this.fromR = color.r;
			this.fromG = color.g;
			this.fromB = color.b;
		}

		public update(dt) {
			dt = this.computeEaseTime(dt);

			this.target.color = new Color(this.fromR + this.deltaR * dt,
				this.fromG + this.deltaG * dt,
				this.fromB + this.deltaB * dt);

		}

		public reverse() {
			var action = new TintBy(this.duration, -this.deltaR, -this.deltaG, -this.deltaB);
			this.cloneDecoration(action);
			this.reverseEaseList(action);
			return action;
		}
	}

	export function tintBy(duration, deltaRed, deltaGreen, deltaBlue) {
		return new TintBy(duration, deltaRed, deltaGreen, deltaBlue);
	};
}