module barrage.common {

	export class vec3 {

		public x: number = 0;
		public y: number = 0;
		public z: number = 0;

		constructor(x: (number | vec3) = 0, y: number = 0, z: number = 0) {
			if (x instanceof vec3) {
				this.x = x.x;
				this.y = x.y;
				this.z = x.z;
			} else {
				this.x = x;
				this.y = y;
				this.z = z;
			}
		}

		public static fromDegrees(degrees: number): vec3 {
			var radian = degrees * 0.017453293;
			return new vec3( Math.sin(radian), Math.cos(radian), 0);
		}

		public static fromRadian(radian: number): vec3 {
			return new vec3( Math.sin(radian), Math.cos(radian), 0);
		}

		public normalize() {
			var n = this.x * this.x + this.y * this.y + this.z * this.z;
			n = 1 / Math.sqrt(n);
			return new vec3(this.x * n, this.y * n, this.z * n);
		}

		public cross(v: vec3): vec3 {
			return new vec3(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
		}

		public dot(v: vec3): number {
			return this.x * v.x + this.y * v.y + this.z * v.z;
		}

		public length(): number {
			return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		}

		public add(v: vec3): vec3 {
			return new vec3(this.x + v.x, this.y + v.y, this.z + v.z);
		}

		public sub(v: vec3): vec3 {
			return new vec3(this.x - v.x, this.y - v.y, this.z - v.z);
		}

		public mul(v: number): vec3 {
			return new vec3(this.x * v, this.y * v, this.z * v);
		}

	}
}