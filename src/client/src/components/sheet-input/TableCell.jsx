import React from "react";

function TableCell({ value, onChange, onBlur, name, error, placeholder }) {
	return (
		<td>
			<input
				type="text"
				name={name}
				className="rounded-md m-2 py-1 text-center"
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				placeholder={placeholder}
			/>
			{error && <div className="text-red-500">{error}</div>}
		</td>
	);
}

export default TableCell;
