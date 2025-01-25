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

// import PriorityQueue from "js-priority-queue";

// export function assignBooths(preferencesSheet, boothMap) {
// 	const result = [["COMPANY", "DAYS REGISTERED", "ASSIGNMENT"]];
// 	countOnes();

// 	// Extract the header row and data rows
// 	const [headerRow, ...dataRows] = preferencesSheet;
// 	const headerMap = headerRow.reduce((map, field, index) => {
// 		map[field.trim()] = index; // Map field name to its index
// 		return map;
// 	}, {});

// 	// Preprocess the booth map
// 	const availableBooths = {
// 		top: preprocessBooths(boothMap.grid.topBooths, boothMap.grid.columnLetters),
// 		bottom: preprocessBooths(
// 			boothMap.grid.bottomBooths,
// 			boothMap.grid.columnLetters
// 		),
// 	};

// 	// Initialize the priority queue
// 	const queue = new PriorityQueue({
// 		comparator: (a, b) => a.priority - b.priority,
// 	});

// 	// Iterate through the preference sheet to populate the queue
// 	dataRows.forEach((entry) => {
// 		const companyName = entry[headerMap["Company Name"]] || "";
// 		const boothCount = parseInt(entry[headerMap["Booths"]] || "0", 10);
// 		const boothAssignment = entry[headerMap["Booth Assignment"]] || "";
// 		const days = {
// 			Wednesday: entry[headerMap["Wednesday"]] || "",
// 			Thursday: entry[headerMap["Thursday"]] || "",
// 			Friday: entry[headerMap["Friday"]] || "",
// 		};

// 		if (
// 			!companyName ||
// 			boothCount <= 0 ||
// 			(!days.Wednesday && !days.Thursday)
// 		) {
// 			return; // Ignore invalid entries
// 		}

// 		const daysRegistered = Object.keys(days)
// 			.filter((day) => days[day] === "registered")
// 			.join(" ");

// 		if (boothAssignment) {
// 			// Pre-assigned booths (Priority 1)
// 			queue.queue({
// 				priority: 1,
// 				action: assignPreassignedBooths,
// 				args: {
// 					companyName,
// 					daysRegistered,
// 					boothAssignment,
// 					boothCount,
// 					availableBooths,
// 					result,
// 				},
// 				type: "pre-assigned",
// 			});
// 		} else if (boothCount > 1) {
// 			// Multi-booth assignments (Priority 2)
// 			queue.queue({
// 				priority: 2,
// 				action: assignMultipleBooths,
// 				args: {
// 					companyName,
// 					daysRegistered,
// 					boothCount,
// 					availableBooths,
// 					result,
// 				},
// 				type: "multi booth",
// 			});
// 		} else {
// 			// Single-booth assignments (Priority 3)
// 			queue.queue({
// 				priority: 3,
// 				action: assignSingleBooth,
// 				args: {
// 					companyName,
// 					daysRegistered,
// 					availableBooths,
// 					result,
// 				},
// 				type: "regular",
// 			});
// 		}
// 	});

// 	// Process the priority queue
// 	while (queue.length > 0) {
// 		const { action, args, type } = queue.dequeue();
// 		console.log(type);
// 		action(args);
// 	}

// 	console.log(availableBooths);
// 	return result;
// }

// // Action: Assign preassigned booths
// function assignPreassignedBooths({
// 	companyName,
// 	daysRegistered,
// 	boothAssignment,
// 	boothCount,
// 	availableBooths,
// 	result,
// }) {
// 	const assignedBooths = boothAssignment
// 		.split(",")
// 		.map((booth) => booth.trim());

// 	if (assignedBooths.length === boothCount) {
// 		const allReserved = assignedBooths.every((boothId) =>
// 			reserveBooth(availableBooths, boothId)
// 		);
// 		if (allReserved) {
// 			result.push([companyName, daysRegistered, assignedBooths.join(", ")]);
// 		} else {
// 			console.warn(
// 				`Failed to reserve all booths for ${companyName}: ${boothAssignment}`
// 			);
// 		}
// 	} else {
// 		console.warn(
// 			`Mismatch in booth count for ${companyName}. Expected ${boothCount}, got ${assignedBooths.length}.`
// 		);
// 	}
// }

// // Action: Assign multiple booths
// function assignMultipleBooths({
// 	companyName,
// 	daysRegistered,
// 	boothCount,
// 	availableBooths,
// 	result,
// }) {
// 	const assignedBooths = assignAdjacentBooths(availableBooths, boothCount);
// 	if (assignedBooths.length > 0) {
// 		result.push([companyName, daysRegistered, assignedBooths.join(", ")]);
// 	} else {
// 		console.warn(
// 			`Failed to assign ${boothCount} adjacent booths for ${companyName}.`
// 		);
// 	}
// }

