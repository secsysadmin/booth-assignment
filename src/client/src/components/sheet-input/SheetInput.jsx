import React from "react";

// import TableCell from "./TableCell";
import SheetInfo from "./SheetInfo";
import SheetTable from "./SheetTable";

function SheetInput() {
	return (
		<div>
			<header className="text-gray-300 font-bond flex justify-between mb-2">
				<span
					className="text-2xl uppercase tracking-wide"
					style={{ textShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)" }}
				>
					Sheet Input
				</span>
			</header>

			<SheetInfo />
			<SheetTable />
		</div>
	);
}

export default SheetInput;
