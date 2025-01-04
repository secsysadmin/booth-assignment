// import React from 'react';
// import CopyToClipboard from '../helper/CopyToClipboard';
// import Log from './Log';
// import "../../styles/logging/LogContainer.css";

// const LogContainer = ({ logs, verboseMode, showTimestamp, handleCheckboxChange, handleLogClear }) => {
//   return (
//     <div className="log-main-container mt-4">
//       <div className="log-header d-flex justify-content-between align-items-center">
//         <div className="log-header-left d-flex align-items-center">
//           <h3 className="mr-2">Log Output</h3>
//           <CopyToClipboard
//             textToCopy={logs.map(log => `${log.severity.toUpperCase()}: ${log.message}`).join('\n')}
//             iconTitle="Copy Logs"
//             confirmationText="Copied!"
//             confirmationDisappears={5000}
//           />
//         </div>
//         <div className="log-header-right d-flex align-items-center">
//           <label className="form-check-label mr-2">
//             <input
//               type="checkbox"
//               className="form-check-input"
//               checked={verboseMode}
//               onChange={() => handleCheckboxChange('verboseMode')}
//             />
//             Verbose Mode
//           </label>

//           <label className="form-check-label mr-2">
//             <input
//               type="checkbox"
//               className="form-check-input"
//               checked={showTimestamp}
//               onChange={() => handleCheckboxChange('showTimestamp')}
//             />
//             Show Timestamp
//           </label>

//           <button
//             type="button"
//             className="btn btn-danger"
//             onClick={handleLogClear}
//           >
//             Clear
//           </button>
//         </div>
//       </div>

//       <Log logs={logs} verboseMode={verboseMode} showTimestamp={showTimestamp} />
//     </div>
//   );
// };

// export default LogContainer;


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
              checked={logs.verboseMode}
              onChange={() => toggleSetting('verboseMode')}
            />
            Verbose Mode
          </label>
          <label className="form-check-label mr-2">
            <input
              type="checkbox"
              className="form-check-input"
              checked={logs.showTimestamp}
              onChange={() => toggleSetting('showTimestamp')}
            />
            Show Timestamp
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
      <Log logs={logs.data} verboseMode={logs.verboseMode} showTimestamp={logs.showTimestamp} />
    </div>
  );
};

export default LogContainer;
