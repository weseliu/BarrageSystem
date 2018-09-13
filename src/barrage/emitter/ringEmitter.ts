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
					bullet.setup({direction: i * this.degrees, position: this.position});
					this.actions.forEach(function(v, key, map){
						var action = new key() as IAction;
						action.setup(bullet, v);
						bullet.addAction(action);
					});
					this.children.set(bullet, 1);
				}
			}
		}
	}
}