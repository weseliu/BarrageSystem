module actions {
	export class ToggleVisibility extends ActionInstant {

		public update(dt) {
			this.target.visible = !this.target.visible;
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