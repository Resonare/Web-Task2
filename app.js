const svg = d3.select("#svgElement");

const createScene = () => {
  svg
    .append("line")
    .attr("x1", 460)
    .attr("y1", 10)
    .attr("x2", 450)
    .attr("y2", 20)
    .attr("stroke", "blue")
    .attr("stroke-width", 2);

  svg
    .append("line")
    .attr("x1", 460)
    .attr("y1", 30)
    .attr("x2", 450)
    .attr("y2", 20)
    .attr("stroke", "blue")
    .attr("stroke-width", 2);

  svg
    .append("line")
    .attr("x1", 480)
    .attr("y1", 20)
    .attr("x2", 20)
    .attr("y2", 20)
    .attr("stroke", "blue")
    .attr("stroke-width", 2);

  svg
    .append("line")
    .attr("x1", 20)
    .attr("y1", 20)
    .attr("x2", 20)
    .attr("y2", 250)
    .attr("stroke", "blue")
    .attr("stroke-width", 2);

  svg
    .append("line")
    .attr("x1", 20)
    .attr("y1", 250)
    .attr("x2", 480)
    .attr("y2", 250)
    .attr("stroke", "blue")
    .attr("stroke-width", 2);

  svg
    .append("line")
    .attr("x1", 480)
    .attr("y1", 250)
    .attr("x2", 480)
    .attr("y2", 480)
    .attr("stroke", "blue")
    .attr("stroke-width", 2);

  svg
    .append("line")
    .attr("x1", 480)
    .attr("y1", 480)
    .attr("x2", 20)
    .attr("y2", 480)
    .attr("stroke", "blue")
    .attr("stroke-width", 2);
};

const moveToStart = () => {
  point.attr("cx", 480).attr("cy", 20);
};

const moveX = (x, duration) => {
  return new Promise((resolve) => {
    point
      .transition()
      .duration(duration)
      .attr("cx", x)
      .attr("r", 10)
      .on("end", () => resolve("result"));
  });
};

const moveY = (y, duration, scale = false) => {
  return new Promise((resolve) => {
    let r = scale ? 20 : 10;

    point
      .transition()
      .duration(duration)
      .attr("cy", y)
      .attr("r", r)
      .on("end", () => resolve("result"));
  });
};

const point = svg
  .append("circle")
  .style("fill", "red")
  .attr("r", 10)
  .attr("cx", 0)
  .attr("cy", 0);

const startAnimation = async () => {
  const duration = +document.getElementById("duration").value;
  const scaleEffect = document.getElementById("scaleEffect").checked;

  // moveToStart();

  let path = createPath();

  move(point, path, scaleEffect ? 1 : 0, duration);
};

const clearSvg = () => {
  point.interrupt();
  moveToStart();
};

createScene();

document
  .getElementById("startAnimation")
  .addEventListener("click", startAnimation);

document.getElementById("clearSvg").addEventListener("click", clearSvg);

const createPath = () => {
  const dataPoints = [{ x: 480, y: 20 }, { x: 20, y: 20 }, { x: 20, y: 250 }, { x: 480, y: 250 }, { x: 480, y: 480 }, { x: 20, y: 480 }];
  let line = d3
    .line()
    .x((d) => d.x)
    .y((d) => d.y);

  const path = svg
    .append("path")
    .attr("d", line(dataPoints))
    .attr("none", "black")
    .attr("fill", "none");

  return path;
}

const move = (svg, path, scale, time) => {
  svg
    .transition()
    .ease(d3.easeLinear)
    .duration(time / 5)
    .attrTween("transform", tran(path.node(), scale));
}

const tran = (path, scale) => {
  const length = path.getTotalLength();
  return () => {
    return (t) => {
      const { x, y } = path.getPointAtLength(t * length);
      return `translate(${x},${y}) scale(${scale * t + 1})`;
    };
  };
}