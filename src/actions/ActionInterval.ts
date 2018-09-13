module actions {
	export class ActionInterval extends FiniteTimeAction {
		protected _elapsed: number = 0;
		protected _firstTick: boolean = false;
		protected _easeList = null;
		protected _timesForRepeat: number = 1;
		protected _repeatForever: boolean = false;
		protected _repeatMethod: boolean = false;
		protected _speed: number = 1;

		private MAX_VALUE: number = 2;

		constructor(duration: number) {
			super();

			this._speed = 1;
			this._timesForRepeat = 1;
			this._repeatForever = false;
			this._repeatMethod = false;
			duration && this.initWithDuration(duration);
		}

		public getElapsed(): number {
			return this._elapsed;
		}

		public initWithDuration(duration: number) {
			this.duration = duration;
			this._elapsed = 0;
			this._firstTick = true;
			return true;
		}

		public isDone(): boolean {
			return (this._elapsed >= this.duration);
		}

		protected cloneDecoration(action) {
			action._repeatForever = this._repeatForever;
			action._speed = this._speed;
			action._timesForRepeat = this._timesForRepeat;
			action._easeList = this._easeList;
			action._repeatMethod = this._repeatMethod;
		}

		protected reverseEaseList(action) {
			if (this._easeList) {
				action._easeList = [];
				for (var i = 0; i < this._easeList.length; i++) {
					action._easeList.push(this._easeList[i].reverse());
				}
			}
		}

		public clone() {
			var action = new ActionInterval(this.duration);
			this.cloneDecoration(action);
			return action;
		}

		public easing(easeObj) : ActionInterval{
			if (this._easeList)
				this._easeList.length = 0;
			else
				this._easeList = [];
			for (var i = 0; i < arguments.length; i++)
				this._easeList.push(arguments[i]);
			return this;
		}

		protected computeEaseTime(dt: number) : number{
			var locList = this._easeList;
			if ((!locList) || (locList.length === 0)) {
				return dt;
			}
			for (var i = 0, n = locList.length; i < n; i++) {
				dt = locList[i].easing(dt);
			}
			return dt;
		}

		public step(dt: number) {
			if (this._firstTick) {
				this._firstTick = false;
				this._elapsed = 0;
			} else
				this._elapsed += dt;

			var t = this._elapsed / (this.duration > 0.0000001192092896 ? this.duration : 0.0000001192092896);
			t = (1 > t ? t : 1);
			this.update(t > 0 ? t : 0);

			if (this._repeatMethod && this._timesForRepeat > 1 && this.isDone()) {
				if (!this._repeatForever) {
					this._timesForRepeat--;
				}
				this.startWithTarget(this.target);
				this.step(this._elapsed - this.duration);
			}
		}

		public startWithTarget (target) {
			super.startWithTarget(target);
			this._elapsed = 0;
			this._firstTick = true;
		}

		public reverse() {
			return null;
		}

		public setAmplitudeRate(amp) {
		}

		public getAmplitudeRate() : number{
			return 0;
		}

		public speed(speed: number): ActionInterval {
			if (speed <= 0) {
				return this;
			}

			this._speed *= speed;
			return this;
		}

		public getSpeed(): number {
			return this._speed;
		}

		public setSpeed(speed: number) {
			this._speed = speed;
			return this;
		}

	}
}