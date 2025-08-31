import React from "react";

interface Props {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search by name or email..."
      onChange={(e) => onSearch(e.target.value)}
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "16px",
        border: "1px solid #ddd",
        borderRadius: "4px",
      }}
    />
  );
};

export default SearchBar;
