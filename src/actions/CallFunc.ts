module actions {
	export class CallFunc extends ActionInstant {
		protected selectorTarget: null;
		protected function: Function = null;
		protected data: null;

		constructor(selector, selectorTarget, data) {
			super();
			this.initWithFunction(selector, selectorTarget, data);
		}

		public initWithFunction(selector, selectorTarget, data) {
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

		public update(dt) {
			this.execute();
		}

		public getTargetCallback() {
			return this.selectorTarget;
		}

		public setTargetCallback(sel) {
			if (sel !== this.selectorTarget) {
				if (this.selectorTarget)
					this.selectorTarget = null;
				this.selectorTarget = sel;
			}
		}

		public clone() {
			var action = new CallFunc(this.function, this.selectorTarget, this.data);
			action.initWithFunction(this.function, this.selectorTarget, this.data);
			return action;
		}
	}

	export function callFunc(selector, selectorTarget, data) {
		return new CallFunc(selector, selectorTarget, data);
	};
}