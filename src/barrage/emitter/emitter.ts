module barrage.emitter {

	import vec3 = common.vec3;

	export class emitter implements IEmitter {

		public bullet: IBullet = null;
		protected actions: Map<any, any> = new Map<any, any>();
		protected position: vec3 = new vec3();
		protected lifeTime: number = 0;
		protected isPlaying: boolean = false;

		private frameStartTime: number = 0;
		private lastFrameTime: number = 0;

		protected children: Map<IBullet, any> = new Map<IBullet, any>(); 

		public setup(bullet: IBullet, props: any, autoPlay: boolean) {
			this.bullet = bullet;
			this.actions.clear();

			for (var prop in props) {
				this[prop] = props[prop];
			}

			if (autoPlay) {
				this.start();
			}
		}

		public addAction(actionClass: any, props: any = null){
			this.actions.set(actionClass, props);
		}

		public removeAction(actionClass: any) {
			if(this.actions.has(actionClass)){
				this.actions.delete(actionClass);
			}
		}

		public start(params: any = null) {
			if (this.isPlaying) {
				return;
			}

			timer.loop(this, this.onUpdate);
		}

		public stop() {
			timer.clear(this, this.onUpdate);
			this.isPlaying = false;
		}

		public update(dt: number) {
			this.lifeTime -= dt;
			if(this.lifeTime <= 0){
				this.stop();
			}
		}

		public destory() {

		}

		private onUpdate() {
			var currentTime = (new Date()).valueOf();
			var dt = 0;
			if (this.frameStartTime === 0) {
				this.frameStartTime = currentTime;
				this.lastFrameTime = currentTime;
				dt = 0.001;
			} else {
				dt = (currentTime - this.lastFrameTime) / 1000;
				this.lastFrameTime = currentTime;
			}

			this.update(dt);
			this.children.forEach(function(v, key, map){
				key.update(dt);
				key.applay();
			}.bind(this));
		}
	}
}