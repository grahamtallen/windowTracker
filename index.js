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
}

const root = new Window("root", 0, 0, 1024, 768);
const child1 = root.addChild(new Window("child1", 20, 20, 100, 200))

console.log(root.children.get("child1").parent.children.get("child1"))