/* An empty string for errorMessage indicates no error */

const extractSpreadsheetId = (url) => {
  if (url === "") {
    return process.env.REACT_APP_DEFAULT_OUTPUT_SHEET_ID || null;
  }

  const regex = /\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const validateUrl = (value, allowEmpty = false) => {
  const trimmedValue = value.trim();
  if (!trimmedValue && !allowEmpty) {
    return { errorMessage: "This field cannot be empty.", sanitizedValue: null };
  }

  const sheetId = extractSpreadsheetId(trimmedValue);
  if (!sheetId) {
    return { errorMessage: "Invalid Spreadsheet URL.", sanitizedValue: null };
  }

  return { errorMessage: "", sanitizedValue: sheetId };
};


const validateSheetName = (value) => {
  const forbiddenChars = /[/\\?*[\]]/;

  if (value.length > 100) {
    return {
      errorMessage: "Sheet name must be 100 characters or less.",
      sanitizedValue: null,
    };
  }
  if (forbiddenChars.test(value)) {
    return {
      errorMessage: "Sheet name contains invalid characters (/ \\ ? * [ ]).",
      sanitizedValue: null,
    };
  }

  return { errorMessage: "", sanitizedValue: value.trim() };
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
      sanitizedValue: null
    };
  }

  const parseCell = (cell) => {
    const [, column, row] = cell.match(/^([A-Z]+)(\d+)$/) || [];
    return { column, row: parseInt(row, 10) };
  };

  const [start, end] = trimmedValue.split(":");
  const startCell = parseCell(start);
  const endCell = parseCell(end);

  if (!startCell.row || !endCell.row || startCell.row <= 0 || endCell.row <= 0) {
    return {
      errorMessage: "Row numbers must be positive integers.",
      sanitizedValue: null
    };
  }

  if (
    startCell.column > endCell.column ||
    (startCell.column === endCell.column && startCell.row > endCell.row)
  ) {
    return {
      errorMessage: "Range must be forward (e.g., A1:A4, not A4:A1).",
      sanitizedValue: null
    };
  }

  return { errorMessage: "", sanitizedValue: trimmedValue };
};

export const validationMap = {
  preferenceSheetUrl: (value) => validateUrl(value, false),
  outputSheetUrl: (value) => validateUrl(value, true),
  preferenceSheetName: validateSheetName,
  outputSheetName: validateSheetName,
  preferenceSheetRange: validateRange,
  outputSheetRange: validateRange,
};
