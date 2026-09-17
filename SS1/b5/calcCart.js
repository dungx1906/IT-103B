const rawItemPrice = "45000";
const rawItemQuantity = "2";
const rawBaseDeliveryFee = "16000";
const rawDeliveryDistance = "3.2";

const comboDiscountPercent = 10;

const itemPrice = Number(rawItemPrice);
const itemQuantity = Number(rawItemQuantity);

const rawSubtotal = itemPrice * itemQuantity;

const discountAmount = (rawSubtotal * comboDiscountPercent) / 100;

const foodTotalAfterDiscount = rawSubtotal - discountAmount;

const baseDeliveryFee = Number(rawBaseDeliveryFee);
const deliveryDistance = Number(rawDeliveryDistance);

const deliveryFee = baseDeliveryFee + deliveryDistance * 4000;

const finalPayment = foodTotalAfterDiscount + deliveryFee;

console.log(`
================ TINH CUOC COMBO ================

Tien mon sau giam: ${foodTotalAfterDiscount} VND
Phi giao hang: ${deliveryFee} VND
Tong thanh toan: ${finalPayment} VND

==================================================
`);