import React, { createContext, useState, useContext } from 'react';

const LogContext = createContext();

export const LogProvider = ({ children }) => {
  const [logs, setLogs] = useState({
    data: [],
    showTimestamp: false,
    verboseMode: false,
  });

  const addLog = (severity, message) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prevLogs) => ({
      ...prevLogs,
      data: [
        ...prevLogs.data,
        { severity, message, timestamp },
      ],
    }));
  };

  const clearLogs = () => {
    setLogs((prevLogs) => ({ ...prevLogs, data: [] }));
  };

  const toggleSetting = (key) => {
    setLogs((prevLogs) => ({
      ...prevLogs,
      [key]: !prevLogs[key],
    }));
  };

  return (
    <LogContext.Provider value={{ logs, addLog, clearLogs, toggleSetting }}>
      {children}
    </LogContext.Provider>
  );
};

export const useLog = () => useContext(LogContext);
