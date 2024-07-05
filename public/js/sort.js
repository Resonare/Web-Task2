const NUMERIC_COLS = [1, 4, 6];
const sortForm = document.querySelector("form#sortForm");

const selectedOptions = {
  first: null,
  second: null,
  third: null,
};

document
  .querySelector("select[name='sort-first']")
  .addEventListener("change", (e) => {
    if (e.target.value == "no") {
      document.querySelector("select[name='sort-second']").disabled = true;
      document.querySelector("select[name='sort-second']").value = "no";
      document.querySelector("select[name='sort-third']").disabled = true;
      document.querySelector("select[name='sort-third']").value = "no";
    } else {
      document.querySelector("select[name='sort-second']").disabled = false;
    }
  });

document
  .querySelector("select[name='sort-second']")
  .addEventListener("change", (e) => {
    if (e.target.value == "no") {
      document.querySelector("select[name='sort-third']").disabled = true;
      document.querySelector("select[name='sort-third']").value = "no";
    } else {
      document.querySelector("select[name='sort-third']").disabled = false;
    }
  });

for (const key in selectedOptions) {
  if (Object.hasOwnProperty.call(selectedOptions, key)) {
    sortForm
      .querySelector(`select[name='sort-${key}']`)
      .addEventListener("change", (e) => {
        sortForm
          .querySelectorAll(`select > option[value=${selectedOptions[key]}]`)
          .forEach((option) => {
            if (option.style) option.style.display = "block";
          });

        selectedOptions[key] = e.target.value;

        if (e.target.value == "no") return;

        sortForm
          .querySelectorAll(
            `select:not([name='sort-${key}']) > option[value=${selectedOptions[key]}]`
          )
          .forEach((option) => {
            if (option.style) option.style.display = "none";
          });
      });
  }
}

const getSortValues = () => {
  let result = {
    first: null,
    second: null,
    third: null,
  };

  for (const key in selectedOptions) {
    if (Object.hasOwnProperty.call(selectedOptions, key)) {
      const option = selectedOptions[key];

      if (option == "no" || option == null) {
        result[key] = null;
        continue;
      }

      if (option == "title") result[key] = "0";
      if (option == "year") result[key] = "1";
      if (option == "genre") result[key] = "2";
      if (option == "director") result[key] = "3";
      if (option == "country") result[key] = "4";
      if (option == "time") result[key] = "5";
      if (option == "rating") result[key] = "6";

      if (sortForm.querySelector(`input[name="reduction-${key}"]`).checked)
        result[key] = "-" + result[key];
    }
  }

  return result;
};

const tableSort = (sortValues) => {
  const currentTableRows = tableBody.querySelectorAll("tr");
  const tableRowsArray = Array.from(currentTableRows);
  tableRowsArray.shift();

  tableRowsArray
    .sort((a, b) => {
      for (const level in sortValues) {
        if (
          Object.hasOwnProperty.call(sortValues, level) &&
          sortValues[level] !== null
        ) {
          let reduction = sortValues[level][0] == "-";
          const currentSortValue = reduction
            ? +sortValues[level].slice(1)
            : +sortValues[level];

          let colA = a.children[currentSortValue].innerText;
          let colB = b.children[currentSortValue].innerText;

          colA = NUMERIC_COLS.includes(currentSortValue)
            ? +colA
            : colA.toLowerCase().trim();
          colB = NUMERIC_COLS.includes(currentSortValue)
            ? +colB
            : colB.toLowerCase().trim();

          if (colA < colB) return reduction ? 1 : -1;
          if (colA > colB) return reduction ? -1 : 1;
        }
      }

      return 0;
    })
    .forEach((sortedRow) => tableBody.appendChild(sortedRow));
};

sortForm
  .querySelector("input[type='submit']")
  .addEventListener("click", (e) => {
    e.preventDefault();
    tableSort(getSortValues());
  });
