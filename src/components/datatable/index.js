import React, { useMemo, useState } from "react";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";

import Button from "../button/index";

import "./index.css";

const DynamicTable = ({ columns, data, index, inputStyle }) => {
  const [filterInput, setFilterInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);

    useMemo(() => {
      setFilteredData(data);
    }, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns: useMemo(() => columns || [], [columns]),
      data: filteredData,
      initialState: { pageSize: 5, pageIndex: 0 },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
  };

  const handleNextPage = () => {
    nextPage();
  };

  const handlePreviousPage = () => {
    previousPage();
  };

  const handleFilterChange = (e) => {
    const value = e.target.value || "";
    setFilterInput(value);
    const filtered = data?.filter((item) =>
      columns?.some((column) =>
        item[column.accessor]
          ?.toString()
          .toLowerCase()
          .includes(value.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const pageIndexDisplay = () => {
    const displayPageNumbers = [];
    const totalPages = pageOptions.length;
    const currentPage = pageIndex;

    const numDisplayedPages = 5;

    let startPage = Math.max(
      0,
      currentPage - Math.floor(numDisplayedPages / 2)
    );
    let endPage = Math.min(totalPages - 1, startPage + numDisplayedPages - 1);

    if (endPage - startPage + 1 < numDisplayedPages) {
      startPage = Math.max(0, endPage - numDisplayedPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      displayPageNumbers.push(i);
    }

    if (startPage > 0) {
      displayPageNumbers.unshift(-1);
    }

    if (endPage < totalPages - 1) {
      displayPageNumbers.push(-2);
    }

    const handlePageChange = (pageIndex) => {
      if (pageIndex === -1) {
        gotoPage(0);
      } else if (pageIndex === -2) {
        gotoPage(totalPages - 1);
      } else {
        gotoPage(pageIndex);
      }
    };

    return (
      <span className="pagination">
        {displayPageNumbers.map((pageIndex, index) => {
          if (pageIndex === -1 || pageIndex === -2) {
            return (
              <Button
                key={index}
                name="..."
                type="pagination"
                className={"btn-pagination"}
                onClick={() => handlePageChange(pageIndex)}
              />
            );
          } else {
            return (
              <Button
                key={index}
                name={`${pageIndex + 1}`}
                className={
                  pageIndex === currentPage
                    ? "btn-pagination-active"
                    : "btn-pagination"
                }
                onClick={() => handlePageChange(pageIndex)}
                type="pagination"
                isActive={pageIndex === currentPage}
              />
            );
          }
        })}
      </span>
    );
  };

  console.log(inputStyle, "inputStyle");
  return (
    <div>
      <div className="container">
        <div className="rows">
          <h4>Rows per page:</h4>
          <select
            className="select-box"
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <input
          className={inputStyle ? inputStyle : "search-input"}
          value={filterInput}
          onChange={handleFilterChange}
          placeholder="Search..."
        />
      </div>
      <div className="table-box">
        <table {...getTableProps()} className="table" key={index}>
          <thead>
            {headerGroups?.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup?.headers?.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    style={{ width: column.width }}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page && page.length > 0 ? (
              page?.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row?.cells?.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={columns?.length}
                  style={{
                    height: 100,
                    paddingTop: "50px",
                    textAlign: "center",
                    justifyContent: "center",
                  }}
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="baseline">
        <Button
          onClick={handlePreviousPage}
          disabled={!canPreviousPage}
          name="<<"
          type="submit"
        />
        {pageIndexDisplay()}
        <Button
          onClick={handleNextPage}
          disabled={!canNextPage}
          name=">>"
          type="submit"
        />
      </div>
    </div>
  );
};

export default DynamicTable;
