import React, { useState } from 'react';
import '../styles/Home.css';
import InputsTable from '../components/InputsTable';
// import BoothMap from '../components/BoothMap';

function extractSpreadsheetId(url) {
  const regex = /\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function Home() {
  const [inputs, setInputs] = useState({
    preferenceSheetUrl: '',
    preferenceSheetName: '',
    preferenceSheetRange: '',
    outputSheetUrl: '',
    outputSheetName: '',
    outputSheetRange: ''
  });

  // const [selectedBooths, setSelectedBooths] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleAssignBooths = () => {
    const inputId = extractSpreadsheetId(inputs.preferenceSheetUrl);
    if (!inputId) {
      console.log("in bad");
      // indicate to user somehow
      return;
    }

    console.log(process.env.REACT_APP_DEFAULT_OUTPUT_SHEET_ID);
    const outputId = inputs.outputSheetUrl === "" ?
      process.env.REACT_APP_DEFAULT_OUTPUT_SHEET_ID : extractSpreadsheetId(inputs.outputSheetUrl);
    if (!outputId) {
      console.log("out bad");
      // indicate to user somehow
      return;
    }

    console.log(inputId);
    console.log(outputId);

  };

  return (
    <div className="container py-3">
      <div className="header text-center mb-3">
        <img
          src="https://sec.tamu.edu/images/secbasic.png"
          alt="SEC"
          className="img-fluid"
          style={{ width: '150px', paddingTop: '10px' }}
        />
        <h1 className="text-white mt-3">Booth Assignment</h1>
      </div>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <a
          className="navbar-brand"
          href="https://docs.google.com/document/d/1atLMQwJZdnGhNsugp4rrNjjpop9T8vtIye-oHWjVLcQ/edit"
          target="_blank"
          rel="noopener noreferrer"
        >
          Documentation
        </a>
      </nav>

      <InputsTable inputs={inputs} handleInputChange={handleInputChange} />
      {/* <h2 className="mt-4 text-center">Select Booth Map</h2> */}
      {/* <BoothMap selectedBooths={selectedBooths} setSelectedBooths={setSelectedBooths} /> */}

      <button
        type="button"
        className="btn btn-dark mt-3"
        onClick={handleAssignBooths}
      >
        Assign Booths
      </button>
    </div>
  );
}

export default Home;
