module actions {
	export class ActionInterval extends FiniteTimeAction {
		protected elapsed: number = 0;
		protected firstTick: boolean = false;
		protected easeList = null;
		protected speed: number = 1;

		constructor(duration?: number) {
			super();

			this.speed = 1;
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
			action.speed = this.speed;
			action.easeList = this.easeList;
		}

		protected reverseEaseList(action: ActionInterval) {
			if (this.easeList) {
				action.easeList = [];
				for (var i = 0; i < this.easeList.length; i++) {
					action.easeList.push(this.easeList[i].reverse());
				}
			}
		}

		public clone(): ActionInterval {
			var action = new ActionInterval(this.duration);
			this.cloneDecoration(action);
			return action;
		}

		public easing(...easeObj): ActionInterval {
			if (this.easeList) {
				this.easeList.length = 0;
			}
			else {
				this.easeList = [];
			}
			for (var i = 0; i < easeObj.length; i++) {
				this.easeList.push(easeObj[i]);
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

			var duration = this.duration > 0.0000001192092896 ? this.duration : 0.0000001192092896;
			var t = this.elapsed / duration;
			t = (1 > t ? t : 1);
			this.update(t > 0 ? t : 0);
		}

		public startWithTarget(target: ActionObject) {
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