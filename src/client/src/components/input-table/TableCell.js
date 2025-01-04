import React from "react";
import "../../styles/input-table/TableCell.css";

function TableCell({ value, onChange, onBlur, name, error, placeholder }) {
  return (
    <td>
      <input
        type="text"
        name={name}
        className="form-control mb-1"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
      />
      {error && <div className="text-danger">{error}</div>}
    </td>
  );
}

export default TableCell;