// // Action: Assign a single booth
// function assignSingleBooth({
// 	companyName,
// 	daysRegistered,
// 	availableBooths,
// 	result,
// }) {
// 	const assignedBooth = assignSingleBoothFromAvailable(availableBooths);
// 	if (assignedBooth) {
// 		result.push([companyName, daysRegistered, assignedBooth]);
// 	} else {
// 		console.warn(`Failed to assign a booth for ${companyName}.`);
// 	}
// }

// // Utility: Preprocess booth map into a usable format
// function preprocessBooths(boothRows, columnLetters, offset = 0) {
// 	return boothRows.map((row) =>
// 		row.map((booth, colIndex) => ({
// 			id: `${columnLetters[colIndex]}${booth.number}`,
// 			disabled: booth.disabled,
// 		}))
// 	);
// }

// // Utility: Assign a single booth from available booths
// function assignSingleBoothFromAvailable(availableBooths) {
// 	for (const section of ["top", "bottom"]) {
// 		for (const row of availableBooths[section]) {
// 			const boothIndex = row.findIndex((booth) => !booth.disabled);
// 			if (boothIndex !== -1) {
// 				return row.splice(boothIndex, 1)[0].id; // Remove and return the booth ID
// 			}
// 		}
// 	}
// 	return null; // No booth available
// }

// // Utility: Reserve a specific booth by ID
// function reserveBooth(availableBooths, boothId) {
// 	for (const section of ["top", "bottom"]) {
// 		for (const row of availableBooths[section]) {
// 			const boothIndex = row.findIndex(
// 				(booth) => booth.id === boothId && !booth.disabled
// 			);
// 			if (boothIndex !== -1) {
// 				row.splice(boothIndex, 1); // Remove reserved booth
// 				return true;
// 			}
// 		}
// 	}
// 	return false;
// }

// // Utility: Assign adjacent booths
// function assignAdjacentBooths(availableBooths, boothCount) {
// 	const assigned = [];

// 	for (const section of ["top", "bottom"]) {
// 		for (const row of availableBooths[section]) {
// 			let consecutive = 0;
// 			let startIndex = -1;

// 			for (let i = 0; i < row.length; i++) {
// 				if (!row[i].disabled) {
// 					consecutive++;
// 					if (startIndex === -1) startIndex = i;
// 					if (consecutive === boothCount) {
// 						assigned.push(
// 							...row.splice(startIndex, boothCount).map((booth) => booth.id)
// 						);
// 						return assigned;
// 					}
// 				} else {
// 					consecutive = 0;
// 					startIndex = -1;
// 				}
// 			}
// 		}
// 	}

// 	return assigned;
// }

// export default assignBooths;

/*



BoothMap class
  getBooth(boothId) -> Booth object


Maintain columns as lists of adjacent








[ [A1, A2, A3], [A4], [A5, A6, A7] ]
[ [A8, A9], [A10, A11, A12], []]



*/

import PriorityQueue from "js-priority-queue";

class Company {
	constructor(entry, headerMap) {
		this.companyName = entry[headerMap["Company Name"]] || "";
		if (!this.companyName) throw new Error("Company Name cannot be blank.");

		this.boothCount = parseInt(entry[headerMap["Booths"]] || "0", 10);
		this.boothAssignment = entry[headerMap["Booth Assignment"]] || "";
		// check if pre assigned number of booths matches booth count

		this.days = {
			Wednesday: entry[headerMap["Wednesday"]] || "",
			Thursday: entry[headerMap["Thursday"]] || "",
		};
		this.command = entry[headerMap["Command"]] || "";
		this.target = entry[headerMap["Target"]] || "";

		// check if wed and thurs both not present but command, target, or assignment are
		// check that command is a valid command
		// check that target is the correct syntax based on the command

		this.assignedBooths = [];
	}

	// Method to add assigned booths
	assignBooths(booths) {
		this.assignedBooths = booths;
	}

	// Method to check if the company is registered for a specific day
	isRegisteredForDay(day) {
		return this.days[day] != "";
	}
}

class Booth {
	constructor(section, number, disabled) {
		this.section = section;
		this.number = number;
		this.id = `${section}${number}`;
		this.isAvailable = {
			Wednesday: !disabled,
			Thursday: !disabled,
		};
	}

	isAvailableForDay(day) {
		return this.isAvailable[day];
	}

	assignForDay(day) {
		this.isAvailable[day] = false;
	}
}

