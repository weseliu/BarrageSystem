module actions {
	export class SpriteObject implements ActionObject {

		protected targetObj: laya.display.Sprite = null;

		constructor(obj: laya.display.Sprite) {
			this.targetObj = obj;
		}

		public getPosition(): Point {
			return new Point(this.targetObj.x, this.targetObj.y);
		}

		public setPosition(x: number, y: number) {
			this.targetObj.pos(x, y);
		}

		public getScale(): Point {
			return new Point(this.targetObj.scaleX, this.targetObj.scaleY);
		}

		public setScale(x: number, y: number) {
			this.targetObj.scale(x, y);
		}

		public getRotation(): number {
			return this.targetObj.rotation;
		}

		public setRotation(rotation: number) {
			this.targetObj.rotation = rotation;
		}

		public getSkew(): Point {
			return new Point(this.targetObj.skewX, this.targetObj.skewY);
		}

		public setSkew(x: number, y: number) {
			this.targetObj.skew(x, y);
		}

		public getColor(): Color {
			return new Color();
		}

		public setColor(r: number, g: number, b: number, a: number) {

		}

		public getOpacity(): number {
			return Math.round(this.targetObj.alpha * 255);
		}

		public setOpacity(opacity: number) {
			this.targetObj.alpha = opacity / 255;
		}

		public getVisible(): boolean {
			return this.targetObj.visible;
		}

		public setVisible(visible: boolean) {
			this.targetObj.visible = visible;
		}

		public removeFromParent(cleanup: boolean) {
			this.targetObj.removeSelf();
		}
	}

	export function spriteObject(obj: laya.display.Sprite): ActionObject {
		return new SpriteObject(obj);
	}
}