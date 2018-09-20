module actions {
	export class JumpTo extends JumpBy {
		protected endPosition: Point = new Point();

		constructor(duration?: number, x?: number, y?: number, height?: number, jumps?: number) {
			super();
			this.endPosition = new Point();
			duration && this.initWithDurationInner(duration, x, y, height, jumps);
		}

		public initWithDurationInner(duration: number, x: number, y: number, height: number, jumps: number) {
			if (super.initWithDurationInner(duration, x, y, height, jumps)) {
				this.endPosition.x = x;
				this.endPosition.y = y;
				return true;
			}
			return false;
		}

		public startWithTarget(target: ActionObject) {
			super.startWithTarget(target);
			this.delta.x = this.endPosition.x - this.startPosition.x;
			this.delta.y = this.endPosition.y - this.startPosition.y;
		}

		public clone() {
			var action = new JumpTo();
			this.cloneDecoration(action);
			action.initWithDurationInner(this.duration, this.endPosition.x, this.endPosition.y, this.height, this.jumps);
			return action;
		}
	}

	export function jumpTo(duration: number, x: number, y: number, height: number, jumps: number) {
		return new JumpTo(duration, x, y, height, jumps);
	};
}