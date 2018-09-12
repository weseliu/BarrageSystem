module barrage{
	export interface IBullet{

		object: any;
		position: common.vec3;
		direction: common.vec3;

		setup(props: any);
		addAction(action: IAction);
		update(dt: number);
		applay();
	}
}