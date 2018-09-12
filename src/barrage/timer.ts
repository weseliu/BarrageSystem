module barrage{

	export class timer{

		public static loop(caller: any, method: Function){
			Laya.timer.frameLoop(1, caller, method);
		}

		public static clear(caller: any, method){
			Laya.timer.clear(caller, method);
		}
	}
}