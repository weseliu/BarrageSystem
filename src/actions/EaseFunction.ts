module actions {
	export class EaseFunction {

		public static easeIn(dt: number, rate: number): number {
			return Math.pow(dt, rate);
		}

		public static easeOut(dt: number, rate: number): number {
			return Math.pow(dt, 1 / rate);
		}

		public static easeInOut(dt: number, rate: number): number {
			dt *= 2;
			if (dt < 1) {
				return 0.5 * Math.pow(dt, rate);
			}
			else {
				return 1.0 - 0.5 * Math.pow(2 - dt, rate);
			}
		}

		public static easeExponentialIn(dt: number): number {
			return dt === 0 ? 0 : Math.pow(2, 10 * (dt - 1));
		}

		public static easeExponentialOut(dt: number): number {
			return dt === 1 ? 1 : (-(Math.pow(2, -10 * dt)) + 1);
		}

		public static easeExponentialInOut(dt: number): number {
			if (dt !== 1 && dt !== 0) {
				dt *= 2;
				if (dt < 1)
					return 0.5 * Math.pow(2, 10 * (dt - 1));
				else
					return 0.5 * (-Math.pow(2, -10 * (dt - 1)) + 2);
			}
			return dt;
		}

		public static easeSineIn(dt: number): number {
			return (dt === 0 || dt === 1) ? dt : -1 * Math.cos(dt * Math.PI / 2) + 1;
		}

		public static easeSineOut(dt: number): number {
			return (dt === 0 || dt === 1) ? dt : Math.sin(dt * Math.PI / 2);
		}

		public static easeSineInOut(dt: number): number {
			return (dt === 0 || dt === 1) ? dt : -0.5 * (Math.cos(Math.PI * dt) - 1);
		}

		public static easeElasticIn(dt: number, period: number): number {
			if (dt === 0 || dt === 1)
				return dt;
			dt = dt - 1;
			return -Math.pow(2, 10 * dt) * Math.sin((dt - (period / 4)) * Math.PI * 2 / period);
		}

		public static easeElasticOut(dt: number, period: number): number {
			return (dt === 0 || dt === 1) ? dt : Math.pow(2, -10 * dt) * Math.sin((dt - (period / 4)) * Math.PI * 2 / period) + 1;
		}

		public static easeElasticInOut(dt: number, period: number): number {
			var newT = 0;
			var locPeriod = period;
			if (dt === 0 || dt === 1) {
				newT = dt;
			} else {
				dt = dt * 2;
				if (!locPeriod)
					locPeriod = period = 0.3 * 1.5;
				var s = locPeriod / 4;
				dt = dt - 1;
				if (dt < 0)
					newT = -0.5 * Math.pow(2, 10 * dt) * Math.sin((dt - s) * Math.PI * 2 / locPeriod);
				else
					newT = Math.pow(2, -10 * dt) * Math.sin((dt - s) * Math.PI * 2 / locPeriod) * 0.5 + 1;
			}
			return newT;
		}

		private static bounceTime(time) {
			if (time < 1 / 2.75) {
				return 7.5625 * time * time;
			} else if (time < 2 / 2.75) {
				time -= 1.5 / 2.75;
				return 7.5625 * time * time + 0.75;
			} else if (time < 2.5 / 2.75) {
				time -= 2.25 / 2.75;
				return 7.5625 * time * time + 0.9375;
			}

			time -= 2.625 / 2.75;
			return 7.5625 * time * time + 0.984375;
		};

		public static easeBounceIn(dt: number): number {
			return 1 - EaseFunction.bounceTime(1 - dt);
		}

		public static easeBounceOut(dt: number): number {
			return EaseFunction.bounceTime(dt);
		}

		public static easeBounceInOut(dt: number): number {
			var newT;
			if (dt < 0.5) {
				dt = dt * 2;
				newT = (1 - EaseFunction.bounceTime(1 - dt)) * 0.5;
			} else {
				newT = EaseFunction.bounceTime(dt * 2 - 1) * 0.5 + 0.5;
			}
			return newT;
		}

		public static easeBackIn(dt: number): number {
			var overshoot = 1.70158;
			return (dt === 0 || dt === 1) ? dt : dt * dt * ((overshoot + 1) * dt - overshoot);
		}

		public static easeBackOut(dt: number): number {
			var overshoot = 1.70158;
			dt = dt - 1;
			return dt * dt * ((overshoot + 1) * dt + overshoot) + 1;
		}

		public static easeBackInOut(dt: number): number {
			var overshoot = 1.70158 * 1.525;
			dt = dt * 2;
			if (dt < 1) {
				return (dt * dt * ((overshoot + 1) * dt - overshoot)) / 2;
			} else {
				dt = dt - 2;
				return (dt * dt * ((overshoot + 1) * dt + overshoot)) / 2 + 1;
			}
		}

		public static easeQuadraticIn(dt: number): number {
			return Math.pow(dt, 2);
		}

		public static easeQuadraticOut(dt: number): number {
			return -dt * (dt - 2);
		}

		public static easeQuadraticInOut(dt: number): number {
			var resultTime = dt;
			dt *= 2;
			if (dt < 1) {
				resultTime = dt * dt * 0.5;
			} else {
				--dt;
				resultTime = -0.5 * (dt * (dt - 2) - 1)
			}
			return resultTime;
		}

		public static easeQuarticIn(dt: number): number {
			return dt * dt * dt * dt;
		}

		public static easeQuarticOut(dt: number): number {
			dt -= 1;
			return -(dt * dt * dt * dt - 1);
		}

		public static easeQuarticInOut(dt: number): number {
			dt = dt * 2;
			if (dt < 1)
				return 0.5 * dt * dt * dt * dt;
			dt -= 2;
			return -0.5 * (dt * dt * dt * dt - 2);
		}

		public static easeQuinticIn(dt: number): number {
			return dt * dt * dt * dt * dt;
		}

		public static easeQuinticOut(dt: number): number {
			dt -= 1;
			return (dt * dt * dt * dt * dt + 1);
		}

		public static easeQuinticInOut(dt: number): number {
			dt = dt * 2;
			if (dt < 1)
				return 0.5 * dt * dt * dt * dt * dt;
			dt -= 2;
			return 0.5 * (dt * dt * dt * dt * dt + 2);
		}

		public static easeCircleIn(dt: number): number {
			dt -= 1;
			return -1 * (Math.sqrt(1 - dt * dt) - 1);
		}

		public static easeCircleOut(dt: number): number {
			dt = dt - 1;
			return Math.sqrt(1 - dt * dt);
		}

		public static easeCircleInOut(dt: number): number {
			dt = dt * 2;
			if (dt < 1)
				return -0.5 * (Math.sqrt(1 - dt * dt) - 1);
			dt -= 2;
			return 0.5 * (Math.sqrt(1 - dt * dt) + 1);
		}

		public static easeCubicIn(dt: number): number {
			return dt * dt * dt;
		}

		public static easeCubicOut(dt: number): number {
			dt = dt - 1;
			return (dt * dt * dt + 1);
		}

		public static easeCubicInOut(dt: number): number {
			dt = dt * 2;
			if (dt < 1)
				return 0.5 * dt * dt * dt;
			dt -= 2;
			return 0.5 * (dt * dt * dt + 2);
		}
	}
}