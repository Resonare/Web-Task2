const filterForm = document.querySelector("#filterForm");
const filterSubmit = filterForm.querySelector("input[type='submit']");
const inputs = filterForm.querySelectorAll("input");
const tableBody = document.querySelector("table#dataTable > tbody");
const tableHeader = tableBody.firstChild;
const tableRows = tableBody.querySelectorAll("tr");

const getFilterValues = (nodeListOfInputs) => {
  let result = Array.from(nodeListOfInputs)
    .map((input) => (input.name ? input.value : undefined))
    .filter((value) => value !== undefined);

  return result;
};

const filter = (filterValues) => {
  let tableRowsArray = Array.from(tableRows);
  tableRowsArray.shift();

  tableRowsArray = tableRowsArray.filter((tableRow) => {
    for (let i = 0; i < filterValues.length; i++) {
      if (
        filterValues[i] != tableRow.children[i].textContent &&
        filterValues[i] != ""
      )
        return false;
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
