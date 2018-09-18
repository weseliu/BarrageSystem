module actions {
	export class ActionEase extends ActionInterval {

		protected innerAction: ActionInterval = null;

		constructor(action: ActionInterval) {
			super(0);
			this.initWithAction(action);
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
			var action = new ActionEase(this.innerAction.clone());
			action.initWithAction(this.innerAction.clone());
			return action;
		}

		public startWithTarget(target) {
			super.startWithTarget(target);
			this.innerAction.startWithTarget(this.target);
		}

		public stop() {
			this.innerAction.stop();
			super.stop();
		}

		public update(dt) {
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