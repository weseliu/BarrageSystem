module actions {
	export class CardinalSplineBy extends CardinalSplineTo {

		protected startPosition: Point = null;

		constructor(duration, points, tension) {
			super(duration, points, tension);
			this.startPosition = new Point(0, 0);

			this.initWithDurationInner(duration, points, tension);
		}

		public startWithTarget(target: ActionObject) {
			super.startWithTarget(target);
			this.startPosition.x = target.getPosition().x;
			this.startPosition.y = target.getPosition().y;
		}

		public reverse() {
			var copyConfig = this.points.slice();
			var current;
			//
			// convert "absolutes" to "diffs"
			//
			var p = copyConfig[0];
			for (var i = 1; i < copyConfig.length; ++i) {
				current = copyConfig[i];
				copyConfig[i] = Point.sub(current, p);
				p = current;
			}

			// convert to "diffs" to "reverse absolute"
			var reverseArray = reverseControlPoints(copyConfig);

			// 1st element (which should be 0,0) should be here too
			p = reverseArray[reverseArray.length - 1];
			reverseArray.pop();

			p.x = -p.x;
			p.y = -p.y;

			reverseArray.unshift(p);
			for (var i = 1; i < reverseArray.length; ++i) {
				current = reverseArray[i];
				current.x = -current.x;
				current.y = -current.y;
				current.x += p.x;
				current.y += p.y;
				reverseArray[i] = current;
				p = current;
			}
			return new CardinalSplineBy(this.duration, reverseArray, this.tension);
		}

		public updatePosition(newPos) {
			var pos = this.startPosition;
			var posX = newPos.x + pos.x;
			var posY = newPos.y + pos.y;
			this.previousPosition.x = posX;
			this.previousPosition.y = posY;
			this.target.setPosition(posX, posY);
		}

		public clone() {
			var a = new CardinalSplineBy(0, null, 0);
			a.initWithDurationInner(this.duration, cloneControlPoints(this.points), this.tension);
			return a;
		}
	}

	export function cardinalSplineBy(duration, points, tension) {
		return new CardinalSplineBy(duration, points, tension);
	};
}