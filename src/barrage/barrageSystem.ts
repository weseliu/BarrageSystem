module barrage{
	
	export class barrageSystem{

		public static create(emitterClass: any): IEmitter {
			return new emitterClass() as IEmitter;
		}
	}
}