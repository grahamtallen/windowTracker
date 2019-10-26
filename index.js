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

	onClick(clickedX = 0, clickedY = 0, hideLog = false, clickedWindows = []) {
		// main purpose is to log, but also returns clickedWindows to test and debug
		const {w, h} = this;
		const {x, y} = this.getGlobalPosition();
		const withinXBounds = (x <= clickedX && clickedX <= (x + w));
		const withinYBounds = (y <= clickedY && clickedY <= (y + h));
		let windowHasBeenClicked = withinXBounds && withinYBounds;
		if (windowHasBeenClicked) {
			!hideLog && this.logClicked(this);
			clickedWindows.push(this.id);
			for (const childWindow of this.children.values()) {
				childWindow.onClick(clickedX, clickedY, hideLog, clickedWindows)
			}
		}
		return clickedWindows;
	}

	logClicked(win) {
		console.log(win.id, " clicked")
	}

	printReport(nestingLevel = 0) {
		const {id, x, y, w, h, parent, children} = this;
		const isRoot = !parent;
		let tabLevel = "";
		for (let i = 0; i <= nestingLevel; i++) {
			tabLevel = tabLevel + "\t";
		}
		console.log(`${tabLevel}${!isRoot ? " - " : ""}${id} ${x} ${y} ${w} ${h}\n`);
		for (const childWindow of this.children.values()) {
			childWindow.printReport(nestingLevel + 1);
		}
	}
}

const root = new Window("root", 0, 0, 1024, 768);
const child1 = root.addChild(new Window("child1", 20, 20, 100, 200));
const child2 = root.addChild(new Window("child2", 25, 25, 100, 200));
const child3 = root.addChild(new Window("child3", 30, 30, 400, 400));
const child4 = child3.addChild(new Window("child4", 2, 0, 400, 10));
const button1 = child3.addChild(new Window("button1", 0, 0, 10, 10));
const button2 = child3.addChild(new Window("button2", 10, 0, 10, 10));
const button3 = child3.addChild(new Window("button3", 20, 0, 10, 10));
const button4 = child3.addChild(new Window("button4", 30, 0, 10, 10));
const child5 = root.addChild(new Window("child5", 40, 20, 400, 400));
const child6 = child5.addChild(new Window("child6", 2, 0, 400, 10));
const button5 = child5.addChild(new Window("button5", 0, 0, 10, 10));
const button6 = child5.addChild(new Window("button6", 10, 0, 10, 10));
const button7 = child5.addChild(new Window("button7", 20, 0, 10, 10));
const button8 = child5.addChild(new Window("button7", 30, 0, 10, 10));

root.printReport()
root.onClick(45, 25)


// tests

const clickedWindowsAt4525 = root.onClick(45, 25, true)
assert(clickedWindowsAt4525.includes("root"));
assert(clickedWindowsAt4525.includes("child1"));
assert(clickedWindowsAt4525.includes("child2"));
assert(clickedWindowsAt4525.includes("child5"));
assert(clickedWindowsAt4525.includes("child6"));
assert(clickedWindowsAt4525.includes("button5"));



// passing
assert(root.onClick(1024, 768, true).includes("root"));
assert(!root.onClick(1025, 768, true).includes("root"));
assert(!root.onClick(1025, 769, true).includes("root"));

