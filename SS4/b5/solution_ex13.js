const PRICE_S = 35000;
const PRICE_M = 42000;
const PRICE_L = 48000;
const PRICE_T = 10000;

const MAX_DRINKS = 5;

const orders = [
  {
    orderId: "HD001",
    drinks: "MLT",
    memberStatus: "GOLD"
  },
  {
    orderId: "HD002",
    drinks: "SSX",
    memberStatus: "STANDARD"
  },
  {
    orderId: "HD003",
    drinks: "LLTT",
    memberStatus: "GOLD"
  },
  {
    orderId: "HD004",
    drinks: "",
    memberStatus: "STANDARD"
  },
  {
    orderId: "HD005",
    drinks: "XXXXX",
    memberStatus: "GOLD"
  },
  {
    orderId: "HD006",
    drinks: "SSMLTS",
    memberStatus: "STANDARD"
  }
];

let shiftRevenue = 0;

for (let orderIndex = 0; orderIndex < orders.length; orderIndex++) {
  const currentOrder = orders[orderIndex];

  let orderTotal = 0;
  let validDrinkCount = 0;

  console.log(`\n===== ${currentOrder.orderId} =====`);

  if (currentOrder.drinks === "") {
    console.log("Don hang rong.");
    continue;
  }

  for (
    let drinkIndex = 0;
    drinkIndex < currentOrder.drinks.length;
    drinkIndex++
  ) {
    if (validDrinkCount >= MAX_DRINKS) {
      console.log("Don hang vuot qua gioi han 5 mon.");
      break;
    }

    const currentDrink = currentOrder.drinks[drinkIndex];

    if (currentDrink === "X") {
      console.log("Mon X: Da huy.");
      continue;
    }

    if (currentDrink === "S") {
      orderTotal += PRICE_S;
      validDrinkCount++;
    } else if (currentDrink === "M") {
      orderTotal += PRICE_M;
      validDrinkCount++;
    } else if (currentDrink === "L") {
      orderTotal += PRICE_L;
      validDrinkCount++;
    } else if (currentDrink === "T") {
      orderTotal += PRICE_T;
      validDrinkCount++;
    }
  }

  if (validDrinkCount === 0) {
    console.log("Tat ca mon trong don da bi huy.");
    continue;
  }

  let discount = 0;

  if (currentOrder.memberStatus === "GOLD") {
    discount = orderTotal * 0.1;
  }

  const finalAmount = orderTotal - discount;

  shiftRevenue += finalAmount;

  console.log("Tien truoc giam:", orderTotal, "VND");
  console.log("Giam gia:", discount, "VND");
  console.log("Thanh toan:", finalAmount, "VND");
}

console.log("\n===== TONG KET CA =====");
console.log("Tong doanh thu:", shiftRevenue, "VND");