class BoothMap {
	constructor(boothMapSchema) {
		this.boothMap = Array.from(
			{ length: boothMapSchema.cols / 2 + 1 },
			(_, c) => {
				if (c === 0 || c === boothMapSchema.cols / 2) {
					return [[], []];
				}

				return [[], [], [], []];
			}
		);
		this.schemaRows = boothMapSchema.rows;
		this.schemaCols = boothMapSchema.cols;

		this.processBoothMap(boothMapSchema);
	}

	processBoothMap(boothMapSchema) {
		const addBooth = (booth, index, first, second) => {
			const letter = boothMapSchema.grid.columnLetters[index];
			console.log(`${letter}: ${letter.charCodeAt(0) - "A".charCodeAt(0)}`);
			const which =
				booth.number <= boothMapSchema.rows ||
				index === 0 ||
				index === boothMapSchema.cols - 1
					? first
					: second;

			this.boothMap[letter.charCodeAt(0) - "A".charCodeAt(0)][which].push(
				new Booth(letter, booth.number, booth.disabled)
			);
		};

		boothMapSchema.grid.bottomBooths.forEach((row) => {
			row.forEach((booth, index) => {
				addBooth(booth, index, 0, 3);
			});
		});

		this.boothMap.forEach((col) => {
			col[0].reverse();
		});

		boothMapSchema.grid.topBooths.forEach((row) => {
			row.forEach((booth, index) => {
				addBooth(booth, index, 1, 2);
			});
		});

		this.boothMap.forEach((col) => {
			col[1].reverse();
		});
	}

	isBoothAvailableForDay(boothId, day) {
		const { section, number } = parseBoothId(boothId);
		const booth = getBooth(section, number);

		// const booth = this.boothMap[columnIndex][boothIndex];
		return booth.isAvailableForDay(day);
	}

	assignBoothForDay(columnIndex, boothIndex, day) {
		const booth = this.boothMap[columnIndex][boothIndex];
		booth.assignForDay(day);
	}

	displayBoothMap() {
		console.log(JSON.stringify(this.boothMap, null, 2));
	}

	parseBoothId(boothId) {
		return boothId.match(/[A-Za-z]+|[0-9]+/g);
	}

	getBooth(section, number) {
		const helper = (section, subsection, index) => {
			return this.boothMap[section][subsection][index];
		};

		if (number < this.schemaRows) {
			if (number <= Math.floor(this.schemaRows))
				return helper(section, 0, number - 1);
			return helper(section, 1, number - Math.floor(this.schemaRows) - 1);
		} else {
		}
	}
}

class SheetCompiler {
	constructor(preferencesSheet) {
		const [headerRow, ...dataRows] = preferencesSheet;
		this.headerMap = headerRow.reduce((map, field, index) => {
			map[field.trim()] = index;
			return map;
		}, {});

		this.companyMap = {};
		this.queue = new PriorityQueue({
			/* How can we get more specific ? */
			comparator: (a, b) => a.priority - b.priority,
		});

		this.compile();
	}

	compile() {
		dataRows.forEach((entry, index) => {
			try {
				const company = new Company(entry, this.headerMap);
				this.companyMap[company.companyName] = company;

				const request = new CompanyRequest(entry, this.headerMap);
				if (!request.isValid()) return;

				/* How should we insert into the queue */
				if (company.boothAssignment) {
					this.queueRequest(1);
				} else if (company.command && request.target) {
					this.queueRequest(2);
				} else if (company.boothCount > 1) {
					this.queueRequest(3);
				} else {
					this.queueRequest(4);
				}
			} catch (err) {
				console.error(`ERROR: Line ${index + 1}: ${err}`);
			}
		});
	}
}

// class BoothMap {
// 	constructor(boothMap) {
// 		this.rows = boothMap.rows;
// 		this.cols = boothMap.cols;
// 		this.columnLetters = boothMap.grid.columnLetters;
// 		this.availableBooths = {
// 			top: this.preprocessBooths(
// 				boothMap.grid.topBooths,
// 				boothMap.grid.columnLetters
// 			),
// 			bottom: this.preprocessBooths(
// 				boothMap.grid.bottomBooths,
// 				boothMap.grid.columnLetters
// 			),
// 		};
// 	}

// 	getBooth(boothId) {
// 		const [letter, number] = boothId.match(/[A-Za-z]+|[0-9]+/g);

// 		let col = this.columnLetters.indexOf(letter);
// 		if (number <= this.rows && !(col !== 0 || col !== this.cols + 1)) col += 1;

// const bottomRows = this.availableBooths.bottom.length;

