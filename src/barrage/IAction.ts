module barrage{

	export interface IAction{
		setup(props: any);
		update(dt: number);
	}
}