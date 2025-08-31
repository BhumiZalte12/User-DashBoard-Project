import React from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          style={{
            margin: "0 4px",
            padding: "6px 12px",
            border: "1px solid #ddd",
            background: currentPage === i + 1 ? "#0070f3" : "#fff",
            color: currentPage === i + 1 ? "#fff" : "#000",
            cursor: "pointer",
          }}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
