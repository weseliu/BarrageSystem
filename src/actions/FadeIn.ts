module actions {

	export class FadeIn extends FadeTo {
		public reverseAction: FadeOut = null;
		constructor(duration?: number) {
			super();
			duration && this.initWithDurationInner(duration, 255);
		}

		public reverse() {
			var action = new FadeOut(this.duration);
			action.initWithDurationInner(this.duration, 0);
			this.cloneDecoration(action);
			this.reverseEaseList(action);
			return action;
		}

		public clone() {
			var action = new FadeIn();
			this.cloneDecoration(action);
			action.initWithDurationInner(this.duration, this.toOpacity);
			return action;
		}

		public startWithTarget(target: ActionObject) {
			if (this.reverseAction) {
				this.toOpacity = this.reverseAction.fromOpacity;
			}
			super.startWithTarget(target);
		}
	}

	export function fadeIn(duration: number) {
		return new FadeIn(duration);
	};
}