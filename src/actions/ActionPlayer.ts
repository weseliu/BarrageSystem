module actions{
	export class ActionPlayer{

		private static instance : ActionPlayer = null;
		public static Instance() : ActionPlayer {
			if(ActionPlayer.instance == null) {
				ActionPlayer.instance = new ActionPlayer();
			}
			return ActionPlayer.instance;
		}

		constructor(){

		}

		public loadJson() : any {

		}

		public play(target: any, actions: any){

		}
	}
}