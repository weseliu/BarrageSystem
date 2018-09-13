module barrage{
	export class bullet implements IBullet{
		protected actions : Array<IAction> = new Array<IAction>();

		public object: any;
		public position: common.vec3;
		public direction: number;

		constructor(){
			var txt =  new laya.display.Text();
			txt.text = "A";
			txt.color = "#ff0000";
			this.object = txt;
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