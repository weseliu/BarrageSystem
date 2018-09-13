module barrage{
	export interface IBullet{

		object: any;
		position: common.vec3;
		direction: number;

		setup(props: any);
		addAction(action: IAction);
		update(dt: number);
		applay();
	}
}