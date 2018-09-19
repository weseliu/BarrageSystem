module actions {
	export class Spawn extends ActionInterval {

		protected one: FiniteTimeAction = null;
		protected two: FiniteTimeAction = null;

		constructor(...actions) {
			super(0);
			this.one = null;
			this.two = null;

			var paramArray = new Array();
			for (var i = 0; i < actions.length; i++) {
				var action = actions[i];
				if (action instanceof Array) {
					for (var j = 0; j < action.length; j++) {
						paramArray.push(action[j]);
					}
				} else {
					paramArray.push(action);
				}
			}

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

		public initWithTwoActions(action1: FiniteTimeAction, action2: FiniteTimeAction) {
			if (!action1 || !action2) {
				return false;
			}

			var ret = false;
			var d1 = action1.duration;
			var d2 = action2.duration;

			if (this.initWithDuration(Math.max(d1, d2))) {
				this.one = action1;
				this.two = action2;

				if (d1 > d2) {
					this.two = Sequence.actionOneTwo(action2, actions.delayTime(d1 - d2));
				} else if (d1 < d2) {
					this.one = Sequence.actionOneTwo(action1, actions.delayTime(d2 - d1));
				}

				ret = true;
			}
			return ret;
		}

		public clone() {
			var action = new Spawn(null);
			this.cloneDecoration(action);
			action.initWithTwoActions(this.one.clone(), this.two.clone());
			return action;
		}

		public startWithTarget(target: ActionObject) {
			super.startWithTarget(target);
			this.one.startWithTarget(target);
			this.two.startWithTarget(target);
		}

		public stop() {
			this.one.stop();
			this.two.stop();
			super.stop();
		}

		public update(dt) {
			dt = this.computeEaseTime(dt);
			if (this.one)
				this.one.update(dt);
			if (this.two)
				this.two.update(dt);
		}

		public reverse() {
			var action = Spawn.actionOneTwo(this.one.reverse(), this.two.reverse());
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

	export function spawn(...actions): Spawn {
		return new Spawn(actions);
	}
}