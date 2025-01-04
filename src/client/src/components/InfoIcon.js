// import React from 'react';
// import "../styles/InfoIcon.css";

// function InfoIcon({ text }) {
//   return (
//     <div className="info-icon-container">
//       <span className="info-icon">i</span>
//       <div className="info-tooltip">{text}</div>
//     </div>
//   );
// }

// export default InfoIcon;

import React from 'react';
import "../styles/InfoIcon.css";

function InfoIcon({ text }) {
  return (
    <div className="info-icon-container">
      <span className="info-icon">i</span>
      <div className="info-tooltip">
        {text.split('\\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < text.split('\\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default InfoIcon;