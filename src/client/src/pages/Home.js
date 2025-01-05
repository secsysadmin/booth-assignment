import React, { useState } from 'react';
import '../styles/pages/Home.css';
import Table from '../components/input-table/Table';
import { validateSyntax } from "../utils/table-validation";
import LogContainer from "../components/logging/LogContainer";
import { useLog } from '../context/LogContext';
// import BoothMap from '../components/BoothMap';

function Home() {
  const { addLog } = useLog();

  const [inputs, setInputs] = useState({
    preferenceSheetUrl: '',
    preferenceSheetName: '',
    preferenceSheetRange: '',
    outputSheetUrl: '',
    outputSheetName: '',
    outputSheetRange: ''
  });

  const [errors, setErrors] = useState({});

  /* Input validation (client-side) */
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


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };


  /* Assignment entry point */
  const handleAssignBooths = async () => {
    addLog("info", "Booth assignment initiated");
    addLog("debug", `inputs: ${JSON.stringify(inputs)}`);
    addLog("info", "Beginning table input validation...", true);

    const { newErrors, sanitizedInputs } = validateSyntax(inputs, addLog);
    addLog("debug", `sanitizedInputs: ${JSON.stringify(sanitizedInputs)}`);

    setErrors(newErrors);
    if (!sanitizedInputs) return;

    const preferenceQueryString = new URLSearchParams({
      spreadsheetId: sanitizedInputs.preferenceSheetId,
      sheetName: sanitizedInputs.preferenceSheetName,
      range: sanitizedInputs.preferenceSheetRange ?? "",
    }).toString();

    const outputQueryString = new URLSearchParams({
      spreadsheetId: sanitizedInputs.outputSheetId,
      sheetName: sanitizedInputs.outputSheetName,
      range: sanitizedInputs.outputSheetRange ?? "",
    }).toString();

    const preferenceResponse = await fetch(
      `${process.env.REACT_APP_API_URL}/api/sheets/fetch-spreadsheet?${preferenceQueryString}`
    );

    const outputResponse = await fetch(
      `${process.env.REACT_APP_API_URL}/api/sheets/fetch-spreadsheet?${outputQueryString}`
    );


    const preferenceSheet = await preferenceResponse.json();
    const outputSheet = await outputResponse.json();

    console.log(preferenceSheet);
    console.log(outputSheet);
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

      <div className="d-flex justify-content-center mt-5">
        <button
          type="button"
          className="btn btn-dark"
          onClick={handleAssignBooths}
        >
          Assign Booths
        </button>
      </div>

      <LogContainer />
    </div >
  );
}

export default Home;