// const section =
// 	number <= bottomRows || number > this.rows * 2 - bottomRows
// 		? "bottom"
// 		: "top";

// let row = 0;
// if (section === "top") {
// 	row = number > this.rows ? number - this.rows - 1 : this.rows - number;
// } else {
// 	row =
// 		number > this.rows
// 			? bottomRows - (this.rows * 2 - number)
// 			: bottomRows - number;
// }

// 		return this.availableBooths[section][row][col];
// 	}

// 	preprocessBooths(boothRows, columnLetters) {
// 		return boothRows.map((row) =>
// 			row.map((booth, colIndex) => ({
// 				id: `${columnLetters[colIndex]}${booth.number}`,
// 				disabled: booth.disabled,
// 			}))
// 		);
// 	}

// 	reserveBooth(location) {
// 		const isRange = location.includes("-");
// 		if (isRange) {
// 			const [start, end] = location.split("-").map((booth) => booth.trim());
// 			const startNumber = parseInt(start.match(/\d+/)[0], 10);
// 			const endNumber = parseInt(end.match(/\d+/)[0], 10);
// 			const letter = start.match(/[A-Z]/)[0];

// 			for (let i = startNumber; i <= endNumber; ++i) {
// 				const boothId = this.reserveBooth(`${letter}${i}`);
// 				if (boothId) return boothId;
// 			}
// 			return null;
// 		}

// 		const [letter, number] = location.match(/[A-Za-z]+|[0-9]+/g);

// 		let col = this.columnLetters.indexOf(letter);
// 		if (number <= this.rows && !(col !== 0 || col !== this.cols + 1)) col += 1;

// 		const bottomRows = this.availableBooths.bottom.length;

// 		const section =
// 			number <= bottomRows || number > this.rows * 2 - bottomRows
// 				? "bottom"
// 				: "top";

// 		let row = 0;
// 		if (section === "top") {
// 			row = number > this.rows ? number - this.rows - 1 : this.rows - number;
// 		} else {
// 			row =
// 				number > this.rows
// 					? bottomRows - (this.rows * 2 - number)
// 					: bottomRows - number;
// 		}

// 		/* FIXME: Disable the booth here? How to track back? */
// 		if (!this.availableBooths[section][row][col].disabled) {
// 			this.availableBooths[section][row][col].disabled = true;
// 			console.log(`reserved ${location}`);
// 			return location;
// 		}

// 		// console.log(
// 		// 	`${location}: booth is disabled: ${JSON.stringify(
// 		// 		this.availableBooths[section][row][col]
// 		// 	)}`
// 		// );

// 		return null;
// 	}

// 	assignAdjacentBooths(boothCount) {
// 		const assigned = [];
// 		for (const section of ["top", "bottom"]) {
// 			for (const row of this.availableBooths[section]) {
// 				let consecutive = 0;
// 				let startIndex = -1;

// 				for (let i = 0; i < row.length; i++) {
// 					if (!row[i].disabled) {
// 						consecutive++;
// 						if (startIndex === -1) startIndex = i;
// 						if (consecutive === boothCount) {
// 							assigned.push(
// 								...row.splice(startIndex, boothCount).map((booth) => booth.id)
// 							);
// 							return assigned;
// 						}
// 					} else {
// 						consecutive = 0;
// 						startIndex = -1;
// 					}
// 				}
// 			}
// 		}
// 		return assigned;
// 	}

// 	assignSingleBooth() {
// 		for (const section of ["top", "bottom"]) {
// 			for (const row of this.availableBooths[section]) {
// 				const boothIndex = row.findIndex((booth) => !booth.disabled);
// 				if (boothIndex !== -1) {
// 					return row.splice(boothIndex, 1)[0].id; // Remove and return the booth ID
// 				}
// 			}
// 		}
// 		return null;
// 	}
// }

class CompanyRequest {
	constructor(entry, headerMap) {
		this.companyName = entry[headerMap["Company Name"]] || "";
		this.boothCount = parseInt(entry[headerMap["Booths"]] || "0", 10);
		this.boothAssignment = entry[headerMap["Booth Assignment"]] || "";
		this.days = {
			Wednesday: entry[headerMap["Wednesday"]] || "",
			Thursday: entry[headerMap["Thursday"]] || "",
			Friday: entry[headerMap["Friday"]] || "",
		};
		this.command = entry[headerMap["Command"]] || "";
		this.target = entry[headerMap["Target"]] || "";
	}

	get daysRegistered() {
		return Object.keys(this.days)
			.filter((day) => this.days[day] === "registered")
			.join(" ");
	}

