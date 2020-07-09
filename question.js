const points = [
  { x: 100, y: 100 },
  { x: 200, y: 50 },
  { x: 300, y: 50 },
  { x: 400, y: 200 },
  { x: 350, y: 250 },
  { x: 200, y: 300 },
  { x: 150, y: 300 },
];

const line = [];

function getMousePos(evt) {
  var rect = document.getElementById("content").getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}

function findIntersection(x1, x2, x3, x4, y1, y2, y3, y4) {
  const tNumerator = (x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4);
  const tDenominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  const t = tNumerator / tDenominator;
  const px = x1 + t * (x2 - x1);
  const py = y1 + t * (y2 - y1);

  if (t >= 0 && t <= 1 && ((px < x3 && px > x4) || (px > x3 && px < x4))) {
    return {
      x: px,
      y: py,
    };
  }
  return undefined;
}

function addIntersectionPoints(poly1, poly2, point, intersection) {
  poly1.push(
    { x: point.x, y: point.y },
    { x: intersection.x, y: intersection.y }
  );
  poly2.push({ x: intersection.x, y: intersection.y });
}

const addLine = (event) => {
  clearPoly();
  if (line.length > 1) {
    line.shift();
  }
  if (getMousePos(event).x && getMousePos(event).y) {
    line.push({
      x: getMousePos(event).x,
      y: getMousePos(event).y,
    });
  }
  addPoly(line);
};

function onMouseDown(event) {
  addLine(event);
  addPoly(line);
  addPoly(points);
}

function onMouseUp(event) {
  if (line.length < 2) return;
  const poly1 = [];
  const poly2 = [];
  let bisection = true;

  points.forEach((point, i) => {
    const nextPointIndex = i + 1;
    const nextPoint =
      nextPointIndex < points.length ? points[nextPointIndex] : points[0];

    const intersection = findIntersection(
      line[0].x,
      line[1].x,
      point.x,
      nextPoint.x,
      line[0].y,
      line[1].y,
      point.y,
      nextPoint.y
    );

    if (intersection) {
      if (bisection) {
        addIntersectionPoints(poly1, poly2, point, intersection);
      } else {
        addIntersectionPoints(poly2, poly1, point, intersection);
      }
      bisection = !bisection;
    } else {
      if (bisection) {
        poly1.push(point);
      } else {
        poly2.push(point);
      }
    }
  });
  //Generate the two sets of points for the split polygons
  //An algorithm for finding interceptions of two lines can be found in https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
  if (bisection && poly1.length && poly2.length) {
    clearPoly();
    addPoly(poly1, "blue");
    addPoly(poly2, "green");
    line = [];
  }
  addPoly(line);
}

/*
	Code below this line shouldn't need to be changed
*/

//Draws a polygon from the given points and sets a stroke with the specified color
function addPoly(points, color = "black", fill = "transparent") {
  const content = document.getElementById("content");

  var svgElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  var svgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  let path = "M" + points[0].x + " " + points[0].y;

  for (const point of points) {
    path += " L" + point.x + " " + point.y;
  }
  path += " Z";
  svgPath.setAttribute("d", path);
  svgPath.setAttribute("stroke", color);
  svgPath.setAttribute("stroke-width", 3);
  svgPath.setAttribute("fill", fill);

  svgElement.setAttribute("height", "500");
  svgElement.setAttribute("width", "500");
  svgElement.setAttribute(
    "style",
    "position: absolute;border: 5px solid black;"
  );
  svgElement.setAttribute("fill", "transparent");

  svgElement.appendChild(svgPath);
  content.appendChild(svgElement);
}

//Clears the all the drawn polygons
function clearPoly() {
  const content = document.getElementById("content");
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }
}

//Sets the mouse events needed for the exercise
function setup() {
  this.clearPoly();
  this.addPoly(points);
  document.addEventListener("mousedown", onMouseDown);
  document.addEventListener("mouseup", onMouseUp);
}

window.onload = () => setup();
