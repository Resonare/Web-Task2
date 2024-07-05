const filterForm = document.querySelector("#filterForm");
const filterSubmit = filterForm.querySelector("input[type='submit']");
const inputs = filterForm.querySelectorAll("input");
const tableBody = document.querySelector("table#dataTable > tbody");
const tableHeader = tableBody.firstChild;
const tableRows = tableBody.querySelectorAll("tr");

const numValues = [1, 4, 6];

const getFilterValues = (nodeListOfInputs) => {
  let finRes = [];
  let result = Array.from(nodeListOfInputs)
    .map((input) => (input.name ? input.value : undefined))
    .filter((value) => value !== undefined);

  for (let i = 0; i < result.length; i += 2) {
    finRes.push({
      from: result[i],
      to: result[i + 1],
    });
  }

  console.log(finRes);

  return finRes;
};

const filter = (filterValues) => {
  let tableRowsArray = Array.from(tableRows);
  tableRowsArray.shift();

  tableRowsArray = tableRowsArray.filter((tableRow) => {
    for (let i = 0; i < filterValues.length; i++) {
      if (numValues.includes(i)) {
        console.log(+filterValues[i].from, +tableRow.children[i].textContent);
        if (
          (+filterValues[i].from > +tableRow.children[i].textContent &&
            filterValues[i].from != "") ||
          (+filterValues[i].to < +tableRow.children[i].textContent &&
            filterValues[i].to != "")
        )
          return false;
      } else {
        if (
          filterValues[i].from != tableRow.children[i].textContent &&
          filterValues[i].from != ""
        )
          return false;
      }
    }

    return true;
  });

  tableBody.innerHTML = "";
  tableBody.appendChild(tableHeader);

  tableRowsArray.forEach((filteredRow) => tableBody.appendChild(filteredRow));
};

filterSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  filter(getFilterValues(inputs));
});
