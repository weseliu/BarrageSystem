module actions {
	export class FadeTo extends ActionInterval {
		public toOpacity: number = 0;
		public fromOpacity: number = 0;

		constructor(duration?: number, opacity?: number) {
			super();
			this.initWithDurationInner(duration, opacity);
		}

		public initWithDurationInner(duration: number, opacity: number) {
			if (super.initWithDuration(duration)) {
				this.toOpacity = opacity;
				return true;
			}
			return false;
		}

		public clone() {
			var action = new FadeTo(this.duration, this.toOpacity);
			this.cloneDecoration(action);
			action.initWithDurationInner(this.duration, this.toOpacity);
			return action;
		}

		public update(time: number) {
			time = this.computeEaseTime(time);
			var fromOpacity = this.fromOpacity !== undefined ? this.fromOpacity : 255;
			this.target.setOpacity(fromOpacity + (this.toOpacity - fromOpacity) * time);
		}

		public startWithTarget(target: ActionObject) {
			super.startWithTarget(target);
			this.fromOpacity = target.getOpacity();
		}
	}

	export function fadeTo(duration: number, opacity: number) {
		return new FadeTo(duration, opacity);
	};
}