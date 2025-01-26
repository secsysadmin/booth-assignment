// tester.js
import { generateCompanyMap } from "./processData.js";

// sample CSV-like array
const preferencesSheet = [
  ["Company Name", "Booths", "Wednesday", "Thursday", "Target"],
  ["Matadors", "3", "Yes", "", "A1-A3"],
  ["Spartans", "4", "", "Yes", "A4-A6, C1-C3"],
  ["Vikings", "2", "Yes", "Yes", ""],         // no target => assigned everywhere
  ["Raptors", "3", "Yes", "Yes", "A10-A12, B1-B3"],
  ["Dragons", "1", "Yes", "", "A5"],
];

// generate a map for a 2x6 layout in a single aisle "A"
const { companyMap, companiesMap } = generateCompanyMap(
  preferencesSheet,
  6,  // rows
  2,  // cols
  {
    aisles: "ABC",          // just aisle A
    rows: 6,
    cols: 2,
    subsectionCount: 4,   // A1, A2, A3, A4, each with 3 booths
  }
);

console.log("=== subsection -> companies ===");
console.dir(companyMap, { depth: null });
