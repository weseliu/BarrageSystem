module actions {
	export class RemoveSelf extends ActionInstant {
		protected _isNeedCleanup: boolean = true;
		constructor(isNeedCleanup: boolean) {
			super();
			this._isNeedCleanup = isNeedCleanup;
		}

		public update(dt: number) {
			if (this.target != null) {
				this.target.removeFromParent(this._isNeedCleanup);
			}
		}


		public reverse() {
			return new RemoveSelf(this._isNeedCleanup);
		}

		public clone() {
			return new RemoveSelf(this._isNeedCleanup);
		}
	}

	export function removeSelf(isNeedCleanup = true) {
		return new RemoveSelf(isNeedCleanup);
	};
}