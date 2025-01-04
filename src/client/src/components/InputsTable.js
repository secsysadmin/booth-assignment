import React from 'react';
import "../styles/InputsTable.css";
import InfoIcon from './InfoIcon';

function InputsTable({ inputs, handleInputChange }) {
  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <p className="text-muted">
        The only required cell is the Preference Spreadsheet URL.
        By default, the Output Spreadsheet URL is{" "}
        <a href={process.env.REACT_APP_DEFAULT_OUTPUT_SHEET_URL} target="_blank" rel="noopener noreferrer">
          here
        </a>.
      </p>
      <p className="text-muted">
        Placeholder values represent the default values. Leave a cell blank if you wish to use the default value.
      </p>


      <table
        className="table table-bordered bg-dark text-light custom-table mx-auto"
        style={{ maxWidth: '950px', textAlign: 'center' }}
      >
        <thead>
          <tr>
            <th>Spreadsheet</th>
            <th>
              Spreadsheet URL
              <InfoIcon text='The URL of the Google Spreadsheet containing the sheet.' />
            </th>
            <th>
              Sheet Name
              <InfoIcon text='The name of the specific sheet within the spreadsheet.\n\n
              "The first sheet" is considered the "active" sheet when you first open the
              spreadsheet. For example, "Sheet1."' />
            </th>
            <th>
              Sheet Range
              <InfoIcon text='The range of cells in the sheet.\n\nThe default behavior
              is to read the entire sheet starting from A1. If you wish to specify the
              exact location within your sheet, please specify the range in the format
              "A1:C10." ' />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ fontWeight: 'bold' }}>Preference</td>
            <td>
              <input
                type="text"
                name="preferenceSheetUrl"
                className="form-control mb-3"
                value={inputs.preferenceSheetUrl}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="preferenceSheetName"
                className="form-control mb-3"
                placeholder="The first sheet"
                value={inputs.preferenceSheetName}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="preferenceSheetRange"
                className="form-control mb-3"
                placeholder="The entire sheet"
                value={inputs.preferenceSheetRange}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td style={{ fontWeight: 'bold' }}>Output</td>
            <td>
              <input
                type="text"
                name="outputSheetUrl"
                className="form-control mb-3"
                value={inputs.outputSheetUrl}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="outputSheetName"
                className="form-control mb-3"
                placeholder="The first sheet"
                value={inputs.outputSheetName}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="outputSheetRange"
                className="form-control mb-3"
                placeholder="The entire sheet"
                value={inputs.outputSheetRange}
                onChange={handleInputChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default InputsTable;
