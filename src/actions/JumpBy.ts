module actions {
	export class JumpBy extends ActionInterval {
		protected startPosition: Point = new Point();
		protected delta: Point = new Point();
		protected height: number = 0;
		protected jumps: number = 0;
		protected previousPosition: Point = new Point();

		constructor(duration?: number, x?: number, y?: number, height?: number, jumps?: number) {
			super();
			this.initWithDurationInner(duration, x, y, height, jumps)
		}

		public initWithDurationInner(duration: number, x: number, y: number, height: number, jumps: number) {
			if (super.initWithDuration(duration)) {
				this.delta.x = x;
				this.delta.y = y;
				this.height = height;
				this.jumps = jumps;
				return true;
			}
			return false;
		}

		public clone() {
			var action = new JumpBy();
			this.cloneDecoration(action);
			action.initWithDurationInner(this.duration, this.delta.x, this.delta.y, this.height, this.jumps);
			return action;
		}

		public startWithTarget(target: ActionObject) {
			super.startWithTarget(target);
			var locPosX = target.getPosition().x;
			var locPosY = target.getPosition().y;
			this.previousPosition.x = locPosX;
			this.previousPosition.y = locPosY;
			this.startPosition.x = locPosX;
			this.startPosition.y = locPosY;
		}

		public update(dt: number) {
			dt = this.computeEaseTime(dt);
			if (this.target) {
				var frac = dt * this.jumps % 1.0;
				var y = this.height * 4 * frac * (1 - frac);
				y += this.delta.y * dt;

				var x = this.delta.x * dt;
				var locStartPosition = this.startPosition;
				var targetX = this.target.getPosition().x;
				var targetY = this.target.getPosition().y;
				var locPreviousPosition = this.previousPosition;

				locStartPosition.x = locStartPosition.x + targetX - locPreviousPosition.x;
				locStartPosition.y = locStartPosition.y + targetY - locPreviousPosition.y;
				x = x + locStartPosition.x;
				y = y + locStartPosition.y;
				locPreviousPosition.x = x;
				locPreviousPosition.y = y;
				this.target.setPosition(x, y);
			}
		}

		public reverse() {
			var action = new JumpBy(this.duration, -this.delta.x, -this.delta.y, this.height, this.jumps);
			this.cloneDecoration(action);
			this.reverseEaseList(action);
			return action;
		}
	}

	export function jumpBy(duration: number, x: number, y: number, height: number, jumps: number) {
		return new JumpBy(duration, x, y, height, jumps);
	};
}