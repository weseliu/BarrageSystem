module barrage.actions{
	import vec3 = common.vec3;

	export class action implements IAction {

		protected bullet: IBullet = null;
		protected speed: number = 0;
		protected actionTime : number = 0;

		constructor() {
			this.bullet = null;
			this.speed = 0;
			this.actionTime = 0;
		}

		public setup(bullet: IBullet, props: any) {
			for (var prop in props) {
				if (this.hasOwnProperty(prop)) {
					this[prop] = props[prop];
				}
			}
			this.bullet = bullet;
		}

		public update(dt: number) {
			this.actionTime += dt;
		}
	}
}