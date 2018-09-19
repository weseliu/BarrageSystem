module actions{

	export interface ActionObject{
		getPosition(): Point;
		setPosition(x: number, y: number);
		getScale(): Point;
		setScale(x: number, y: number);
		getRotation(): number ;
		setRotation(rotation: number);
		getSkew(): Point;
		setSkew(x: number, y: number);
		getColor(): Color;
		setColor(r: number, g: number, b: number, a: number);
		getOpacity(): number ;
		setOpacity(opacity: number);
		getVisible(): boolean ;
		setVisible(visible: boolean);
		removeFromParent(cleanup: boolean);
	}
}