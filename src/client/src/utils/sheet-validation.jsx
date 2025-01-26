/* An empty string for errorMessage indicates no error */

const extractSpreadsheetId = (url, sheet) => {
	// Blank value allowed for spreadsheets -> default to below
	if (url === "") {
		url =
			sheet === "preference"
				? import.meta.env.VITE_DEFAULT_PREFERENCE_SHEET_URL
				: sheet === "output"
				? import.meta.env.VITE_DEFAULT_OUTPUT_SHEET_URL
				: null;
	}

	const regex = /\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/;
	const match = url.match(regex);
	return match ? match[1] : null;
};

const validateUrl = (value, sheet) => {
	const trimmedValue = value.trim();

	const sheetId = extractSpreadsheetId(trimmedValue, sheet);
	if (!sheetId) {
		return {
			errorMessage: "Invalid Spreadsheet URL.",
			sanitizedValue: null,
		};
	}

	return { errorMessage: "", sanitizedValue: sheetId };
};

const validateSheetName = (value, sheet) => {
	let trimmedValue = value.trim();
	const forbiddenChars = /[/\\?*[\]]/;

	if (!trimmedValue) {
		trimmedValue =
			sheet === "preference"
				? "Company Preferences"
				: sheet === "output"
				? "Booth Assignments"
				: null;
	}

	if (trimmedValue.length > 100) {
		return {
			errorMessage: "Sheet name must be 100 characters or less.",
			sanitizedValue: null,
		};
	} else if (forbiddenChars.test(trimmedValue)) {
		return {
			errorMessage: "Sheet name contains invalid characters (/ \\ ? * [ ]).",
			sanitizedValue: null,
		};
	}

	return {
		errorMessage: "",
		// Blank value allowed for output sheet -> default to "Booth Assignments"
		sanitizedValue: trimmedValue,
	};
};

const validateRange = (value) => {
	const trimmedValue = value.trim();

	// Allow empty input (entire sheet)
	if (trimmedValue === "")
		return { errorMessage: "", sanitizedValue: trimmedValue };

	const rangeRegex = /^[A-Z]+\d+:[A-Z]+\d+$/;
	if (!rangeRegex.test(trimmedValue)) {
		return {
			errorMessage: 'Invalid range format. Example: "A1:C10"',
			sanitizedValue: null,
		};
	}

	const parseCell = (cell) => {
		const [, column, row] = cell.match(/^([A-Z]+)(\d+)$/) || [];
		return { column, row: parseInt(row, 10) };
	};

	const [start, end] = trimmedValue.split(":");
	const startCell = parseCell(start);
	const endCell = parseCell(end);

	if (
		!startCell.row ||
		!endCell.row ||
		startCell.row <= 0 ||
		endCell.row <= 0
	) {
		return {
			errorMessage: "Row numbers must be positive integers.",
			sanitizedValue: null,
		};
	}

	if (
		startCell.column > endCell.column ||
		(startCell.column === endCell.column && startCell.row > endCell.row)
	) {
		return {
			errorMessage: "Range must be forward (e.g., A1:A4, not A4:A1).",
			sanitizedValue: null,
		};
	}

	return { errorMessage: "", sanitizedValue: trimmedValue };
};

const validationMap = {
	preferenceSheetUrl: (value) => validateUrl(value, "preference"),
	outputSheetUrl: (value) => validateUrl(value, "output"),
	preferenceSheetName: (value) => validateSheetName(value, "preference"),
	outputSheetName: (value) => validateSheetName(value, "output"),
	preferenceSheetRange: validateRange,
	outputSheetRange: validateRange,
};

export const validateSyntax = (inputs, setErrors, addLog) => {
	addLog("info", "Beginning sheet input syntax validation", true);

	const newErrors = {};
	const sanitizedInputs = {};

	Object.keys(inputs).forEach((field) => {
		if (validationMap[field]) {
			const { errorMessage, sanitizedValue } = validationMap[field](
				inputs[field]
			);
			if (errorMessage) {
				newErrors[field] = errorMessage || "";
			} else {
				sanitizedInputs[field.replace("Url", "Id")] = sanitizedValue || null;
			}
		}
	});

	if (Object.keys(newErrors).length !== 0) {
		setErrors(newErrors);
		return null;
	}

	addLog("info", "Sheet input syntactically correct", true);
	return sanitizedInputs;
};
