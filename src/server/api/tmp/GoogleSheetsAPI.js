import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { google } from "googleapis";

const __dirname = dirname(fileURLToPath(import.meta.url));
const credentialsPath = resolve(__dirname, "googleAPI.json");

let sheetsClient = null;

async function getSheetsClient() {
  if (!sheetsClient) {
    const auth = new google.auth.GoogleAuth({
      keyFile: credentialsPath,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const client = await auth.getClient();
    sheetsClient = google.sheets({ version: "v4", auth: client });
  }

  return sheetsClient;
}

// Helper function to get the first sheet name in the spreadsheet
async function getFirstSheetName(sheetId) {
  const client = await getSheetsClient();
  try {
    const response = await client.spreadsheets.get({
      spreadsheetId: sheetId,
      fields: "sheets.properties.title"
    });
    return response.data.sheets[0].properties.title;
  } catch (error) {
    console.error("Error retrieving the first sheet name:", error.message);
    throw new Error("Failed to retrieve the first sheet name. Please check the spreadsheet ID.");
  }
}


async function readSheetData(sheetId, sheetName = null, range = null) {
  const client = await getSheetsClient();

  try {
    // Get the first sheet name if no sheet name is provided
    if (!sheetName) {
      sheetName = await getFirstSheetName(sheetId);
    }

    // Build the range with the sheet name
    const effectiveRange = range ? `${sheetName}!${range}` : `${sheetName}`;

    const response = await client.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: effectiveRange,
    });

    const rows = response.data.values;
    if (rows && rows.length) {
      return rows;
    } else {
      console.log("No data found in the specified range.");
      return [];
    }
  } catch (error) {
    if (error.code === 400) {
      console.error("Invalid range or sheet name. Verify inputs:", error.message);
      throw new Error(`Invalid range or sheet name: ${sheetName}. Check the format and ensure the sheet exists.`);
    } else if (error.code === 404) {
      console.error("Spreadsheet or sheet not found:", error.message);
      throw new Error(`Spreadsheet or sheet not found. Check the sheet ID (${sheetId}) and range.`);
    } else {
      console.error("Error reading data from Google Sheets:", error.message);
      throw new Error("An unexpected error occurred while reading data from Google Sheets.");
    }
  }
}


// Function to read data from a specific range in the sheet, with improved error handling
async function readSheetData(sheetId, range = null) {
  const client = await getSheetsClient();

  if (!range) {
    const firstSheetName = await getFirstSheetName(sheetId);
    range = `${firstSheetName}`;
  }

  try {
    const response = await client.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: range,
    });

    const rows = response.data.values;
    if (rows && rows.length) {
      return rows;
    } else {
      console.log("No data found in the specified range.");
      return [];
    }
  } catch (error) {
    if (error.code === 400) {
      console.error("Invalid range format. Please verify that the range is correct:", error.message);
      throw new Error("Invalid range format. Check the range format (e.g., 'Sheet1!A1:C10') and ensure it exists.");
    } else if (error.code === 404) {
      console.error("Sheet not found. Please check the sheet ID and range:", error.message);
      throw new Error("Spreadsheet or sheet not found. Ensure the sheet ID and range are correct.");
    } else {
      console.error("Error reading data from Google Sheets:", error.message);
      throw new Error("An unexpected error occurred while reading data from Google Sheets.");
    }
  }
}

// Function to write data to a specific range in the sheet
async function writeSheetData(sheetId, range = null, values) {
  const client = await getSheetsClient();

  if (!range) {
    const firstSheetName = await getFirstSheetName(sheetId);
    range = `${firstSheetName}`;
  }

  try {
    const response = await client.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: range,
      valueInputOption: "RAW",
      requestBody: {
        values: values,
      },
    });

    console.log("Data written successfully:", response.data);
    return response.data;
  } catch (error) {
    if (error.code === 400) {
      console.error("Invalid range format. Please verify that the range is correct:", error.message);
      throw new Error("Invalid range format. Check the range format (e.g., 'Sheet1!A1:C10') and ensure it exists.");
    } else if (error.code === 404) {
      console.error("Sheet not found. Please check the sheet ID and range:", error.message);
      throw new Error("Spreadsheet or sheet not found. Ensure the sheet ID and range are correct.");
    } else {
      console.error("Error writing data to Google Sheets:", error.message);
      throw new Error("An unexpected error occurred while writing data to Google Sheets.");
    }
  }
}

export { readSheetData, writeSheetData };
