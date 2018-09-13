module actions {

	export class Action {

		public duration: number = 0;
		protected originalTarget: any = null;
		protected target: any = null;
		protected tag: string = "";

		constructor() {
			this.originalTarget = null;
			this.target = null;
			this.tag = "";
		}

		public clone(): Action {
			var action = new Action();
			action.originalTarget = null;
			action.target = null;
			action.tag = this.tag;
			return action;
		}

		public isDone(): boolean {
			return true;
		}

		public startWithTarget(target){
			this.originalTarget = target;
			this.target = target;
		}

		public stop(){
			this.target = null;
		}

		public step(dt: number){

		}

		public update(dt: number){

		}

		public reverse(){
			
		}

		public getTarget(): any{
			return this.target;
		}

		public setTarget(target: any){
			this.target = target;
		}

		public getOriginalTarget(): any{
			return this.originalTarget;
		}

		public setOriginalTarget(target: any){
			this.originalTarget = target;
		}

		public getTag(): string{
			return this.tag;
		}

		public setTag(tag: string){
			this.tag = tag;
		}
	}
}