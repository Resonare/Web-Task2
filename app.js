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

const startAnimation = async () => {
  const duration = +document.getElementById("duration").value;
  const scaleEffect = document.getElementById("scaleEffect").checked;

  moveToStart();

  await moveX(20, duration / 5);
  await moveY(250, duration / 5, scaleEffect);
  await moveX(480, duration / 5);
  await moveY(480, duration / 5, scaleEffect);
  await moveX(20, duration / 5);
};

const clearSvg = () => {
  point.interrupt();
  moveToStart();
};

createScene();

const point = svg
  .append("circle")
  .attr("cx", 480)
  .attr("cy", 20)
  .attr("r", 10)
  .attr("fill", "red");

document
  .getElementById("startAnimation")
  .addEventListener("click", startAnimation);

document.getElementById("clearSvg").addEventListener("click", clearSvg);
