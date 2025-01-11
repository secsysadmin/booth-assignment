const express = require("express");
const {
	fetchSpreadsheet,
	writeToSpreadsheet,
} = require("../api/google-sheets");

const router = express.Router();

router.get("/api/sheets/fetch-spreadsheet", async (req, res) => {
	const { spreadsheetId, sheetName, range } = req.query;

	const result = await fetchSpreadsheet(spreadsheetId, sheetName, range);
	res.status(result.success ? 200 : 500).json(result);
});

router.post("/api/sheets/write", async (req, res) => {
	const { spreadsheetId, sheetName, range, values } = req.body;

	const result = await writeToSpreadsheet(
		spreadsheetId,
		sheetName,
		range,
		values
	);
	res.status(result.success ? 200 : 500).json(result);
});

module.exports = router;
