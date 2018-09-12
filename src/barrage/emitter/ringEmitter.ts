module barrage.emitter{

	import vec3 = common.vec3;

	export class ringEmitter extends emitter{

		protected degrees : number = 0;
		protected intervalTime : number = 0
		protected bulletCreator : Function = null;

		private emitTime = 0;

		public update(dt: number){
			super.update(dt);

			if(this.lifeTime <= 0){
				return;
			}

			this.emitTime -= dt;
			if(this.emitTime <= 0){
				this.emit(Math.abs(this.emitTime));
				this.emitTime = this.intervalTime;
			}
		}

		private emit(elapsedTime : number){
			var count = 360 / this.degrees;
			for(var i = 0; i < count; i ++){
				if(this.bulletCreator != null || true){
					//var bullet = this.bulletCreator() as IBullet;
					var bullet = new barrage.bullet();
					var radian = (i * this.degrees) * 0.017453293;
					var dir = new vec3();
					dir.x = Math.sin(radian);
					dir.y = Math.cos(radian);
					bullet.setup({direction: dir.normalize(), position: this.position});
					this.actions.forEach(function(v, key, map){
						var action = new key() as IAction;
						v.bullet = bullet;
						action.setup(v);
						bullet.addAction(action);
					});
					this.children.set(bullet, 1);
				}
			}
		}
	}
}