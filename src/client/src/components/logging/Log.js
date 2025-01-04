import React from 'react';
import "../../styles/logging/Log.css";

const Log = ({ logs, verboseMode, showTimestamp }) => {
  const renderLogMessage = (log, index) => {
    const { severity, message, timestamp } = log;

    /* Not sure if we want this yet */
    // if (severity === 'newline') {
    //   return <div key={index} className="log-newline"></div>;
    // }

    let logClass = '';
    switch (severity) {
      case 'error':
        logClass = 'text-danger';
        break;
      case 'warning':
        logClass = 'text-warning';
        break;
      case 'info':
        logClass = 'text-info';
        break;
      case 'verbose':
        if (!verboseMode) return null;
        logClass = 'text-muted';
        break;
      default:
        logClass = 'text-dark';
    }

    return (
      <div key={index} className={`log-message ${logClass}`}>
        {showTimestamp && <span className="log-timestamp">{timestamp}: </span>}
        {message}
      </div>
    );
  };

  return (
    <div className="log-container">
      {logs.length === 0 ? <div className="no-logs">No logs yet...</div> : logs.map((log, index) => renderLogMessage(log, index))}
    </div>
  );
};

export default Log;
