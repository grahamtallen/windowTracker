My solution to a coding interview challenge: 

Design a simple data structure to keep track of windows for a 2D windows system similar to what is seen in Windows or MacOSX. The windows should have a parent child relationship, and 2D position (x,y) and size (w,h) dimensions. Child
windows should be positioned relative to their parent (if their parent x,y moves then the child position should change).
Each window should have a getGlobalPosition() method which gives its position in screen space, and a
getLocalPosition method which gives its position relative to its parent. There should be a way to output a
report of all windows, their names, and both their global and local positions.
