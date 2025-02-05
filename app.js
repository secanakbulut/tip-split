// tip-split
// vanilla js. basic split for now.

const $ = (id) => document.getElementById(id);

const bill = $("bill");
const tip = $("tip");
const tipOut = $("tipOut");
const people = $("people");

const outBill = $("outBill");
const outTip = $("outTip");
const outTotal = $("outTotal");
const outPlain = $("outPlain");

function fmt(n) {
  return "$" + n.toFixed(2);
}

function compute() {
  const billN = Math.max(0, parseFloat(bill.value) || 0);
  const tipPct = parseInt(tip.value, 10) || 0;
  const n = Math.max(1, parseInt(people.value, 10) || 1);

  tipOut.textContent = tipPct;

  const tipAmt = billN * tipPct / 100;
  const total = billN + tipAmt;
  const each = total / n;

  outBill.textContent = fmt(billN);
  outTip.textContent = fmt(tipAmt);
  outTotal.textContent = fmt(total);
  outPlain.textContent = fmt(each);
}

[bill, tip, people].forEach((el) => {
  el.addEventListener("input", compute);
});

compute();
