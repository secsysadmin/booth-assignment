import React, { useState } from 'react';

function BoothMap({ selectedBooths, setSelectedBooths }) {
  const booths = Array.from({ length: 14 }, (_, i) => `A${i + 1}`); // Example booth IDs

  const toggleBooth = (booth) => {
    setSelectedBooths((prev) =>
      prev.includes(booth) ? prev.filter((b) => b !== booth) : [...prev, booth]
    );
  };

  return (
    <div className="booth-map">
      {booths.map((booth) => (
        <div
          key={booth}
          className={`booth ${selectedBooths.includes(booth) ? 'selected' : ''}`}
          onClick={() => toggleBooth(booth)}
        >
          {booth}
        </div>
      ))}
    </div>
  );
}

export default BoothMap;
