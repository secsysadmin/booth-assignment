import React from 'react';
import { useLog } from '../../context/LogContext';
import CopyToClipboard from '../helper/CopyToClipboard';
import Log from './Log';
import "../../styles/logging/LogContainer.css";

const LogContainer = () => {
  const { logs, toggleSetting, clearLogs } = useLog();

  return (
    <div className="log-main-container mt-4">
      <div className="log-header d-flex justify-content-between align-items-center">
        <div className="log-header-left d-flex align-items-center">
          <h3 className="mr-2">Log Output</h3>
          <CopyToClipboard
            textToCopy={logs.data.map(log => `${log.severity.toUpperCase()}: ${log.message}`).join('\n')}
            iconTitle="Copy Logs"
            confirmationText="Copied!"
            confirmationDisappears={5000}
          />
        </div>
        <div className="log-header-right d-flex align-items-center">
          <label className="form-check-label mr-2">
            <input
              type="checkbox"
              className="form-check-input"
              checked={logs.showTimestamp}
              onChange={() => toggleSetting('showTimestamp')}
            />
            Show Timestamp
          </label>

          <label className="form-check-label mr-2">
            <input
              type="checkbox"
              className="form-check-input"
              checked={logs.verboseMode}
              onChange={() => toggleSetting('verboseMode')}
            />
            Verbose Mode
          </label>

          <label className="form-check-label mr-2">
            <input
              type="checkbox"
              className="form-check-input"
              checked={logs.debugMode}
              onChange={() => toggleSetting('debugMode')}
            />
            Debug Mode
          </label>

          <button
            type="button"
            className="btn btn-danger"
            onClick={clearLogs}
          >
            Clear
          </button>
        </div>
      </div>
      <Log
        logs={logs.data}
        verboseMode={logs.verboseMode}
        debugMode={logs.debugMode}
        showTimestamp={logs.showTimestamp}
      />
    </div>
  );
};

export default LogContainer;




/*
{


4 54 54 54 4
3 63 63 63 3

E DD CC BB A

2 72 72 72 2
1 81 81 81 1


x xx xx xx x
x xx xx xx x
x xx xx xx x
x xx xx xx x
E DD CC BB A


x x x x x
x x x x x
x x x x x
x x x x x
E D C B A


x xx xx xx xx xx xx xx xx x
x xx xx xx xx xx xx xx xx x
x xx xx xx xx xx xx xx xx x
x xx xx xx xx xx xx xx xx x

J II HH GG FF EE DD CC BB A

x xx xx xx xx xx xx xx xx x
x xx xx xx xx xx xx xx xx x
x xx xx xx xx xx xx xx xx x
x xx xx xx xx xx xx xx xx x



}
*/