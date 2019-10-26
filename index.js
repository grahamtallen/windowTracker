class Window {



	constructor(id, x, y, w, h) {
		this.id = id;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.children = new Map();
		this.parent = null;


	}

	addChild(window) {
		this.children.set(window.id, window);
		window.addParent(this);
	}

	addParent(parentWindow) {
		this.parent = parentWindow;
	}

	getGlobalPosition(x = 0, y = 0) {
		if (!this.parent) {
			return {
				x: x + this.x, 
				y: y + this.y
			}
		} else {
			return this.parent.getGlobalPosition(x + this.x, y + this.y)
		}
	}

	getLocalPosition() {
		return {x: this.x, y: this.y}
	}

	onClick(clickedX, clickedY) {
		const {x, y, w, h} = this;
		const withinXBounds = (x <= clickedX && clickedX <= (x + w));
		const withinYBounds = (y <= clickedY && clickedY <= (y + h));
		if (withinXBounds && withinYBounds) {
			this.logClicked(this)
		}
	}

	logClicked(win) {
		console.log(win.id, " clicked")
	}
}

const root = new Window("root", 0, 0, 1024, 768);
const child1 = root.addChild(new Window("child1", 20, 20, 100, 200))




// tests

root.onClick(1024, 768); // true