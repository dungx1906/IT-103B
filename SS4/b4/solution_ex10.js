// 1. FOR - Quet danh sach mon
const order = "MLT";

for (let i = 0; i < order.length; i++) {
  console.log("Dang quet mon:", order[i]);
}


// 2. WHILE - Nhan don den khi chot ca
let orderStatus = "OPEN";

while (orderStatus !== "CLOSED") {
  console.log("Dang nhan don hang...");
  orderStatus = "CLOSED";
}


// 3. DO-WHILE - Xac nhan thanh toan
let confirmPayment;

do {
  confirmPayment = "YES";
  console.log("Xac nhan thanh toan:", confirmPayment);
} while (confirmPayment !== "YES");