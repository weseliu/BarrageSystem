module barrage.actions {

	export class direct extends action {

		protected maxChangeValue: number = 90;
		protected currentDirection: number = 0;

		public setup(bullet: IBullet, props: any) {
			super.setup(bullet, props);
			this.currentDirection = this.bullet.direction;
		}

		public update(dt: number) {
			super.update(dt);

			this.bullet.direction += this.speed;
			if (this.maxChangeValue > 0) {
				if (this.bullet.direction - this.currentDirection > this.maxChangeValue) {
					this.bullet.direction = this.currentDirection + this.maxChangeValue;
				}
			} else {
				if (this.bullet.direction - this.currentDirection < this.maxChangeValue) {
					this.bullet.direction = this.currentDirection + this.maxChangeValue;
				}
			}
		}
	}
}