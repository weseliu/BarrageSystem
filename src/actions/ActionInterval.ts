module actions {
	export class ActionInterval extends FiniteTimeAction {
		protected elapsed: number = 0;
		protected firstTick: boolean = false;
		protected easeList = null;
		protected timesForRepeat: number = 1;
		protected repeatForever: boolean = false;
		protected repeatMethod: boolean = false;
		protected speed: number = 1;

		private MAX_VALUE: number = 2;

		constructor(duration: number) {
			super();

			this.speed = 1;
			this.timesForRepeat = 1;
			this.repeatForever = false;
			this.repeatMethod = false;
			duration && this.initWithDuration(duration);
		}

		public getElapsed(): number {
			return this.elapsed;
		}

		public initWithDuration(duration: number): boolean {
			this.duration = duration;
			this.elapsed = 0;
			this.firstTick = true;
			return true;
		}

		public isDone(): boolean {
			return (this.elapsed >= this.duration);
		}

		protected cloneDecoration(action: ActionInterval) {
			action.repeatForever = this.repeatForever;
			action.speed = this.speed;
			action.timesForRepeat = this.timesForRepeat;
			action.easeList = this.easeList;
			action.repeatMethod = this.repeatMethod;
		}

		protected reverseEaseList(action) {
			if (this.easeList) {
				action._easeList = [];
				for (var i = 0; i < this.easeList.length; i++) {
					action._easeList.push(this.easeList[i].reverse());
				}
			}
		}

		public clone(): ActionInterval {
			var action = new ActionInterval(this.duration);
			this.cloneDecoration(action);
			return action;
		}

		public easing(easeObj): ActionInterval {
			if (this.easeList) {
				this.easeList.length = 0;
			}
			else {
				this.easeList = [];
			}
			for (var i = 0; i < arguments.length; i++) {
				this.easeList.push(arguments[i]);
			}
			return this;
		}

		protected computeEaseTime(dt: number): number {
			var locList = this.easeList;
			if ((!locList) || (locList.length === 0)) {
				return dt;
			}
			for (var i = 0, n = locList.length; i < n; i++) {
				dt = locList[i].easing(dt);
			}
			return dt;
		}

		public step(dt: number) {
			if (this.firstTick) {
				this.firstTick = false;
				this.elapsed = 0;
			} else {
				this.elapsed += dt;
			}

			var t = this.elapsed / (this.duration > 0.0000001192092896 ? this.duration : 0.0000001192092896);
			t = (1 > t ? t : 1);
			this.update(t > 0 ? t : 0);

			if (this.repeatMethod && this.timesForRepeat > 1 && this.isDone()) {
				if (!this.repeatForever) {
					this.timesForRepeat--;
				}
				this.startWithTarget(this.target);
				this.step(this.elapsed - this.duration);
			}
		}

		public startWithTarget(target) {
			super.startWithTarget(target);
			this.elapsed = 0;
			this.firstTick = true;
		}

		public reverse() {
			return null;
		}

		public setAmplitudeRate(amp) {
		}

		public getAmplitudeRate(): number {
			return 0;
		}

		public changeSpeed(speed: number): ActionInterval {
			if (speed <= 0) {
				return this;
			}

			this.speed *= speed;
			return this;
		}

		public getSpeed(): number {
			return this.speed;
		}

		public setSpeed(speed: number) {
			this.speed = speed;
			return this;
		}
	}
}