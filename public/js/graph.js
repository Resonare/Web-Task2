const graphForm = d3.select("#graphForm");
const svg = d3.select("#graphSvg");

const WIDTH = 1000;
const HEIGHT = 500;

const MARGIN_X = 50;
const MARGIN_Y = 40;

const getValues = () => {
  let targetField = +d3.select('input[name="target"]:checked').node().value;
  let searching = d3.select('input[name="result"]:checked').node().value;

  const rows = d3.sort(d3.selectAll("table#dataTable > tbody > tr"), (a, b) => {
    let colA = d3.select(a).node().children[targetField].innerText;
    let colB = d3.select(b).node().children[targetField].innerText;

    colA = NUMERIC_COLS.includes(targetField)
      ? +colA
      : colA.toLowerCase().trim();
    colB = NUMERIC_COLS.includes(targetField)
      ? +colB
      : colB.toLowerCase().trim();

    if (colA < colB) return -1;
    if (colA > colB) return 1;

    return 0;
  });

  let values = [];
  let currentX = null;

  rows.forEach((row) => {
    if (currentX != row.children[targetField].innerText) {
      currentX = row.children[targetField].innerText;

      if (searching == "max-rating" || searching == "min-rating") {
        values.push({
          x: currentX,
          y: +row.children[6].innerText,
        });
        return;
      }

      if (searching == "quantity") {
        values.push({
          x: currentX,
          y: 1,
        });
        return;
      }
    } else {
      if (searching == "max-rating") {
        values[values.length - 1].y =
          values[values.length - 1].y < +row.children[6].innerText
            ? +row.children[6].innerText
            : values[values.length - 1].y;

        return;
      }

      if (searching == "min-rating") {
        values[values.length - 1].y =
          values[values.length - 1].y > +row.children[6].innerText
            ? +row.children[6].innerText
            : values[values.length - 1].y;
        return;
      }

      if (searching == "quantity") {
        values[values.length - 1].y++;
        return;
      }
    }
  });

  return values;
};

const buildGraph = (values) => {
  svg.selectAll("*").remove();

  svg
    .attr("height", HEIGHT)
    .attr("width", WIDTH)
    .style("border", "solid thin grey");

  let scaleX = d3
    .scaleBand()
    .domain(values.map((value) => value.x))
    .range([0, WIDTH - 2 * MARGIN_X])
    .padding(1);

  let scaleY = d3
    .scaleLinear()
    .domain(d3.extent(values.map((value) => value.y)))
    .range([HEIGHT - 2 * MARGIN_Y, 0]);

  let axisX = d3.axisBottom(scaleX);
  let axisY = d3.axisLeft(scaleY);

  svg
    .append("g")
    .attr("transform", `translate(${MARGIN_X}, ${HEIGHT - MARGIN_Y})`)
    .call(axisX);
  svg
    .append("g")
    .attr("transform", `translate(${MARGIN_X}, ${MARGIN_Y})`)
    .call(axisY);

  let lineF = d3
    .line()
    .x((point) => scaleX(point.x))
    .y((point) => scaleY(point.y));

  svg
    .append("path")
    .datum(values)
    .attr("d", lineF)
    .attr("fill", "none")
    .attr("transform", `translate(${MARGIN_X}, ${MARGIN_Y})`)
    .style("stroke-width", "2")
    .style("stroke", "red");
};

d3
  .select("input[type='submit']")
  .on("click", (e) => {
    e.preventDefault();
    buildGraph(getValues());
  });
