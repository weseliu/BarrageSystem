module barrage{

	export interface IEmitter{
		bullet: IBullet;
		
		setup(bullet: IBullet, props: any, autoPlay: boolean);
		start(params: any);
		stop();
		addAction(actionClass: any, props: any);
		removeAction(actionClass: any);
		update(dt: number);
	}

}