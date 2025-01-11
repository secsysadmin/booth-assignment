// // algorithm.jsx

// export function assignBooths(preferencesSheet, boothMap) {
// 	const result = [];

// 	// Parse booth map into a flat list of booth identifiers
// 	const availableBooths = [];
// 	const { topBooths, bottomBooths, columnLetters } = boothMap.grid;

// 	topBooths.forEach((row, rowIndex) => {
// 		row.forEach((booth, colIndex) => {
// 			if (!booth.disabled) {
// 				availableBooths.push(`${columnLetters[colIndex]}${rowIndex + 1}`);
// 			}
// 		});
// 	});

// 	bottomBooths.forEach((row, rowIndex) => {
// 		row.forEach((booth, colIndex) => {
// 			if (!booth.disabled) {
// 				availableBooths.push(
// 					`${columnLetters[colIndex]}${rowIndex + 1 + topBooths.length}`
// 				);
// 			}
// 		});
// 	});

// 	console.log(availableBooths);

// 	// Process preferences sheet
// 	preferencesSheet.forEach((entry) => {
// 		const {
// 			"Company Name": companyName,
// 			Booths: boothCount,
// 			Wednesday,
// 			Thursday,
// 			Friday,
// 			"Booth Assignment": boothAssignment,
// 		} = entry;

// 		if (!companyName || !boothCount || (!Wednesday && !Thursday)) {
// 			// Skip invalid or Friday-only entries
// 			return;
// 		}

// 		const daysRegistered = [
// 			Wednesday ? "Wednesday" : null,
// 			Thursday ? "Thursday" : null,
// 		]
// 			.filter(Boolean)
// 			.join(" ");

// 		if (boothAssignment) {
// 			// Handle pre-assigned booth
// 			const assignedBoothIndex = availableBooths.indexOf(boothAssignment);
// 			if (assignedBoothIndex !== -1) {
// 				result.push({
// 					company: companyName,
// 					daysRegistered,
// 					assignment: boothAssignment,
// 				});
// 				availableBooths.splice(assignedBoothIndex, 1); // Remove assigned booth
// 			}
// 		} else {
// 			// Assign booths dynamically
// 			const assignedBooths = [];
// 			for (let i = 0; i < boothCount; i++) {
// 				if (availableBooths.length > 0) {
// 					const booth = availableBooths.shift(); // Take the next available booth
// 					assignedBooths.push(booth);
// 				}
// 			}

// 			if (assignedBooths.length > 0) {
// 				result.push({
// 					company: companyName,
// 					daysRegistered,
// 					assignment: assignedBooths.join(", "), // Multiple booths if needed
// 				});
// 			}
// 		}
// 	});

// 	console.log(result);

// 	return result;
// }

const countOnes = () => {
	const booths = [
		1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 3, 2, 1, 1, 2, 1, 2, 1, 2, 1, 1, 2,
		1, 1, 1, 1, 2, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 2, 3, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1,
		1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 4, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1,
		1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 2, 1,
	];

	let oneCount = 0;
	let nonOneCount = 0;
	let totalCount = 0;
	booths.forEach((count) => {
		if (count == 1) oneCount += 1;
		else nonOneCount += 1;
		totalCount += count;
	});
	console.log(oneCount);
	console.log(nonOneCount);
	console.log(totalCount);
};

import PriorityQueue from "js-priority-queue";

export function assignBooths(preferencesSheet, boothMap) {
	const result = [["COMPANY", "DAYS REGISTERED", "ASSIGNMENT"]];
	countOnes();

	// Extract the header row and data rows
	const [headerRow, ...dataRows] = preferencesSheet;
	const headerMap = headerRow.reduce((map, field, index) => {
		map[field.trim()] = index; // Map field name to its index
		return map;
	}, {});

	// Preprocess the booth map
	const availableBooths = {
		top: preprocessBooths(boothMap.grid.topBooths, boothMap.grid.columnLetters),
		bottom: preprocessBooths(
			boothMap.grid.bottomBooths,
			boothMap.grid.columnLetters
		),
	};

	// Initialize the priority queue
	const queue = new PriorityQueue({
		comparator: (a, b) => a.priority - b.priority,
	});

	// Iterate through the preference sheet to populate the queue
	dataRows.forEach((entry) => {
		const companyName = entry[headerMap["Company Name"]] || "";
		const boothCount = parseInt(entry[headerMap["Booths"]] || "0", 10);
		const boothAssignment = entry[headerMap["Booth Assignment"]] || "";
		const days = {
			Wednesday: entry[headerMap["Wednesday"]] || "",
			Thursday: entry[headerMap["Thursday"]] || "",
			Friday: entry[headerMap["Friday"]] || "",
		};

		if (
			!companyName ||
			boothCount <= 0 ||
			(!days.Wednesday && !days.Thursday)
		) {
			return; // Ignore invalid entries
		}

		const daysRegistered = Object.keys(days)
			.filter((day) => days[day] === "registered")
			.join(" ");

		if (boothAssignment) {
			// Pre-assigned booths (Priority 1)
			queue.queue({
				priority: 1,
				action: assignPreassignedBooths,
				args: {
					companyName,
					daysRegistered,
					boothAssignment,
					boothCount,
					availableBooths,
					result,
				},
				type: "pre-assigned",
			});
		} else if (boothCount > 1) {
			// Multi-booth assignments (Priority 2)
			queue.queue({
				priority: 2,
				action: assignMultipleBooths,
				args: {
					companyName,
					daysRegistered,
					boothCount,
					availableBooths,
					result,
				},
				type: "multi booth",
			});
		} else {
			// Single-booth assignments (Priority 3)
			queue.queue({
				priority: 3,
				action: assignSingleBooth,
				args: {
					companyName,
					daysRegistered,
					availableBooths,
					result,
				},
				type: "regular",
			});
		}
	});

	// Process the priority queue
	while (queue.length > 0) {
		const { action, args, type } = queue.dequeue();
		console.log(type);
		action(args);
	}

	console.log(availableBooths);
	return result;
}

