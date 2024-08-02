import React, { useState } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [inputPage, setInputPage] = useState<number | string>("");
  const [showInput1, setShowInput1] = useState<boolean>(false);
  const [showInput2, setShowInput2] = useState<boolean>(false);

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
      setShowInput1(false);
      setShowInput2(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPage(event.target.value);
  };

  const handleInputSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const page = Number(inputPage);
    if (page > 0 && page <= totalPages) {
      handlePageClick(page);
      setInputPage("");
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(2, currentPage - 2);
    const endPage = Math.min(totalPages - 1, currentPage + 2);

    for (let page = startPage; page <= endPage; page++) {
      pages.push(
        <li key={page} className={page === currentPage ? "active" : ""}>
          <a onClick={() => handlePageClick(page)}>{page}</a>
        </li>
      );
    }

    return pages;
  };

  return (
    <nav aria-label="Page navigation" className="pagination-parent">
      <ul className="pagination">
        <li className={`previous ${currentPage === 1 ? "disabled" : ""}`}>
          <a
            onClick={() => currentPage > 1 && handlePageClick(currentPage - 1)}
          >
            <i className="fas fa-angle-left" />
          </a>
        </li>
        <div>
          <li className={currentPage === 1 ? "active" : ""}>
            <a onClick={() => handlePageClick(1)}>1</a>
          </li>

          {showInput1 || currentPage > 4 ? (
            <li key="input1">
              <form
                style={{ display: showInput1 ? "block" : "none" }}
                onSubmit={handleInputSubmit}
              >
                <input
                  className="form-control pagination-input"
                  type="number"
                  placeholder="Page"
                  value={inputPage}
                  onChange={handleInputChange}
                  style={{
                    width: "50px",
                    height: "24px",
                    borderRadius: "6px",
                    padding: "5px",
                  }}
                />
              </form>
              <a
                style={{ display: showInput1 ? "none" : "flex" }}
                onClick={() => setShowInput1(!showInput1)}
              >
                ...
              </a>
            </li>
          ) : null}

          {renderPageNumbers()}

          {showInput2 || currentPage < totalPages - 3 ? (
            <li key="input2">
              <form
                style={{ display: showInput2 ? "block" : "none" }}
                onSubmit={handleInputSubmit}
              >
                <input
                  className="form-control pagination-input"
                  type="number"
                  placeholder="Page"
                  value={inputPage}
                  onChange={handleInputChange}
                  style={{
                    width: "50px",
                    height: "24px",
                    borderRadius: "6px",
                    padding: "5px",
                  }}
                />
              </form>
              <a
                style={{ display: showInput2 ? "none" : "flex" }}
                onClick={() => setShowInput2(!showInput2)}
              >
                ...
              </a>
            </li>
          ) : null}

          <li className={currentPage === totalPages ? "active" : ""}>
            <a onClick={() => handlePageClick(totalPages)}>{totalPages}</a>
          </li>
        </div>
        <li className={`next ${currentPage === totalPages ? "disabled" : ""}`}>
          <a
            onClick={() =>
              currentPage < totalPages && handlePageClick(currentPage + 1)
            }
          >
            <i className="fas fa-angle-right" />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
