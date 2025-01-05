import React from 'react';
import "../../styles/input-table/Table.css";
import TableCell from "./TableCell";
import InfoIcon from './InfoIcon';
import CopyToClipboard from '../helper/CopyToClipboard';

function Table({ inputs, handleInputChange, handleBlur, errors }) {
  return (
    <div className="table-container">
      <p className="text-muted">
        The only required cell is the Preference Spreadsheet URL.
        By default, the Output Spreadsheet URL is{" "}
        <a href={process.env.REACT_APP_DEFAULT_OUTPUT_SHEET_URL} target="_blank" rel="noopener noreferrer">
          here
        </a>.
      </p>
      <p className="text-muted">
        Please make sure that both your Preference Spreadsheet and Output Spreadsheet
        give access to the following email as an <em>editor</em>:<br />
        {process.env.REACT_APP_SHEET_API_EMAIL}
        <CopyToClipboard
          textToCopy={process.env.REACT_APP_SHEET_API_EMAIL}
          iconTitle="Copy Email"
        />
      </p>
      <p className="text-muted">
        Placeholder values represent the default values. Leave a cell blank if you wish to use the default value.
      </p>

      <table className="table custom-table bg-dark">
        <thead>
          <tr>
            <th>Spreadsheet</th>
            <th>
              Spreadsheet URL
              <InfoIcon text='The URL of the Google Spreadsheet. Can be taken directly
              from the search bar.' />
            </th>
            <th>
              Sheet Name
              <InfoIcon text='The name of the specific sheet within the spreadsheet.' />
            </th>
            <th>
              Sheet Range
              <InfoIcon text='The range of cells in the sheet.\n\nThe default behavior
              is to read the entire sheet starting from A1. If you wish to specify the
              exact location within your sheet, please specify the range in the format
              "A1:C10"' />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Preference</td>
            <TableCell
              value={inputs.preferenceSheetUrl}
              name="preferenceSheetUrl"
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={errors.preferenceSheetUrl}
            />
            <TableCell
              value={inputs.preferenceSheetName}
              name="preferenceSheetName"
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={errors.preferenceSheetName}
            />
            <TableCell
              value={inputs.preferenceSheetRange}
              name="preferenceSheetRange"
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={errors.preferenceSheetRange}
              placeholder="The entire sheet"
            />
          </tr>
          <tr>
            <td>Output</td>
            <TableCell
              value={inputs.outputSheetUrl}
              name="outputSheetUrl"
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={errors.outputSheetUrl}
            />
            <TableCell
              value={inputs.outputSheetName}
              name="outputSheetName"
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={errors.outputSheetName}
              placeholder="Booth Assignments"
            />
            <TableCell
              value={inputs.outputSheetRange}
              name="outputSheetRange"
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={errors.outputSheetRange}
              placeholder="The entire sheet"
            />
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
