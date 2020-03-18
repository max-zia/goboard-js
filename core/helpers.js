/** Create an SVG element. */
function createSVGElement(element) {
    return document.createElementNS("http://www.w3.org/2000/svg", element);
}

/** Create an SVG circle */
function createSVGCircle(x, y, r, fill, stroke, id) {
    var circle = createSVGElement("circle");
    circle.setAttribute("cx", x);            
    circle.setAttribute("cy", y);            
    circle.setAttribute("r", r);
    circle.setAttribute("id", id);             
    circle.setAttribute("fill", fill);
    circle.setAttribute("stroke", stroke);
    return circle;
}

/**
 * Returns the count of an element in an array.
 */
function countOf(array, element) {
    var x = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i] == element) {
            x++;
        }
    }
    return x;
}

/**
 * Set operations
 */
function intersection(arrA, arrB) {
    return arrA.filter(x => arrB.includes(x));  
}

function difference(arrA, arrB) {
    return arrA.filter(x => !arrB.includes(x));
}

function union(arrA, arrB) {
    return [...new Set([...arrA, ...arrB])];
}

