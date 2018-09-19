module actions {

	export class Point {
		public x: number = 0;
		public y: number = 0;

		constructor(x: number = 0, y: number = 0) {
			this.x = x;
			this.y = y;
		}

		public static neg(point: Point) {
			return new Point(point.x, point.y);
		}

		public static add(v1: Point, v2: Point) {
			return new Point(v1.x + v2.x, v1.y + v2.y);
		}

		public static sub(v1: Point, v2: Point) {
			return new Point(v1.x - v2.x, v1.y - v2.y);
		}

		public static mult(v1: Point, v: number) {
			return new Point(v1.x * v, v1.y * v);
		}

		public static midpoint(v1: Point, v2: Point) {
			return Point.mult(Point.add(v1, v2), 0.5);
		}

		public static dot(v1: Point, v2: Point) {
			return v1.x * v2.x + v1.y * v2.y;
		}

		public static cross(v1: Point, v2: Point) {
			return v1.x * v2.y - v1.y * v2.x;
		}
	}

	export class Color {
		public r: number = 0;
		public g: number = 0;
		public b: number = 0;
		public a: number = 0;

		constructor(r: number = 0, g: number = 0, b: number = 0, a: number = 1) {
			this.r = r;
			this.g = g;
			this.b = b;
			this.a = a;
		}
	}

	export class Action {

		protected originalTarget: ActionObject = null;
		protected target: ActionObject = null;
		protected tag: string = "";

		constructor() {
			this.originalTarget = null;
			this.target = null;
			this.tag = "";
		}

		public clone(): Action {
			var action = new Action();
			action.originalTarget = null;
			action.target = null;
			action.tag = this.tag;
			return action;
		}

		public isDone(): boolean {
			return true;
		}

		public startWithTarget(target: ActionObject) {
			this.originalTarget = target;
			this.target = target;
			Laya.timer.frameLoop(1, this, function () {
				this.step(Laya.timer.delta);
			}.bind(this));
		}

		public stop() {
			this.target = null;
			Laya.timer.clearAll(this);
		}

		public step(dt: number) {

		}

		public update(dt: number) {

		}

		public reverse() {

		}

		public getTarget(): any {
			return this.target;
		}

		public setTarget(target: any) {
			this.target = target;
		}

		public getOriginalTarget(): any {
			return this.originalTarget;
		}

		public setOriginalTarget(target: any) {
			this.originalTarget = target;
		}

		public getTag(): string {
			return this.tag;
		}

		public setTag(tag: string) {
			this.tag = tag;
		}
	}
}