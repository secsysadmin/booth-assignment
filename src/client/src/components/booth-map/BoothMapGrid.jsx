import React, { useState } from "react";
import { useBoothMap } from "../../context/BoothMapContext";

const BoothMapGrid = () => {
	const { boothMap, toggleBooth } = useBoothMap();

	return (
		<div className="flex flex-col p-5 mt-3">
			{/* Top Booths */}
			<div className="flex flex-col items-center">
				{boothMap.grid.topBooths.map((row, r) => (
					<div key={`top-row-${r}`} className="flex justify-center">
						{row.map((booth, c) => (
							<button
								key={`top-${r}-${c}`}
								className={`w-7 h-7 border rounded-md font-bold flex items-center justify-center transition-all ease-in-out duration-300
									${
										booth.disabled
											? "bg-[#e74c3c] border-[#b04f44] shadow-[0px_0px_5px_rgba(255,_0,_0,_0.6)] hover:border-[#0056b3]"
											: "bg-[#007bff] border-[#0056b3] shadow-[0px_0px_5px_rgba(0,_123,_255,_0.6)] hover:border-[#b04f44]"
									}
                  ${!(c & 1) && c != boothMap.cols - 1 ? "mr-[25px]" : ""}
									hover:shadow-lg hover:scale-105`}
								onClick={() => toggleBooth(r, c, "topBooths")}
							>
								{booth.number}
							</button>
						))}
					</div>
				))}
			</div>

			{/* Column Labels */}
			<div className="flex justify-center items-center mt-4 mb-4">
				{boothMap.grid.columnLetters.map((label, c) => (
					<button
						key={`label-${c}`}
						className={`w-7 h-7 border rounded-md bg-gray-300 border-gray-400 text-black flex items-center justify-center font-bold hover:bg-gray-400 hover:shadow-lg hover:scale-105] ${
							!(c & 1) && c != boothMap.cols - 1 ? "mr-[25px]" : ""
						}`}
					>
						{label}
					</button>
				))}
			</div>

			{/* Bottom Booths */}
			<div className="flex flex-col items-center">
				{boothMap.grid.bottomBooths.map((row, r) => (
					<div key={`top-row-${r}`} className="flex justify-center">
						{row.map((booth, c) => (
							<button
								key={`top-${r}-${c}`}
								className={`w-7 h-7 border rounded-md font-bold flex items-center justify-center transition-all ease-in-out duration-300
									${
										booth.disabled
											? "bg-[#e74c3c] border-[#b04f44] shadow-[0px_0px_5px_rgba(255,_0,_0,_0.6)] hover:border-[#0056b3]"
											: "bg-[#007bff] border-[#0056b3] shadow-[0px_0px_5px_rgba(0,_123,_255,_0.6)] hover:border-[#b04f44]"
									}
                  ${!(c & 1) && c != boothMap.cols - 1 ? "mr-[25px]" : ""}
									hover:shadow-lg hover:scale-105`}
								onClick={() => toggleBooth(r, c, "bottomBooths")}
							>
								{booth.number}
							</button>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default BoothMapGrid;
