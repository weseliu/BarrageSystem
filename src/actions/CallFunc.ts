module actions {
	export class CallFunc extends ActionInstant {
		protected selectorTarget: null;
		protected function: Function = null;
		protected data: null;

		constructor(selector?: Function, selectorTarget?: any, data?: any) {
			super();
			selector && this.initWithFunction(selector, selectorTarget, data);
		}

		public initWithFunction(selector: Function, selectorTarget: any, data: any) {
			if (selector) {
				this.function = selector;
			}
			if (selectorTarget) {
				this.selectorTarget = selectorTarget;
			}
			if (data !== undefined) {
				this.data = data;
			}
			return true;
		}

		public execute() {
			if (this.function) {
				this.function.call(this.selectorTarget, this.target, this.data);
			}
		}

		public update(dt: number) {
			this.execute();
		}

		public getTargetCallback() {
			return this.selectorTarget;
		}

		public setTargetCallback(sel) {
			if (sel !== this.selectorTarget) {
				this.selectorTarget = sel;
			}
		}

		public clone() {
			var action = new CallFunc();
			action.initWithFunction(this.function, this.selectorTarget, this.data);
			return action;
		}
	}

	export function callFunc(selector: Function, selectorTarget: any, data: any = null) {
		return new CallFunc(selector, selectorTarget, data);
	};
}