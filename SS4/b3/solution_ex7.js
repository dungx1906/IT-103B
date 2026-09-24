const PRICE_S = 35000;
const PRICE_M = 42000;
const PRICE_L = 48000;
const PRICE_T = 10000;

const table1 = "MLT";
const table2 = "SSX";
const table3 = "LLTT";

const totalTables = 3;

let shiftRevenue = 0;

for (let tableIndex = 1; tableIndex <= totalTables; tableIndex++) {
  let orderItems = "";
  let tableBill = 0;

  if (tableIndex === 1) {
    orderItems = table1;
  } else if (tableIndex === 2) {
    orderItems = table2;
  } else {
    orderItems = table3;
  }

  console.log(`\n========== BAN ${tableIndex} ==========`);

  for (let itemIndex = 0; itemIndex < orderItems.length; itemIndex++) {
    const currentItem = orderItems[itemIndex];

    if (currentItem === "X") {
      console.log("Mon X: Da huy, khong tinh tien");
      continue;
    }

    if (currentItem === "S") {
      tableBill += PRICE_S;
      console.log(`Size S: ${PRICE_S} VND`);
    } else if (currentItem === "M") {
      tableBill += PRICE_M;
      console.log(`Size M: ${PRICE_M} VND`);
    } else if (currentItem === "L") {
      tableBill += PRICE_L;
      console.log(`Size L: ${PRICE_L} VND`);
    } else if (currentItem === "T") {
      tableBill += PRICE_T;
      console.log(`Topping T: ${PRICE_T} VND`);
    }
  }

  const originalBill = tableBill;
  let discountAmount = 0;

  if (tableBill > 100000) {
    discountAmount = tableBill * 0.1;
    tableBill = tableBill - discountAmount;
  }

  shiftRevenue += tableBill;

  console.log("------------------------------");
  console.log(`Tong tien goc: ${originalBill} VND`);
  console.log(`Giam gia: ${discountAmount} VND`);
  console.log(`Thanh toan: ${tableBill} VND`);
}

console.log("\n========== TONG KET CA ==========");
console.log(`Tong doanh thu: ${shiftRevenue} VND`);