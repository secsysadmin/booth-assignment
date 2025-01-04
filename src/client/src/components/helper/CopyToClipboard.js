import React, { useState } from 'react';
import { FaClipboard } from 'react-icons/fa';
import '../../styles/helper/CopyToClipboard.css';

const CopyToClipboard = ({
  textToCopy,
  iconSize = 20,
  confirmationText = "Copied!",
  confirmationDisappears = 15000,
  iconTitle = "Click to copy"
}) => {
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
      <span onClick={handleCopy} className="copy-icon" title={iconTitle}>
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
