import React, { createContext, useState, useContext, useEffect } from "react";

const BoothMapContext = createContext();

function generateBoothMap(rows, cols) {
	const columnLetters = Array.from({ length: cols })
		.map((_, i) => {
			if (i === 0 || i === cols - 1)
				return String.fromCharCode(65 + Math.ceil(i / 2));
			return String.fromCharCode(65 + Math.floor((i - 1) / 2) + 1);
		})
		.reverse();

	const topRows = Math.ceil(rows / 2);
	const bottomRows = Math.floor(rows / 2);

	const topBooths = Array.from({ length: topRows }, (_, r) =>
		Array.from({ length: cols }, (__, c) => ({
			disabled: false,
			number: !(c & 1) || c === cols - 1 ? rows - r : rows + r + 1,
		}))
	);

	const bottomBooths = Array.from({ length: bottomRows }, (_, r) =>
		Array.from({ length: cols }, (__, c) => ({
			disabled: false,
			number:
				!(c & 1) || c === cols - 1 ? bottomRows - r : rows + topRows + r + 1,
		}))
	);

	return { columnLetters, topBooths, bottomBooths };
}

export const BoothMapProvider = ({ children }) => {
	const [boothMap, setBoothMap] = useState({
		grid: {
			topBooths: [],
			bottomBooths: [],
			columnLetters: [],
		},
		rows: 15,
		cols: 32,
	});

	/* Generates a booth map using the current map's dimensions. For internal use only */
	const regenerateBoothMap = () => {
		const grid = generateBoothMap(boothMap.rows, boothMap.cols);
		setBoothMap((prev) => ({
			...prev,
			grid,
		}));
	};

	useEffect(() => {
		regenerateBoothMap();
	}, []);

	const toggleBooth = (row, col, section) => {
		setBoothMap((prevMap) => {
			const updatedSection = prevMap.grid[section].map((r, rIndex) =>
				r.map((booth, cIndex) =>
					rIndex === row && cIndex === col
						? { ...booth, disabled: !booth.disabled }
						: booth
				)
			);

			return {
				...prevMap,
				grid: {
					...prevMap.grid,
					[section]: updatedSection,
				},
			};
		});
	};

	const resetBoothMap = () => {
		regenerateBoothMap();
	};

	const adjustRows = (delta) => {
		setBoothMap((prevState) => ({
			...prevState,
			rows: prevState.rows + delta,
		}));
	};

	const adjustColumns = (delta) => {
		setBoothMap((prevState) => ({
			...prevState,
			cols: prevState.cols + delta,
		}));
	};

	return (
		<BoothMapContext.Provider
			value={{
				boothMap,
				setBoothMap,
				toggleBooth,
				resetBoothMap,
				generateBoothMap,
			}}
		>
			{children}
		</BoothMapContext.Provider>
	);
};

export const useBoothMap = () => useContext(BoothMapContext);
