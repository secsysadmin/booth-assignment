import React, { useState } from 'react';
import '../styles/Home.css';
import Table from '../components/input-table/Table';
import { validationMap } from "../utils/table-validation";
import LogContainer from "../components/logging/LogContainer";
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

  const [logs, setLogs] = useState({
    data: [],
    showTimestamp: false,
    verboseMode: false
  });

  const [errors, setErrors] = useState({});
  // const [sanitizedInputs, setSanitizedInputs] = useState({});


  /* Input validation (syntax) */
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


  /* Logging */
  const handleCheckboxChange = (field) => {
    setLogs((prevLogs) => ({
      ...prevLogs,
      [field]: !prevLogs[field]
    }));
  };

  const handleLogClear = () => {
    setLogs((prevLogs) => ({
      ...prevLogs,
      data: []
    }));
  };

  const addLog = (severity, message) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prevLogs) => ({
      ...prevLogs,
      data: [
        ...prevLogs.data,
        { severity, message, timestamp },
        /* Not sure if we want this yet */
        // ...(severity === 'error' ? [{ severity: 'newline' }] : [])
      ]
    }));
  };


  /* Assignment entry point */
  const handleAssignBooths = () => {
    addLog("info", "Booth Assignment Initiated");
    addLog("verbose", "Beginning input validation");
    const newErrors = {};
    const sanitizedInputs = {};

    Object.keys(inputs).forEach((field) => {
      if (validationMap[field]) {
        const { errorMessage, sanitizedValue } = validationMap[field](inputs[field]);
        if (errorMessage) {
          newErrors[field] = errorMessage || '';
        } else {
          sanitizedInputs[field.replace("Url", "Id")] = sanitizedValue || null;
        }
      }
    });

    // console.log("errors:");
    // console.log(newErrors);
    setErrors(newErrors);
    // setSanitizedInputs(newSanitizedInputs);
    if (Object.keys(newErrors).length !== 0) {
      addLog("error", "Input syntactically invalid.");
      return;
    }

    addLog("verbose", "Input syntactically correct.");
    const {
      preferenceSheetId, preferenceSheetName, preferenceSheetRange,
      outputSheetId, outputSheetName, outputSheetRange,
    } = sanitizedInputs;
    // console.log('Sanitized Preference Sheet ID:', preferenceSheetId);
    // console.log('Sanitized Preference Sheet Name:', preferenceSheetName);
    // console.log('Sanitized Preference Sheet Range:', preferenceSheetRange);
    // console.log('Sanitized Output Sheet ID:', outputSheetId);
    // console.log('Sanitized Output Sheet Name:', outputSheetName);
    // console.log('Sanitized Output Sheet Range:', outputSheetRange);

    // console.log(preferenceSheetId);
    // console.log(outputSheetId);
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

      <LogContainer
        logs={logs.data}
        verboseMode={logs.verboseMode}
        showTimestamp={logs.showTimestamp}
        handleCheckboxChange={handleCheckboxChange}
        handleLogClear={handleLogClear}
      />
    </div >
  );
}

export default Home;
