module barrage{

	export interface IAction{
		setup(bullet: IBullet, props: any);
		update(dt: number);
	}
}