	isValid() {
		return (
			this.companyName &&
			this.boothCount > 0 &&
			(this.days.Wednesday || this.days.Thursday)
		);
	}
}

class BoothAssignmentProcessor {
	constructor(boothMap) {
		this.boothMap = BoothMap(boothMap);
		this.queue = new PriorityQueue({
			comparator: (a, b) => a.priority - b.priority,
		});

		this.result = [["COMPANY", "DAYS REGISTERED", "ASSIGNMENT"]];
	}

	createRequest(company) {
		if (company.boothAssignment) {
			this.queueRequest(1, this.assignPreassignedBooths, company);
		} else if (company.command && company.target) {
			this.queueRequest(2, this.handleCommand, company);
		} else if (company.boothCount > 1) {
			this.queueRequest(3, this.assignMultipleBooths, company);
		} else {
			this.queueRequest(4, this.assignSingleBooth, company);
		}
	}

	assignPreassignedBooths(company) {
		const assignments = company.boothAssignment.split(",");
		let assigned = true;
		for (const booth of booths) {
			const reservation = boothMap.reserveBooth(booth.trim());
			if (!reservation) assigned = false;
			console.log(`${booth}: ${reservation}`);
		}
		// const assigned = request.boothAssignment
		// 	.split(",")
		// 	.map((booth) => booth.trim())
		// 	.every((boothId) => boothMap.reserveBooth(boothId));

		// console.log(assigned);
		if (assigned) {
			result.push([
				request.companyName,
				request.daysRegistered,
				request.boothAssignment,
			]);
		} else {
			console.warn(
				`Failed to reserve pre-assigned booths for ${request.companyName}`
			);
		}
	}
	handleCommand(company) {}

	processRequests() {
		while (this.queue.length > 0) {
			const { action, args } = this.queue.dequeue();
			action(args);
		}

		return this.result;
	}
}

// Command Handlers
function commandHandler({ request, boothMap, result }) {
	if (request.command === "Range") {
		const ranges = request.target.split(",").map((range) => range.trim());
		for (const range of ranges) {
			const reservation = boothMap.reserveBooth(range);
			if (reservation) {
				result.push([request.companyName, request.daysRegistered, reservation]);
				return;
			}
		}
		console.warn(
			`Failed to assign ${request.companyName} within ${request.target}`
		);
	} else if (request.command === "Adjacent") {
		console.warn("Not implemented");
		// const adjacentBooths = boothMap.assignAdjacentBooths(request.boothCount);
		// if (adjacentBooths.length > 0) {
		// 	result.push([
		// 		request.companyName,
		// 		request.daysRegistered,
		// 		adjacentBooths.join(", "),
		// 	]);
		// } else {
		// 	console.warn(
		// 		`Failed to assign adjacent booths for ${request.companyName}`
		// 	);
		// }
	}
}

// Actions
function assignPreassignedBooths({ request, boothMap, result }) {
	const booths = request.boothAssignment.split(",");
	let assigned = true;
	for (const booth of booths) {
		const reservation = boothMap.reserveBooth(booth.trim());
		if (!reservation) assigned = false;
		console.log(`${booth}: ${reservation}`);
	}
	// const assigned = request.boothAssignment
	// 	.split(",")
	// 	.map((booth) => booth.trim())
	// 	.every((boothId) => boothMap.reserveBooth(boothId));

	// console.log(assigned);
	if (assigned) {
		result.push([
			request.companyName,
			request.daysRegistered,
			request.boothAssignment,
		]);
	} else {
		console.warn(
			`Failed to reserve pre-assigned booths for ${request.companyName}`
		);
	}
}

function assignMultipleBooths({ request, boothMap, result }) {
	const assigned = boothMap.assignAdjacentBooths(request.boothCount);
	if (assigned.length > 0) {
		result.push([
			request.companyName,
			request.daysRegistered,
			assigned.join(", "),
		]);
	} else {
		console.warn(`Failed to assign multiple booths for ${request.companyName}`);
	}
}

function assignSingleBooth({ request, boothMap, result }) {
	const assigned = boothMap.assignSingleBooth();
	if (assigned) {
		result.push([request.companyName, request.daysRegistered, assigned]);
	} else {
		console.warn(`Failed to assign a booth for ${request.companyName}`);
	}
}

export function assignBooths(preferencesSheet, boothMap) {
	const map = new BoothMap(boothMap);
	console.log(map.boothMap);

	return [];

	// console.log(`C16: ${map.reserveBooth("C16")}`);
	const processor = new BoothAssignmentProcessor(preferencesSheet, map);
	return processor.processRequests();
}
