const assert = require("assert");

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
		return window;
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

	onClick(clickedX = 0, clickedY = 0, hideLog = false) {
		const {x, y, w, h} = this;
		const withinXBounds = (x <= clickedX && clickedX <= (x + w));
		const withinYBounds = (y <= clickedY && clickedY <= (y + h));
		let windowHasBeenClicked = withinXBounds && withinYBounds;

		if (windowHasBeenClicked) {
			!hideLog && this.logClicked(this);
			for (const childWindow of this.children.values()) {
				childWindow.onClick(clickedX - x, clickedY - x, hideLog)
			}

		}
		return windowHasBeenClicked;
	}

	logClicked(win) {
		console.log(win.id, " clicked")
	}

	printReport() {
		const {id, x, y, w, h, parent, children} = this;
		const isRoot = !parent;
		console.log(`${!isRoot ? " - " : ""}${id} ${x} ${y} ${w} ${h}\n`);
		for (const childWindow of this.children.values()) {
			childWindow.printReport();
		}
	}
}

const root = new Window("root", 0, 0, 1024, 768);
const child1 = root.addChild(new Window("child1", 20, 20, 100, 200))
const child2 = root.addChild(new Window("child2", 25, 25, 100, 200))
const child3 = root.addChild(new Window("child3", 30, 30, 400, 400))
const child4 = child3.addChild(new Window("child4", 30, 30, 400, 400))


root.printReport()

// tests

assert(root.onClick(1024, 768, true));
assert(!root.onClick(1025, 768, true));
assert(!root.onClick(1025, 769, true));