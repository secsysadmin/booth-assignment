/* An empty string indicates no error */

export const extractSpreadsheetId = (url) => {
  if (url === "") {
    return process.env.REACT_APP_DEFAULT_OUTPUT_SHEET_ID;
  }

  const regex = /\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const validateUrl = (value, allowEmpty = false) => {
  value = value.trim();
  if (!value && !allowEmpty) return "This field cannot be empty.";

  const sheetId = extractSpreadsheetId(value);
  if (!sheetId)
    return "Invalid Spreadsheet URL.";

  return "";
};

const validateSheetName = (value) => {
  const forbiddenChars = /[/\\?*[\]]/;

  if (value.length > 100)
    return "Sheet name must be 100 characters or less.";
  if (forbiddenChars.test(value))
    return "Sheet name contains invalid characters (/ \\ ? * [ ]).";

  return "";
};


const validateRange = (value) => {
  value = value.trim();
  /* No range input -> use the entire sheet */
  if (value === "") return "";

  const rangeRegex = /^[A-Z]+\d+:[A-Z]+\d+$/;
  if (!rangeRegex.test(value)) {
    return 'Invalid range format. Example: "A1:C10"';
  }

  const [start, end] = value.split(":");
  const parseCell = (cell) => {
    const match = cell.match(/^([A-Z]+)(\d+)$/);
    return { column: match[1], row: parseInt(match[2], 10) };
  };

  const startCell = parseCell(start);
  const endCell = parseCell(end);

  if (startCell.row <= 0 || endCell.row <= 0) {
    return "Row numbers must be positive integers.";
  }

  if (
    startCell.column > endCell.column ||
    (startCell.column === endCell.column && startCell.row > endCell.row)
  ) {
    return "Range must be forward (e.g., A1:A4, not A4:A1).";
  }

  return "";
};

export const validationMap = {
  preferenceSheetUrl: (value) => validateUrl(value, false),
  outputSheetUrl: (value) => validateUrl(value, true),
  preferenceSheetName: validateSheetName,
  outputSheetName: validateSheetName,
  preferenceSheetRange: validateRange,
  outputSheetRange: validateRange,
};
