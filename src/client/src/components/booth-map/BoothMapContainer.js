import React from "react";
import BoothMap from "./BoothMap";
import "../../styles/booth-map/BoothMapContainer.css";
import { useBoothMap } from "../../context/BoothMapContext";

const BoothMapContainer = () => {
  const { boothState, clearBoothState, toggleSetting } = useBoothMap();

  return (
    <div className="booth-map-main-container mt-4">
      <div className="booth-map-header d-flex justify-content-between align-items-center">
        <div className="booth-map-header-left d-flex align-items-center">
          <h3 className="mr-2">Configure Booth Map</h3>
        </div>

        <label className="form-check-label mr-2">
          <input
            type="checkbox"
            className="form-check-input"
            checked={boothState.isDisableMode}
            onChange={() => toggleSetting("isDisableMode")}
          />
          Disable Booths
        </label>

        <div className="booth-map-header-right d-flex align-items-center">
          <button className="btn btn-primary">Save</button>
          <button className="btn btn-info">Load</button>
          <button className="btn btn-danger" onClick={clearBoothState}>
            Clear
          </button>
        </div>
      </div>

      <BoothMap />
    </div>
  );
};

export default BoothMapContainer;

