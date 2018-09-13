module barrage.actions {

	import vec3 = common.vec3;

	export class move extends action {

		public update(dt: number) {
			super.update(dt);
			var speed = vec3.fromDegrees(this.bullet.direction).mul(this.speed);
			this.bullet.position = this.bullet.position.add(speed);
		}
	}
}