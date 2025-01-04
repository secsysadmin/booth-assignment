import React, { useState } from 'react';
import { FaClipboard } from 'react-icons/fa';
import '../../styles/helper/CopyToClipboard.css';

const CopyToClipboard = ({ textToCopy, iconSize = 20, confirmationText = "Copied!", confirmationDisappears = 15000 }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), confirmationDisappears);
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <div className="copy-container">
      <span className="text-to-copy">
        {textToCopy}
      </span>

      <span onClick={handleCopy} className="copy-icon" title="Click to copy">
        <FaClipboard size={iconSize} color="#007bff" />
      </span>

      {copied && (
        <span className="confirmation-text">
          {confirmationText}
        </span>
      )}
    </div>
  );
};

export default CopyToClipboard;
