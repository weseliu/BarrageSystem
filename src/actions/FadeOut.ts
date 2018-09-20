module actions {
	export class FadeOut extends FadeTo {
		constructor(duration?: number) {
			super();
			duration && this.initWithDurationInner(duration, 0);
		}

		public reverse() {
			var action = new FadeIn(this.duration);
			action.reverseAction = this;
			action.initWithDurationInner(this.duration, 255);
			this.cloneDecoration(action);
			this.reverseEaseList(action);
			return action;
		}

		public clone() {
			var action = new FadeOut();
			this.cloneDecoration(action);
			action.initWithDurationInner(this.duration, this.toOpacity);
			return action;
		}
	}

	export function fadeOut(duration: number) {
		return new FadeOut(duration);
	};
}