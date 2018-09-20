module actions {
	
	export class DelayTime extends ActionInterval {

		public update(dt: number) { }

		public reverse() {
			var action = new DelayTime(this.duration);
			this.cloneDecoration(action);
			this.reverseEaseList(action);
			return action;
		}

		public clone() {
			var action = new DelayTime(this.duration);
			this.cloneDecoration(action);
			action.initWithDuration(this.duration);
			return action;
		}
	}

	export function delayTime(time: number) {
		return new DelayTime(time);
	};
}