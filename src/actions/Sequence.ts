module actions {
	export class Sequence extends ActionInterval {
		protected actions: Array<FiniteTimeAction> = new Array<FiniteTimeAction>(2);
		protected split: any = null;
		protected last: number = 0;

		constructor(...actions) {
			super(0);
			
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
				var prev = paramArray[0];
				var action1 = prev;
				for (var i = 1; i < last; i++) {
					if (paramArray[i]) {
						action1 = prev;
						prev = Sequence.actionOneTwo(action1, paramArray[i]);
					}
				}
				this.initWithTwoActions(prev, paramArray[last]);
			}
		}

		public initWithTwoActions(actionOne: FiniteTimeAction, actionTwo: FiniteTimeAction) {
			if (actionOne && actionTwo) {
				var d = actionOne.duration + actionTwo.duration;
				this.initWithDuration(d);
				
				this.actions[0] = actionOne;
				this.actions[1] = actionTwo;
				return true;
			}
			return false;
		}

		public clone() {
			var action = new Sequence(null);
			this.cloneDecoration(action);
			action.initWithTwoActions(this.actions[0].clone(), this.actions[1].clone());
			return action;
		}

		public startWithTarget(target) {
			super.startWithTarget(target);
			this.split = this.actions[0].duration / this.duration;
			this.last = -1;
		}

		public stop() {
			if (this.last !== -1) {
				this.actions[this.last].stop();
			}
			super.stop();
		}

		public update(dt) {
			var new_t, found = 0;
			var locSplit = this.split, locActions = this.actions, locLast = this.last, actionFound;

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
			this.last = found;
		}

		public reverse(): Sequence {
			var action = Sequence.actionOneTwo(this.actions[1].reverse(), this.actions[0].reverse());
			this.cloneDecoration(action);
			this.reverseEaseList(action);
			return action;
		}

		public static actionOneTwo = function (actionOne, actionTwo) {
			return new Sequence(actionOne, actionTwo);
		}
	}

	export function sequence(...actions) {
		return new Sequence(...actions);
	}
}