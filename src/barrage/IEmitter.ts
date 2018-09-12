module barrage{

	export interface IEmitter{
		setup(props: any, autoPlay: boolean);
		start(params: any);
		stop();
		addAction(actionClass: any, props: any);
		removeAction(actionClass: any);
		update(dt: number);
	}

}