module barrage.actions {

	import vec3 = common.vec3;

	export class move implements IAction {
		private bullet: IBullet = null;
		private speed: number = 0;
		private orgPosition: vec3 = null;
		private actionTime : number = 0;

		constructor() {

		}

		public setup(props: any) {
			for (var prop in props) {
				if (this.hasOwnProperty(prop)) {
					this[prop] = props[prop];
				}
			}

			this.orgPosition = new vec3(this.bullet.position);
		}

		public update(dt: number) {
			this.actionTime += dt;

			this.bullet.position
		}
	}
}