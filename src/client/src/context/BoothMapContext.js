import React, { createContext, useState, useContext } from "react";

const BoothMapContext = createContext();


function generateBoothMap(rows, cols) {
  const columnLetters = Array.from({ length: cols }).map((_, i) => {
    if (i === 0 || i === cols - 1) return String.fromCharCode(65 + Math.ceil(i / 2));
    return String.fromCharCode(65 + Math.floor((i - 1) / 2) + 1);
  }).reverse();

  const generateBoothRows = (numRows, baseOffset) => {
    return Array.from({ length: numRows }, (_, r) =>
      Array.from({ length: cols }, (__, c) => {
        if (!(c & 1) || c === cols - 1) return baseOffset - r;
        return baseOffset + r + 1;
      })
    );
  };

  const topRows = Math.ceil(rows / 2);
  const bottomRows = Math.floor(rows / 2);

  const topBooths = generateBoothRows(topRows, rows);
  const bottomBooths = generateBoothRows(bottomRows, rows + topRows);

  return { columnLetters, topBooths, bottomBooths };
}

const generateBooths = (col, nRows, isDisableMode) => {
  const topRows = Math.ceil(nRows / 2);
  const bottomRows = Math.floor(nRows / 2);

  return [
    ...Array.from({ length: topRows }, (_, row) => ({
      row,
      col,
      section: "top",
      disabled: isDisableMode,
    })),
    ...Array.from({ length: bottomRows }, (_, row) => ({
      row,
      col,
      section: "bottom",
      disabled: isDisableMode,
    })),
  ];
};

const updateBooths = (boothsToAdd, filterFn, selectedBooths) => {
  return [
    ...selectedBooths.filter(filterFn),
    ...boothsToAdd,
  ];
};

const toggleBoothSelection = (existingBooth, selectedBooths, row, col, section, isDisableMode) => {
  if (existingBooth) {
    if (isDisableMode) {
      return existingBooth.disabled
        ? selectedBooths.filter((booth) => booth !== existingBooth)
        : selectedBooths.map((booth) =>
          booth === existingBooth ? { ...booth, disabled: true } : booth
        );
    } else {
      return existingBooth.disabled
        ? selectedBooths.map((booth) =>
          booth === existingBooth ? { ...booth, disabled: false } : booth
        )
        : selectedBooths.filter((booth) => booth !== existingBooth);
    }
  } else {
    return [
      ...selectedBooths,
      { row, col, section, disabled: isDisableMode },
    ];
  }
};

export const BoothMapProvider = ({ children }) => {
  const [boothState, setBoothState] = useState({
    selectedBooths: [],
    isDisableMode: false,
    nRows: 15,
    nCols: 32,
  });

  const toggleBooth = (row, col, section) => {
    setBoothState((prevState) => {
      const { selectedBooths, isDisableMode } = prevState;

      const existingBooth = selectedBooths.find(
        (booth) => booth.row === row && booth.col === col && booth.section === section
      );

      const updatedBooths = toggleBoothSelection(existingBooth, selectedBooths, row, col, section, isDisableMode);

      return { ...prevState, selectedBooths: updatedBooths };
    });
  };

  const toggleColumn = (col) => {
    setBoothState((prevState) => {
      const { selectedBooths, nRows, isDisableMode } = prevState;
      const isColumnSelected = selectedBooths.some((booth) => booth.col === col && !booth.disabled);
      const isColumnDisabled = selectedBooths.some((booth) => booth.col === col && booth.disabled);

      const filterFn = isDisableMode
        ? (booth) => booth.col !== col
        : (booth) => booth.col !== col;

      let boothsToAdd;
      if (isDisableMode) {
        boothsToAdd = isColumnDisabled
          ? []
          : generateBooths(col, nRows, true);
      } else {
        boothsToAdd = isColumnSelected
          ? []
          : generateBooths(col, nRows, false);
      }

      const updatedBooths = updateBooths(boothsToAdd, filterFn, selectedBooths);

      return { ...prevState, selectedBooths: updatedBooths };
    });
  };


  const clearBoothState = () => {
    setBoothState((prevState) => ({ ...prevState, selectedBooths: [] }));
  };

  const toggleSetting = (key) => {
    setBoothState((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const adjustRows = (delta) => {
    setBoothState((prevState) => ({
      ...prevState,
      nRows: prevState.nRows + delta,
    }));
  };

  const adjustColumns = (delta) => {
    setBoothState((prevState) => ({
      ...prevState,
      nCols: prevState.nCols + delta,
    }));
  };

  return (
    <BoothMapContext.Provider
      value={{
        boothState,
        toggleBooth,
        toggleColumn,
        clearBoothState,
        toggleSetting,
        adjustRows,
        adjustColumns,
        generateBoothMap,
      }}
    >
      {children}
    </BoothMapContext.Provider>
  );
};

export const useBoothMap = () => useContext(BoothMapContext);
