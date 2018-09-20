module actions {
	export class ActionEase extends ActionInterval {

		protected innerAction: ActionInterval = null;

		constructor(action?: ActionInterval) {
			super(0);
			action && this.initWithAction(action);
		}

		public initWithAction(action: ActionInterval) {
			if (!action) {
				return false;
			}

			if (this.initWithDuration(action.getDuration())) {
				this.innerAction = action;
				return true;
			}
			return false;
		}

		public clone() {
			var action = new ActionEase();
			action.initWithAction(this.innerAction.clone());
			return action;
		}

		public startWithTarget(target: ActionObject) {
			super.startWithTarget(target);
			this.innerAction.startWithTarget(this.target);
		}

		public stop() {
			this.innerAction.stop();
			super.stop();
		}

		public update(dt: number) {
			this.innerAction.update(dt);
		}

		public reverse() {
			return new ActionEase(this.innerAction.reverse());
		}

		public getInnerAction() {
			return this.innerAction;
		}
	}

	export function actionEase(action: ActionInterval) {
		return new ActionEase(action);
	};
}