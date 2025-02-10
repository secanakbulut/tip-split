// tip-split
// vanilla js, no deps. money math is done in integer cents to avoid float drift.

const $ = (id) => document.getElementById(id);

const bill = $("bill");
const tip = $("tip");
const tipOut = $("tipOut");
const people = $("people");

const outBill = $("outBill");
const outTip = $("outTip");
const outTotal = $("outTotal");
const outPlain = $("outPlain");
const exactNote = $("exactNote");

const modeA = $("modeA");
const modeB = $("modeB");
const modeC = $("modeC");

function fmt(cents) {
  const sign = cents < 0 ? "-" : "";
  const abs = Math.abs(cents);
  const d = Math.floor(abs / 100);
  const c = abs % 100;
  return `${sign}$${d.toLocaleString("en-US")}.${String(c).padStart(2, "0")}`;
}

function fmtSigned(cents) {
  if (cents === 0) return "$0.00 (exact)";
  return (cents > 0 ? "+" : "") + fmt(cents);
}

function compute() {
  const billN = Math.max(0, parseFloat(bill.value) || 0);
  const tipPct = parseInt(tip.value, 10) || 0;
  const n = Math.max(1, parseInt(people.value, 10) || 1);

  tipOut.textContent = tipPct;

  // work in integer cents
  const billCents = Math.round(billN * 100);
  const tipCents = Math.round(billCents * tipPct / 100);
  const totalCents = billCents + tipCents;

  outBill.textContent = fmt(billCents);
  outTip.textContent = fmt(tipCents);
  outTotal.textContent = fmt(totalCents);

  const plainEachExact = totalCents / n;
  outPlain.textContent = fmt(Math.round(plainEachExact));

  if (totalCents % n === 0) {
    exactNote.textContent = "this one divides evenly. all three modes match.";
  } else {
    const remainder = totalCents % n;
    exactNote.textContent = `${totalCents} cents does not divide evenly across ${n}. remainder is ${remainder} cent${remainder === 1 ? "" : "s"}.`;
  }

  // mode A: round each to nearest cent, last person absorbs the diff
  const eachA = Math.round(plainEachExact);
  const sumFirst = eachA * (n - 1);
  const lastA = totalCents - sumFirst;
  const paidA = sumFirst + lastA;
  setMode(modeA, {
    each: fmt(eachA),
    last: fmt(lastA),
    paid: fmt(paidA),
    diff: fmtSigned(paidA - totalCents),
  });

  // mode B: round each share up to whole currency unit
  const eachB = Math.ceil(totalCents / n / 100) * 100;
  const paidB = eachB * n;
  setMode(modeB, {
    each: fmt(eachB),
    paid: fmt(paidB),
    diff: fmtSigned(paidB - totalCents),
  });

  // mode C: ceil per person to next cent
  const eachC = Math.ceil(plainEachExact);
  const paidC = eachC * n;
  setMode(modeC, {
    each: fmt(eachC),
    paid: fmt(paidC),
    diff: fmtSigned(paidC - totalCents),
  });
}

function setMode(el, vals) {
  for (const key of Object.keys(vals)) {
    const target = el.querySelector(`[data-${key}]`);
    if (target) target.textContent = vals[key];
  }
}

[bill, tip, people].forEach((el) => {
  el.addEventListener("input", compute);
});

compute();
