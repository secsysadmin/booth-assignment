import React, { useState } from 'react';
import '../styles/Home.css';
import Table from '../components/input-table/Table';
import { validationMap, extractSpreadsheetId } from "../utils/table-validation";;
// import BoothMap from '../components/BoothMap';

function Home() {
  const [inputs, setInputs] = useState({
    preferenceSheetUrl: '',
    preferenceSheetName: '',
    preferenceSheetRange: '',
    outputSheetUrl: '',
    outputSheetName: '',
    outputSheetRange: ''
  });

  const [errors, setErrors] = useState({});


  /* FIXME: Unable to get live validation to work in tandem with the final validation
  check from the handleAssignBooths callback. So, going to leave this commented
  out for now and only accept validation on the callback so we can continue */
  const handleBlur = (e) => {
    // const { name, value } = e.target;
    // const errorMessage = validationMap[name] ? validationMap[name](value) : "";
    // setErrors((prevErrors) => ({
    //   ...prevErrors,
    //   [name]: errorMessage,
    // }));
  };

  // const [selectedBooths, setSelectedBooths] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };


  const handleAssignBooths = () => {
    /* Ensure no input table errors exist when button is pushed */
    const newErrors = {};
    Object.keys(inputs).forEach((field) => {
      const errorMessage = validationMap[field] ? validationMap[field](inputs[field]) : '';
      if (errorMessage) {
        newErrors[field] = errorMessage;
      }
    });
    setErrors(newErrors);
    // console.log(newErrors);

    if (Object.keys(newErrors).length !== 0) {
      return;
    }

    /* Inputs contains the raw but validated input. We to convert the URLs to
    spreadsheet IDs for the Google Sheets API */
    const preferenceSheetId = extractSpreadsheetId(inputs.preferenceSheetUrl);
    const outputSheetId = extractSpreadsheetId(inputs.outputSheetUrl);

    console.log(preferenceSheetId);
    console.log(outputSheetId);
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

      <Table
        inputs={inputs}
        handleInputChange={handleInputChange}
        handleBlur={handleBlur}
        errors={errors}
      />
      {/* <h2 className="mt-4 text-center">Select Booth Map</h2> */}
      {/* <BoothMap selectedBooths={selectedBooths} setSelectedBooths={setSelectedBooths} /> */}

      <div className="d-flex justify-content-center mt-3">
        <button
          type="button"
          className="btn btn-dark"
          onClick={handleAssignBooths}
        >
          Assign Booths
        </button>
      </div>
    </div >
  );
}

export default Home;
