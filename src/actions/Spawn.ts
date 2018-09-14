module actions {
	export class Spawn extends ActionInterval {
		protected _one: Action = null;
		protected _two: Action = null;

		constructor(actions: any) {
			super(0);

			this._one = null;
			this._two = null;

			var paramArray = (actions instanceof Array) ? actions : arguments;
			var last = paramArray.length - 1;

			if (last >= 0) {
				var prev = paramArray[0], action1;
				for (var i = 1; i < last; i++) {
					if (paramArray[i]) {
						action1 = prev;
						prev = Spawn.actionOneTwo(action1, paramArray[i]);
					}
				}
				this.initWithTwoActions(prev, paramArray[last]);
			}
		}

		public initWithTwoActions(action1: Action, action2: Action) {
			if (!action1 || !action2) {
				return false;
			}

			var ret = false;
			var d1 = action1.duration;
			var d2 = action2.duration;

			if (this.initWithDuration(Math.max(d1, d2))) {
				this._one = action1;
				this._two = action2;

				if (d1 > d2) {
					this._two = Sequence.actionOneTwo(action2, cc.delayTime(d1 - d2));
				} else if (d1 < d2) {
					this._one = Sequence.actionOneTwo(action1, cc.delayTime(d2 - d1));
				}

				ret = true;
			}
			return ret;
		}

		public clone() {
			var action = new Spawn(null);
			this.cloneDecoration(action);
			action.initWithTwoActions(this._one.clone(), this._two.clone());
			return action;
		}

		public startWithTarget(target) {
			super.startWithTarget(target);
			this._one.startWithTarget(target);
			this._two.startWithTarget(target);
		}

		public stop() {
			this._one.stop();
			this._two.stop();
			super.stop();
		}

		public update(dt) {
			dt = this.computeEaseTime(dt);
			if (this._one)
				this._one.update(dt);
			if (this._two)
				this._two.update(dt);
		}

		public reverse() {
			var action = Spawn.actionOneTwo(this._one.reverse(), this._two.reverse());
			this.cloneDecoration(action);
			this.reverseEaseList(action);
			return action;
		}

		public static actionOneTwo(action1, action2): Spawn {
			var spawn = new Spawn(null);
			spawn.initWithTwoActions(action1, action2);
			return spawn;
		};
	}

	export function spawn(actions: any): Spawn {
		return new Spawn(actions);
	}
}