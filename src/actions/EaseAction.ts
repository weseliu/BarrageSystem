module actions {
	export class EaseAction extends ActionInterval {
		protected innerAction: ActionInterval = null;
		protected easeFunc: Function;
		protected easeParam: any = null;

		constructor(action?: ActionInterval, easeFunc?: Function, easeParam?: any) {
			super(0);
			action && this.initWithActionInner(action, easeFunc, easeParam);
		}

		public initWithActionInner(action: ActionInterval, easeFunc: Function, easeParam: any): boolean {
			if (action == null) {
				return false;
			}
			if (this.initWithDuration(action.getDuration())) {
				this.innerAction = action;
				this.easeFunc = easeFunc;
				this.easeParam = easeParam;
				return true;
			}
			return false;
		}

		public clone() {
			var action = new EaseAction(null, null, null);
			action.initWithActionInner(this.innerAction.clone(), this.easeFunc, this.easeParam);
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
			var newDt = dt;
			if(this.easeFunc != null){
				newDt = this.easeFunc(dt, this.easeParam);
			}
			this.innerAction.update(newDt);
		}

		public reverse() {
			return null;
		}

		public getInnerAction() {
			return this.innerAction;
		}
	}

	export function easeAction(action: ActionInterval, easeFunc: Function, easeParam: any): EaseAction{
		return new EaseAction(action, easeFunc, easeParam);
	}
}