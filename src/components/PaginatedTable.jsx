import React, { useState } from "react";

const PaginatedTable = ({ data, rowsPerPage, paginate, tableHeaders }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const currentData = paginate
    ? data.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage)
    : data;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  tableHeaders = tableHeaders ?? Object.keys(data[0]);

  let buttons = [];
  for (let i = 0; i < totalPages; i++) {
    buttons.push(
      <button
        key={i}
        onClick={() => handlePageChange(i)}
        className={currentPage == i ? "selected" : ""}
      >
        {i + 1}
      </button>
    );
  }

  return (
    <div className="tableContainer">
      <table>
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, itemIndex) => (
            <tr key={itemIndex}>
              {Object.values(item).map((value, valueIndex) => (
                <td key={valueIndex}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {paginate && <div className="pagination">{buttons}</div>}
    </div>
  );
};

export default PaginatedTable;