// Action: Assign preassigned booths
function assignPreassignedBooths({
	companyName,
	daysRegistered,
	boothAssignment,
	boothCount,
	availableBooths,
	result,
}) {
	const assignedBooths = boothAssignment
		.split(",")
		.map((booth) => booth.trim());

	if (assignedBooths.length === boothCount) {
		const allReserved = assignedBooths.every((boothId) =>
			reserveBooth(availableBooths, boothId)
		);
		if (allReserved) {
			result.push([companyName, daysRegistered, assignedBooths.join(", ")]);
		} else {
			console.warn(
				`Failed to reserve all booths for ${companyName}: ${boothAssignment}`
			);
		}
	} else {
		console.warn(
			`Mismatch in booth count for ${companyName}. Expected ${boothCount}, got ${assignedBooths.length}.`
		);
	}
}

// Action: Assign multiple booths
function assignMultipleBooths({
	companyName,
	daysRegistered,
	boothCount,
	availableBooths,
	result,
}) {
	const assignedBooths = assignAdjacentBooths(availableBooths, boothCount);
	if (assignedBooths.length > 0) {
		result.push([companyName, daysRegistered, assignedBooths.join(", ")]);
	} else {
		console.warn(
			`Failed to assign ${boothCount} adjacent booths for ${companyName}.`
		);
	}
}

// Action: Assign a single booth
function assignSingleBooth({
	companyName,
	daysRegistered,
	availableBooths,
	result,
}) {
	const assignedBooth = assignSingleBoothFromAvailable(availableBooths);
	if (assignedBooth) {
		result.push([companyName, daysRegistered, assignedBooth]);
	} else {
		console.warn(`Failed to assign a booth for ${companyName}.`);
	}
}

// Utility: Preprocess booth map into a usable format
function preprocessBooths(boothRows, columnLetters, offset = 0) {
	return boothRows.map((row) =>
		row.map((booth, colIndex) => ({
			id: `${columnLetters[colIndex]}${booth.number}`,
			disabled: booth.disabled,
		}))
	);
}

// Utility: Assign a single booth from available booths
function assignSingleBoothFromAvailable(availableBooths) {
	for (const section of ["top", "bottom"]) {
		for (const row of availableBooths[section]) {
			const boothIndex = row.findIndex((booth) => !booth.disabled);
			if (boothIndex !== -1) {
				return row.splice(boothIndex, 1)[0].id; // Remove and return the booth ID
			}
		}
	}
	return null; // No booth available
}

// Utility: Reserve a specific booth by ID
function reserveBooth(availableBooths, boothId) {
	for (const section of ["top", "bottom"]) {
		for (const row of availableBooths[section]) {
			const boothIndex = row.findIndex(
				(booth) => booth.id === boothId && !booth.disabled
			);
			if (boothIndex !== -1) {
				row.splice(boothIndex, 1); // Remove reserved booth
				return true;
			}
		}
	}
	return false;
}

// Utility: Assign adjacent booths
function assignAdjacentBooths(availableBooths, boothCount) {
	const assigned = [];

	for (const section of ["top", "bottom"]) {
		for (const row of availableBooths[section]) {
			let consecutive = 0;
			let startIndex = -1;

			for (let i = 0; i < row.length; i++) {
				if (!row[i].disabled) {
					consecutive++;
					if (startIndex === -1) startIndex = i;
					if (consecutive === boothCount) {
						assigned.push(
							...row.splice(startIndex, boothCount).map((booth) => booth.id)
						);
						return assigned;
					}
				} else {
					consecutive = 0;
					startIndex = -1;
				}
			}
		}
	}

	return assigned;
}

export default assignBooths;
