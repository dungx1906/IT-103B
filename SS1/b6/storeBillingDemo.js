const storeName = "CircleK Tien Loi 24/7";
const cashierName = "Nguyen Thi Huong";
const itemName = "Banh Mi Cha Lua & Ca Phe Sua";

const rawItemPrice = "45000";
const rawQuantity = "2";
const rawDiscount = "10000";
const vatPercent = 8;
const rawCashGiven = "100000";

const itemPrice = Number(rawItemPrice);
const quantity = Number(rawQuantity);
const discount = Number(rawDiscount);
const cashGiven = Number(rawCashGiven);

const subtotal = itemPrice * quantity;

const discountedSubtotal = subtotal - discount;

const vatAmount = discountedSubtotal * (vatPercent / 100);

const totalDue = discountedSubtotal + vatAmount;

const changeAmount = cashGiven - totalDue;

console.log(`
================ HOA DON BAN LE ================

Cua hang: ${storeName}
Thu ngan: ${cashierName}
San pham: ${itemName} (x${quantity})
Tien hang: ${subtotal} VND
Giam gia khuyen mai: ${discount} VND
Tien sau giam gia: ${discountedSubtotal} VND
Thue VAT (${vatPercent}%): ${vatAmount} VND
------------------------------------------------
TONG TIEN PHAI TRA: ${totalDue} VND
Tien khach dua: ${cashGiven} VND
TIEN THOI LAI: ${changeAmount} VND
================================================
`);