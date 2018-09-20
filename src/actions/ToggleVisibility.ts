module actions {
	export class ToggleVisibility extends ActionInstant {

		public update(dt: number) {
			this.target.setVisible(!this.target.getVisible());
		}

		public reverse() {
			return new ToggleVisibility();
		}

		public clone() {
			return new ToggleVisibility();
		}
	}

	export function toggleVisibility() {
		return new ToggleVisibility();
	};
}