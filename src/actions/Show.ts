module actions {
	export class Show extends ActionInstant {

		public update(dt: number) {
			this.target.setVisible(true);
		}

		public reverse() {
			return new Hide();
		}

		public clone() {
			return new Show();
		}
	}

	export function show() {
		return new Show();
	};
}