const { google } = require("googleapis");
const path = require("path");
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

let sheetsClient = null;

/* Should be called at the start of any function that needs to access the sheets client */
async function getSheetsClient() {
	if (!sheetsClient) {
		const auth = new google.auth.GoogleAuth({
			keyFile: path.resolve(__dirname, "keyFile.json"),
			scopes: SCOPES,
		});

		const client = await auth.getClient();
		sheetsClient = google.sheets({ version: "v4", auth: client });
	}

	return sheetsClient;
}

async function fetchSpreadsheetMetadata(spreadsheetId) {
	const sheets = await getSheetsClient();

	try {
		const response = await sheets.spreadsheets.get({
			spreadsheetId,
			fields: "sheets.properties",
		});

		const metadata = response.data.sheets.map((sheet) => ({
			title: sheet.properties.title,
			gridProperties: sheet.properties.gridProperties,
		}));

		console.log(metadata);

		const sheetNames = metadata.map((sheet) => sheet.title);

		return {
			success: true,
			sheetNames,
			metadata,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: "An error occurred while fetching spreadsheet metadata",
			origin: "metadata",
			/*
      error.response.data.error.code =
        400 -> Bad Request - shouldn't happen as client-side verifies syntax. If
          the spreadsheet ID is invalid, it'll most likely end up as a 404 error
        403 -> Permission Denied - spreadsheet not shared properly
        404 -> Not Found - couldn't find the spreadsheet, check the URL
        429 -> Too Many Requests - Quota exceeded
          The Quota limit is 300 requests per minute or 60 per minute per user.
          Since the code here uses only a single account, I think it's 60.
          Should just need to wait a bit for this to be fixed.
        500 -> Internal Server Error - server-side issue on Google's end
        503 -> Service Unavailable - Google API temporarily unavailable
      */
			error,
		};
	}
}

async function fetchSpreadsheetData(spreadsheetId, sheetName, range) {
	const sheets = await getSheetsClient();

	try {
		const effectiveRange = range ? `${sheetName}!${range}` : sheetName;

		const response = await sheets.spreadsheets.values.get({
			spreadsheetId,
			range: effectiveRange,
		});

		return {
			success: true,
			data: response.data.values || [],
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: "An error occurred while fetching spreadsheet data.",
			origin: "data",
			/*
      error.response.data.error.code =
        400 -> Bad Request - we verify syntax so should only happen on the
          "range" fields. One example is when the range is outside of the
          gridProperties (e.g., sheet only has data from A1:A3 and you use
          CC2:DD4). Can't really prevent this client-side as we don't know the
          sheet's properties until we are here
        403 -> Permission Denied - spreadsheet not shared properly
        404 -> Not Found - couldn't find the spreadsheet, check the URL
        429 -> Too Many Requests - Quota exceeded
          The Quota limit is 300 requests per minute or 60 per minute per user.
          Since the code here uses only a single account, I *think* it's 60.
          Should just need to wait the minute out for this to be fixed?
        500 -> Internal Server Error - server-side issue on Google's end
        503 -> Service Unavailable - Google API temporarily unavailable
      */
			error,
		};
	}
}

async function fetchSpreadsheet(spreadsheetId, sheetName, range) {
	const metadataResult = await fetchSpreadsheetMetadata(spreadsheetId);

	if (!metadataResult.success) {
		return metadataResult;
	}

	const { sheetNames, metadata } = metadataResult;

	if (!sheetNames.includes(sheetName)) {
		return {
			success: false,
			error: `Sheet '${sheetName}' does not exist in the spreadsheet.`,
			sheetNames, // Propagated to client-side for logging
		};
	}

	const dataResult = await fetchSpreadsheetData(
		spreadsheetId,
		sheetName,
		range
	);

	if (!dataResult.success) {
		return dataResult;
	}

	const gridProperties = metadata.find(
		(sheet) => sheet.title === sheetName
	)?.gridProperties;

	return {
		success: true,
		gridProperties,
		data: dataResult.data,
	};
}

async function writeToSpreadsheet(sheetId, sheetName, range, values) {
	const client = await getSheetsClient();

	const effectiveRange = `${sheetName}${range ? `!${range}` : ""}`;

	try {
		const response = await client.spreadsheets.values.update({
			spreadsheetId: sheetId,
			range: effectiveRange,
			valueInputOption: "RAW",
			requestBody: {
				values: values,
			},
		});

		// console.log("Data written successfully:", response.data);
		return response.data;
	} catch (error) {
		if (error.code === 400) {
			console.error(
				"Invalid range format. Please verify that the range is correct:",
				error.message
			);
			throw new Error(
				"Invalid range format. Check the range format (e.g., 'Sheet1!A1:C10') and ensure it exists."
			);
		} else if (error.code === 404) {
			console.error(
				"Sheet not found. Please check the sheet ID and range:",
				error.message
			);
			throw new Error(
				"Spreadsheet or sheet not found. Ensure the sheet ID and range are correct."
			);
		} else {
			console.error("Error writing data to Google Sheets:", error.message);
			throw new Error(
				"An unexpected error occurred while writing data to Google Sheets."
			);
		}
	}
}

module.exports = {
	fetchSpreadsheet,
	writeToSpreadsheet,
};
