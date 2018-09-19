module actions {
	export class Speed extends Action {

		protected speed: number = 0;
		protected innerAction: Action = null;

		constructor(action, speed) {
			super();
			this.speed = 0;
			this.innerAction = null;

			action && this.initWithAction(action, speed);
		}

		public getSpeed(): number {
			return this.speed;
		}

		public setSpeed(speed: number) {
			this.speed = speed;
		}

		public setInnerAction(action) {
			if (this.innerAction !== action) {
				this.innerAction = action;
			}
		}

		public getInnerAction() {
			return this.innerAction;
		}

		public initWithAction(action: Action, speed: number): boolean {
			if (action) {
				this.innerAction = action;
				this.speed = speed;
				return true;
			}
			return false;
		}

		public clone(): Speed {
			return new Speed(this.innerAction, this.speed);
		}

		public startWithTarget(target: ActionObject) {
			super.startWithTarget(target);
			this.innerAction.startWithTarget(target);
		}

		public stop() {
			this.innerAction.stop();
			super.stop();
		}

		public step(dt) {
			this.innerAction.step(dt * this.speed);
		}

		public isDone() {
			return this.innerAction.isDone();
		}

		public reverse() {
			return new Speed(this.innerAction.reverse(), this.speed);
		}
	}

	export function speed(action, speed): Speed{
		return new Speed(action, speed);
	}
}