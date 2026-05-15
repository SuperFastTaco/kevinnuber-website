(function () {
  const data = window.MARKET_DATA;
  const marketSelect = document.querySelector("#marketSelect");
  const startYear = document.querySelector("#startYear");
  const endYear = document.querySelector("#endYear");
  const returnsBody = document.querySelector("#returnsBody");
  const infoDialog = document.querySelector("#infoDialog");
  const dialogTitle = document.querySelector("#dialogTitle");
  const dialogBody = document.querySelector("#dialogBody");

  const outputs = {
    actualYears: document.querySelector("#actualYears"),
    limitedYears: document.querySelector("#limitedYears"),
    actualAverage: document.querySelector("#actualAverage"),
    limitedAverage: document.querySelector("#limitedAverage"),
    actualCagr: document.querySelector("#actualCagr"),
    limitedCagr: document.querySelector("#limitedCagr"),
    actualInvestment: document.querySelector("#actualInvestment"),
    limitedInvestment: document.querySelector("#limitedInvestment"),
  };

  const controls = {
    floor: {
      enabled: document.querySelector("#floorEnabled"),
      value: document.querySelector("#floorValue"),
    },
    buffer: {
      enabled: document.querySelector("#bufferEnabled"),
      value: document.querySelector("#bufferValue"),
    },
    cap: {
      enabled: document.querySelector("#capEnabled"),
      value: document.querySelector("#capValue"),
    },
    participation: {
      enabled: document.querySelector("#participationEnabled"),
      value: document.querySelector("#participationValue"),
    },
    spread: {
      enabled: document.querySelector("#spreadEnabled"),
      value: document.querySelector("#spreadValue"),
    },
    fee: {
      enabled: document.querySelector("#feeEnabled"),
      value: document.querySelector("#feeValue"),
    },
    multiYear: {
      enabled: document.querySelector("#multiYearEnabled"),
      value: document.querySelector("#multiYearValue"),
    },
  };

  const defaultMarket = "S&P 500 Price";
  const defaultStart = 2000;
  const defaultEnd = 2025;

  function option(value, label = value) {
    const el = document.createElement("option");
    el.value = value;
    el.textContent = label;
    return el;
  }

  function currentMarket() {
    return data.markets.find((market) => market.name === marketSelect.value);
  }

  function availableYears(market) {
    return market.returns.map((row) => row.year);
  }

  function fillMarketOptions() {
    data.markets.forEach((market) => {
      marketSelect.append(option(market.name));
    });
    marketSelect.value = data.markets.some((m) => m.name === defaultMarket)
      ? defaultMarket
      : data.markets[0].name;
  }

  function fillYearOptions(preferredStart, preferredEnd) {
    const market = currentMarket();
    const years = availableYears(market);
    const min = years[0];
    const max = years[years.length - 1];
    startYear.replaceChildren();
    endYear.replaceChildren();
    years.forEach((year) => {
      startYear.append(option(year));
      endYear.append(option(year));
    });

    const nextStart = years.includes(Number(preferredStart)) ? Number(preferredStart) : min;
    const nextEnd = years.includes(Number(preferredEnd)) ? Number(preferredEnd) : max;
    startYear.value = String(Math.min(nextStart, nextEnd));
    endYear.value = String(Math.max(nextStart, nextEnd));
  }

  function parsePercent(value) {
    const normalized = String(value).replace("%", "").replace(/,/g, "").trim();
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function readLimits() {
    return {
      floor: { enabled: controls.floor.enabled.checked, value: parsePercent(controls.floor.value.value) },
      buffer: { enabled: controls.buffer.enabled.checked, value: parsePercent(controls.buffer.value.value) },
      cap: { enabled: controls.cap.enabled.checked, value: parsePercent(controls.cap.value.value) },
      participation: {
        enabled: controls.participation.enabled.checked,
        value: parsePercent(controls.participation.value.value),
      },
      spread: { enabled: controls.spread.enabled.checked, value: parsePercent(controls.spread.value.value) },
      fee: { enabled: controls.fee.enabled.checked, value: parsePercent(controls.fee.value.value) },
      multiYear: {
        enabled: controls.multiYear.enabled.checked,
        value: Math.max(1, Math.floor(Number(controls.multiYear.value.value) || 1)),
      },
    };
  }

  function applyAnnualLimits(returnPct, limits) {
    let limited = returnPct;

    if (limits.participation.enabled && limited > 0) {
      limited *= limits.participation.value / 100;
    }
    if (limits.cap.enabled) {
      limited = Math.min(limited, limits.cap.value);
    }
    if (limits.spread.enabled && limited > 0) {
      limited = Math.max(limited - limits.spread.value, 0);
    }
    if (limits.buffer.enabled && limited < 0) {
      limited = Math.min(limited + limits.buffer.value, 0);
    }
    if (limits.floor.enabled) {
      limited = Math.max(limited, limits.floor.value);
    }
    if (limits.fee.enabled) {
      limited -= limits.fee.value;
    }

    return limited;
  }

  function limitedReturns(rows, limits) {
    if (!limits.multiYear.enabled) {
      return rows.map((row) => applyAnnualLimits(row.return, limits));
    }

    const yearsPerCredit = limits.multiYear.value;
    const values = Array(rows.length).fill(0);
    for (let i = 0; i + yearsPerCredit <= rows.length; i += yearsPerCredit) {
      const groupGrowth = rows
        .slice(i, i + yearsPerCredit)
        .reduce((value, row) => value * (1 + row.return / 100), 1);
      const groupReturn = (groupGrowth - 1) * 100;
      values[i + yearsPerCredit - 1] = applyAnnualLimits(groupReturn, limits);
    }
    return values;
  }

  function formatPercent(value) {
    return `${value.toFixed(2)}%`;
  }

  function formatCurrency(value) {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  function signedClass(value) {
    if (value > 0) return "positive";
    if (value < 0) return "negative";
    return "";
  }

  function mean(values) {
    return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
  }

  function cagr(finalValue, years) {
    if (!years || finalValue <= 0) return 0;
    return (Math.pow(finalValue, 1 / years) - 1) * 100;
  }

  function selectedRows() {
    const market = currentMarket();
    const start = Number(startYear.value);
    const end = Number(endYear.value);
    const low = Math.min(start, end);
    const high = Math.max(start, end);
    return market.returns.filter((row) => row.year >= low && row.year <= high);
  }

  function render() {
    const rows = selectedRows();
    const limits = readLimits();
    const limited = limitedReturns(rows, limits);
    let actualInvestment = 1;
    let limitedInvestment = 1;

    const renderedRows = rows.map((row, index) => {
      actualInvestment *= 1 + row.return / 100;
      limitedInvestment *= 1 + limited[index] / 100;
      return {
        year: row.year,
        actualReturn: row.return,
        limitedReturn: limited[index],
        actualInvestment,
        limitedInvestment,
      };
    });

    const years = rows.length;
    const actualAverage = mean(rows.map((row) => row.return));
    const limitedAverage = mean(limited);

    outputs.actualYears.value = years;
    outputs.limitedYears.value = years;
    outputs.actualAverage.value = formatPercent(actualAverage);
    outputs.limitedAverage.value = formatPercent(limitedAverage);
    outputs.actualCagr.value = formatPercent(cagr(actualInvestment, years));
    outputs.limitedCagr.value = formatPercent(cagr(limitedInvestment, years));
    outputs.actualInvestment.value = formatCurrency(actualInvestment);
    outputs.limitedInvestment.value = formatCurrency(limitedInvestment);

    returnsBody.replaceChildren(
      ...renderedRows.map((row) => {
        const tr = document.createElement("tr");
        const cells = [
          String(row.year),
          formatPercent(row.actualReturn),
          formatPercent(row.limitedReturn),
          formatCurrency(row.actualInvestment),
          formatCurrency(row.limitedInvestment),
        ];
        cells.forEach((cell, index) => {
          const td = document.createElement("td");
          td.textContent = cell;
          if (index === 1) td.className = signedClass(row.actualReturn);
          if (index === 2) td.className = signedClass(row.limitedReturn);
          tr.append(td);
        });
        return tr;
      })
    );
  }

  function syncLimitInputs() {
    Object.values(controls).forEach((control) => {
      control.value.disabled = !control.enabled.checked;
    });
    render();
  }

  function normalizePercentInput(input) {
    if (input.type === "number") return;
    input.value = `${parsePercent(input.value)}%`;
  }

  function openDialog(title, body) {
    dialogTitle.textContent = title;
    dialogBody.textContent = body;
    infoDialog.showModal();
  }

  fillMarketOptions();
  fillYearOptions(defaultStart, defaultEnd);

  marketSelect.addEventListener("change", () => {
    fillYearOptions(startYear.value, endYear.value);
    render();
  });
  startYear.addEventListener("change", render);
  endYear.addEventListener("change", render);

  Object.values(controls).forEach((control) => {
    control.enabled.addEventListener("change", syncLimitInputs);
    control.value.addEventListener("input", render);
    control.value.addEventListener("blur", () => {
      normalizePercentInput(control.value);
      render();
    });
  });

  document.querySelector("#docsButton").addEventListener("click", () => {
    openDialog("Documentation", data.documentationText || "Annual Market Returns");
  });

  document.querySelector("#sourceButton").addEventListener("click", () => {
    openDialog("Historical Market Index Sources", data.sourceText || "");
  });

  document.querySelector("#closeDialog").addEventListener("click", () => infoDialog.close());

  syncLimitInputs();
})();
