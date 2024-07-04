const graphForm = document.querySelector("#graphForm");
const svg = d3.select("#graphSvg");

const WIDTH = 1000;
const HEIGHT = 500;

const MARGIN_X = 50;
const MARGIN_Y = 40;

const getValues = () => {
  let targetField = +graphForm.querySelector('input[name="target"]:checked')
    .value;
  let searching = graphForm.querySelector('input[name="result"]:checked').value;
  let currentTableRows = Array.from(tableBody.querySelectorAll("tr"));

  currentTableRows.shift();

  currentTableRows.sort((a, b) => {
    let colA = a.children[targetField].innerText;
    let colB = b.children[targetField].innerText;

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
  currentTableRows.forEach((row) => {
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

graphForm
  .querySelector("input[type='submit']")
  .addEventListener("click", (e) => {
    e.preventDefault();
    buildGraph(getValues());
  });
