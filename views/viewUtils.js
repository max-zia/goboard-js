/** Creates an SVG group to hold a row of intersections. */
function createRow(id) {
    // Set ID for the row
    var g = createSVGElement("g");
    g.setAttribute("id", `row-${id}`);

    // Append directly to the go board parent element
    document.getElementById("board").appendChild(g);
}

/* Attaches intersection SVG group to a row. */
function drawIntersection(row_id, id, x, y) {        
    // Set ID for the SVG group that will hold the intersection
    var g = createSVGElement("g");
    g.setAttribute("id", id);

    // Append the intersection's SVG holding group to the correct row
    document.getElementById(`row-${row_id}`).appendChild(g);

    // Create intersection then place inside its SVG group
    var intersection = createSVGCircle(x, y, intersectionR, "black", "black", "p");
    g.appendChild(intersection);
}

/** 
 * Check if a "stone-group" element, holding a black or white stone, is 
 * inside the intersection in the SVG tree. 
 */ 
function isPointEmpty(co) {
    var arr = document.getElementById(co).children;
    if (arr.length < 2) {
        return true;
    } else {
        for (let i = 0; i < (arr.length); i++) {
            if (arr[i].id == "stone-group") {
                return false;
            };
        }
    }
    return true;
}

/** 
 * Clear away "stone-groups" from a coordinate inside SVG tree. 
 * e.g. clearPoint("A9")
 */
function clearPoint(co) {
    var arr = document.getElementById(co).children;
    if (arr.length < 2) {
        // do nothing;
    } else {
        for (let i = 0; i < (arr.length); i++) {
            if (arr[i].id == "stone-group") {
                arr[i].remove();
            };
        }
    }
}

/**
 * Draw a stone ("p-stone") in SVG "stone-group" at an intersection.
 * e.g. drawStone("A9", "white")
 */
function drawStone(co, colour) {
    var g = createSVGElement("g");
    g.setAttribute("id", "stone-group");

    var el = document.getElementById(co);
    el.appendChild(g);

    var x = el.children[0].getAttribute("cx");
    var y = el.children[0].getAttribute("cy");

    var svgStone = createSVGCircle(x, y, stoneR, colour, "black", "p-stone");
    g.appendChild(svgStone);
}


