module actions {
	export class JumpTo extends JumpBy {
		protected endPosition: Point = new Point();

		constructor(duration, x, y, height, jumps) {
			super(duration, x, y, height, jumps);
			this.endPosition = new Point();
			this.initWithDurationInner(duration, x, y, height, jumps);
		}

		public initWithDurationInner(duration, x, y, height, jumps) {
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
			var action = new JumpTo(this.duration, this.endPosition.x, this.endPosition.y, this.height, this.jumps);
			this.cloneDecoration(action);
			action.initWithDurationInner(this.duration, this.endPosition.x, this.endPosition.y, this.height, this.jumps);
			return action;
		}
	}

	export function jumpTo(duration, x, y, height, jumps) {
		return new JumpTo(duration, x, y, height, jumps);
	};
}