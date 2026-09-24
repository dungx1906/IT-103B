const drinkName = "Phin Sữa Đá";
const basePrice = 29000;
const drinkSize = "M";
const toppingsPerCup = 2;
const orderQuantity = 3;
const isGoldMember = true;
const toppingPrice = 8000;

let sizeUpcharge = 0;

if (drinkSize === "M") {
  sizeUpcharge = 6000;
} else if (drinkSize === "L") {
  sizeUpcharge = 10000;
}

const singleCupPrice =
  basePrice + sizeUpcharge + toppingsPerCup * toppingPrice;

let totalBill = 0;

for (let cupIndex = 1; cupIndex <= orderQuantity; cupIndex++) {
  totalBill += singleCupPrice;
}

if (isGoldMember) {
  totalBill = totalBill * 0.9;
}

console.log("Tên đồ uống:", drinkName);
console.log("Số lượng:", orderQuantity, "ly");
console.log("Giá 1 ly:", singleCupPrice, "VNĐ");
console.log("Tổng thanh toán:", totalBill, "VNĐ");