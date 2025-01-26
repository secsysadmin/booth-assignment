/***********************
 * SHEETCOMPILER CLASS
 ***********************/
export class SheetCompiler {
  constructor(preferencesSheet, rows, cols) {
    const [headerRow, ...dataRows] = preferencesSheet;

    this.requiredFields = ["Company Name", "Booths", "Wednesday", "Thursday", "Target"];
    this.headerMap = headerRow.reduce((map, field, idx) => {
      map[field.trim()] = idx;
      return map;
    }, {});

    this.companyData = [];
    this.rows = rows;
    this.cols = cols;

    this.compile(dataRows);
  }

  compile(dataRows) {
    for (const field of this.requiredFields) {
      if (this.headerMap[field] == null) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    dataRows.forEach((row, i) => {
      const rowNumber = i + 2; // 0-indexed + header row
      const companyName = row[this.headerMap["Company Name"]]?.trim();
      const boothCountStr = row[this.headerMap["Booths"]]?.trim();
      const wedStr = row[this.headerMap["Wednesday"]]?.trim();
      const thuStr = row[this.headerMap["Thursday"]]?.trim();
      const targetStr = row[this.headerMap["Target"]]?.trim();

      if (!companyName) {
        console.error(`row ${rowNumber}: missing company name`);
        return;
      }
      if (!wedStr && !thuStr) {
        console.error(`row ${rowNumber}: must select at least Wed or Thu`);
        return;
      }

      const boothCount = parseInt(boothCountStr, 10);
      if (isNaN(boothCount) || boothCount <= 0) {
        console.error(`row ${rowNumber}: invalid booth count`);
        return;
      }

      if (targetStr) {
        const ranges = targetStr.split(",");
        const rangeRegex = /^[A-P]\d+-[A-P]\d+$/;
        const singleRegex = /^[A-P]\d+$/;
        for (const rng of ranges) {
          const trimmed = rng.trim();
          if (!rangeRegex.test(trimmed) && !singleRegex.test(trimmed)) {
            console.error(`row ${rowNumber}: invalid target format (${trimmed})`);
            return;
          }
        }
      }

      this.companyData.push({
        companyName,
        boothCount,
        isWednesday: Boolean(wedStr),
        isThursday: Boolean(thuStr),
        target: targetStr || "",
      });
    });
  }
}

/***********************
 * FLOORLAYOUT CLASS
 ***********************/
export class FloorLayout {
  constructor(config = {}) {
    this.aisles = config.aisles || "ABCDEFGHIJKLMNOP";
    this.rows = config.rows || rows;
    this.cols = config.cols || cols;
    this.subsectionCount = config.subsectionCount || 4;

    const totalBoothsPerAisle = (this.rows * 2);
    this.boothsPerSubsection = this.calcSubsections(totalBoothsPerAisle);

    this.boothMap = {};
    
    this.generateBooths();
  }

  calcSubsections(total) {
    const base = Math.floor(total / 4);
    let remainder = total % 4;
  
    return Array.from({ length: 4 }, (_, i) => {
      if (i === 0 || i === 3) return base; 
      return base + (remainder-- > 0 ? 1 : 0); 
    });
  }
  

  generateBooths() {
    for (const aisle of this.aisles) {
      let boothCounter = 1;
      for (let s = 1; s <= this.subsectionCount; s++) {
        const subsectionKey = `${aisle}${s}`;
        const count = this.boothsPerSubsection[s - 1];
        const booths = Array.from({ length: count }, () => `${aisle}${boothCounter++}`);

        this.boothMap[subsectionKey] = booths;
      }
    }
  }


  getSubsectionForBooth(boothId) {
    for (const [sub, boothArray] of Object.entries(this.boothMap)) {
      if (boothArray.includes(boothId)) return sub;
    }
    return null;
  }
}

/***********************
 * COMPANYPROCESSOR CLASS
 ***********************/
export class CompanyProcessor {
  constructor(floorLayout) {
    this.floorLayout = floorLayout;
    this.companyMap = {};
    this.companiesMap = {};

    for (const subsectionKey of Object.keys(floorLayout.boothMap)) {
      this.companyMap[subsectionKey] = [];
    }
  }

  processCompany(company) {
    const { companyName, boothCount, isWednesday, isThursday, target } = company;

    const companyObj = {
      companyName,
      boothCount,
      isWednesday,
      isThursday,
      target: target ? target.split(",").map(r => r.trim()) : [],
      targetFlat: {},
      targetBoothCount: 0,
    };

    if (companyObj.target.length) {
      this.parseTargets(companyObj);
    }

    this.companiesMap[companyName] = companyObj;
    this.assignSubsections(companyObj);
  }

  parseTargets(companyObj) {
    for (const range of companyObj.target) {
      const trimmed = range.trim();
      if (!trimmed.includes('-')) {
        // Handle single booth target
        const boothID = trimmed;
        const subsection = this.floorLayout.getSubsectionForBooth(boothID);
        if (!subsection) continue;

        if (!companyObj.targetFlat[subsection]) {
          companyObj.targetFlat[subsection] = [];
        }
        companyObj.targetFlat[subsection].push(boothID);
        companyObj.targetBoothCount++;
        continue;
      }

      const [start, end] = trimmed.split("-").map(x => x.trim());
      const aisle = start[0];
      const startNum = parseInt(start.slice(1), 10);
      const endNum = parseInt(end.slice(1), 10);

      for (let b = startNum; b <= endNum; b++) {
        const boothID = `${aisle}${b}`;
        const subsection = this.floorLayout.getSubsectionForBooth(boothID);
        if (!subsection) continue;

        if (!companyObj.targetFlat[subsection]) {
          companyObj.targetFlat[subsection] = [];
        }
        companyObj.targetFlat[subsection].push(boothID);
        companyObj.targetBoothCount++;
      }
    }
  }

  assignSubsections(companyObj) {
    if (!companyObj.target.length) {
      companyObj.target = [];
      for (const subsectionKey in this.companyMap) {
        this.companyMap[subsectionKey].push(companyObj);

        if (!companyObj.targetFlat[subsectionKey]) {
          companyObj.targetFlat[subsectionKey] = [];
        }
        companyObj.targetFlat[subsectionKey].push(...this.floorLayout.boothMap[subsectionKey]);

        const booths = this.floorLayout.boothMap[subsectionKey];
        companyObj.target.push(`${booths[0]}-${booths[booths.length - 1]}`);
      }

      companyObj.targetBoothCount = Object.values(companyObj.targetFlat).flat().length;
    } else {
      for (const subsectionKey in companyObj.targetFlat) {
        this.companyMap[subsectionKey].push(companyObj);
      }
    }
  }
}

/***********************
 * MASTER FUNCTION
 ***********************/
export function generateCompanyMap(preferencesSheet, rows, cols, layoutConfig = {}) {
  const compiler = new SheetCompiler(preferencesSheet, rows, cols);

  const defaultConfig = {
    aisles: layoutConfig.aisles || "ABCDEFGHIJKLMNOP",
    rows: layoutConfig.rows || rows,
    cols: layoutConfig.cols || cols,
    subsectionCount: layoutConfig.subsectionCount || 4,
  };

  const floorLayout = new FloorLayout(defaultConfig);
  const processor = new CompanyProcessor(floorLayout);

  compiler.companyData.forEach(company => {
    processor.processCompany(company);
  });

  return {
    companyMap: processor.companyMap,
    companiesMap: processor.companiesMap,
  };
}
