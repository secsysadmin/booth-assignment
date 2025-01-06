import React from "react";
import "../../styles/booth-map/BoothMap.css";
import { useBoothMap } from "../../context/BoothMapContext";

const BoothMap = () => {
  const { boothState, toggleBooth, toggleColumn, adjustRows, adjustColumns, generateBoothMap } = useBoothMap();
  const { selectedBooths, nRows, nCols } = boothState;
  const { columnLetters, topBooths, bottomBooths } = generateBoothMap(nRows, nCols);

  // const addRow = () => adjustRows(1);
  // const removeRow = () => adjustRows(-1);
  const addColumn = () => adjustColumns(1);
  const removeColumn = () => adjustColumns(-1);

  return (
    <div className={`booth-map-grid ${boothState.isDisableMode ? "disable-mode" : ""}`}>
      {/* <div className="column-actions-container">
        {columnLetters.map((_, c) => (
          <div key={`action-${c}`} className="column-actions">
            <span onClick={removeColumn} className="column-actions remove">-</span>
            <span onClick={addColumn} className="column-actions add">+</span>
          </div>
        ))}
      </div> */}

      <div className="booth-top-container">
        {topBooths.map((row, r) => (
          <div key={`top-row-${r}`} className="booth-row">
            {row.map((booth, c) => {
              const isSelected = selectedBooths.some(
                (booth) => booth.row === r && booth.col === c && booth.section === "top" && !booth.disabled
              );
              const isDisabled = selectedBooths.some(
                (booth) => booth.row === r && booth.col === c && booth.section === "top" && booth.disabled
              );
              return (
                <div
                  key={`top-${r}-${c}`}
                  className={`booth ${isSelected ? "selected" : isDisabled ? "disabled" : ""}`}
                  onClick={() => toggleBooth(r, c, "top")}
                >
                  {booth}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="booth-middle-labels-container">
        {columnLetters.map((label, c) => (
          <div
            key={`label-${c}`}
            className="column-label"
            onClick={() => toggleColumn(c)}
          >
            {label}
          </div>
        ))}
      </div>

      <div className="booth-bottom-container">
        {bottomBooths.map((row, r) => (
          <div key={`bottom-row-${r}`} className="booth-row">
            {row.map((booth, c) => {
              const isSelected = selectedBooths.some(
                (booth) => booth.row === r && booth.col === c && booth.section === "bottom" && !booth.disabled
              );
              const isDisabled = selectedBooths.some(
                (booth) => booth.row === r && booth.col === c && booth.section === "bottom" && booth.disabled
              );
              return (
                <div
                  key={`bottom-${r}-${c}`}
                  className={`booth ${isSelected ? "selected" : isDisabled ? "disabled" : ""}`}
                  onClick={() => toggleBooth(r, c, "bottom")}
                >
                  {booth}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoothMap;
