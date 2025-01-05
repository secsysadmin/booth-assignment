const express = require('express');
const { fetchSpreadsheet } = require('../api/google-sheets');

const router = express.Router();

router.get('/api/sheets/fetch-spreadsheet', async (req, res) => {
  const { spreadsheetId, sheetName, range } = req.query;

  const result = await fetchSpreadsheet(spreadsheetId, sheetName, range);
  res.status(result.success ? 200 : 500).json(result);
});

module.exports = router;
