module barrage{
	export class bullet implements IBullet{
		protected actions : Array<IAction> = new Array<IAction>();

		public object: any;
		public position: common.vec3;
		public direction: number;

		constructor(){
			var sprite =  new laya.display.Sprite();
     		sprite.loadImage("buttet/b1.png");
     		sprite.pivotX = 0;
     		sprite.pivotY = 0;
			this.object = sprite;
			Laya.stage.addChild(this.object);
		}

		public setup(props: any){
			for (var prop in props) {
				this[prop] = props[prop];
			}
		}

		public addAction(action: IAction){
			this.actions.push(action);
		}

		public update(dt: number){
			for(var i = 0; i < this.actions.length; i++){
				this.actions[i].update(dt);
			}
		}

		public applay(){
			var txt = this.object as laya.display.Text;
			txt.x = this.position.x;
			txt.y = this.position.y;
		}
	}
}