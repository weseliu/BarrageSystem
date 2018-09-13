module actions {
	export class Sequence extends ActionInterval {
		protected _actions: Array<Action> = null;
		protected _split: any = null;
		protected _last: number = 0;

		constructor(actions: Array<Action>) {
			super(0);
			this._actions.length = 0;
			if (actions != null && actions.length > 0) {
				var prev = actions[0];
				var action1 = prev;
				for (var i = 1; i < actions.length - 1; i++) {
					if (actions[i]) {
						action1 = prev;
						prev = Sequence.actionOneTwo(action1, actions[i]);
					}
				}
				this.initWithTwoActions(prev, actions[actions.length - 1]);
			}
		}

		public initWithTwoActions(actionOne: Action, actionTwo: Action) {
			if (actionOne && actionTwo) {

				var d = actionOne.duration + actionTwo.duration;
				this.initWithDuration(d);

				this._actions[0] = actionOne;
				this._actions[1] = actionTwo;
				return true;
			}
			return false;
		}

		public clone() {
			var action = new Sequence(null);
			this.cloneDecoration(action);
			action.initWithTwoActions(this._actions[0].clone(), this._actions[1].clone());
			return action;
		}

		public startWithTarget(target) {
			super.startWithTarget(target);
			this._split = this._actions[0].duration / this.duration;
			this._last = -1;
		}

		public stop() {
			if (this._last !== -1) {
				this._actions[this._last].stop();
			}
			super.stop();
		}

		public update(dt) {
			var new_t, found = 0;
			var locSplit = this._split, locActions = this._actions, locLast = this._last, actionFound;

			dt = this.computeEaseTime(dt);
			if (dt < locSplit) {
				// action[0]
				new_t = (locSplit !== 0) ? dt / locSplit : 1;

				if (found === 0 && locLast === 1) {
					// Reverse mode ?
					// XXX: Bug. this case doesn't contemplate when _last==-1, found=0 and in "reverse mode"
					// since it will require a hack to know if an action is on reverse mode or not.
					// "step" should be overriden, and the "reverseMode" value propagated to inner Sequences.
					locActions[1].update(0);
					locActions[1].stop();
				}
			} else {
				// action[1]
				found = 1;
				new_t = (locSplit === 1) ? 1 : (dt - locSplit) / (1 - locSplit);

				if (locLast === -1) {
					// action[0] was skipped, execute it.
					locActions[0].startWithTarget(this.target);
					locActions[0].update(1);
					locActions[0].stop();
				}
				if (!locLast) {
					// switching to action 1. stop action 0.
					locActions[0].update(1);
					locActions[0].stop();
				}
			}

			actionFound = locActions[found];
			// Last action found and it is done.
			if (locLast === found && actionFound.isDone())
				return;

			// Last action found and it is done
			if (locLast !== found)
				actionFound.startWithTarget(this.target);

			new_t = new_t * actionFound._timesForRepeat;
			actionFound.update(new_t > 1 ? new_t % 1 : new_t);
			this._last = found;
		}

		public reverse(): Sequence {
			var action = Sequence.actionOneTwo(this._actions[1].reverse(), this._actions[0].reverse());
			this.cloneDecoration(action);
			this.reverseEaseList(action);
			return action;
		}

		public static actionOneTwo = function (actionOne, actionTwo) {
			var sequence = new Sequence(null);
			sequence.initWithTwoActions(actionOne, actionTwo);
			return sequence;
		}
	}

	export function sequence(tempArray) {
		var paramArray = (tempArray instanceof Array) ? tempArray : arguments;
		if ((paramArray.length > 0) && (paramArray[paramArray.length - 1] == null)) {
			return null;
		}

		var result, current, i, repeat;
		while (paramArray && paramArray.length > 0) {
			current = Array.prototype.shift.call(paramArray);
			repeat = current._timesForRepeat || 1;
			current._repeatMethod = false;
			current._timesForRepeat = 1;

			i = 0;
			if (!result) {
				result = current;
				i = 1;
			}

			for (i; i < repeat; i++) {
				result = Sequence.actionOneTwo(result, current);
			}
		}
		return result;
	}
}