module actions {
	export class Hide extends ActionInstant {
		public update(dt) {
			this.target.visible = false;
		}

		public reverse() {
			return new Show();
		}

		public clone() {
			return new Hide();
		}
	}

	export function hide() {
		return new Hide();
	};
}