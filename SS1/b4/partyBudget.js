const partyHost = "Nguyen Van An";
const venueCost = 2000000;
const foodCostPerGuest = 150000;
const guestCount = 10;
const drinkCost = 500000;
const decorCost = 800000;
const targetBudget = 5000000;

const foodTotal = foodCostPerGuest * guestCount;

const totalPartyCost = venueCost + foodTotal + drinkCost + decorCost;

const costPerGuest = totalPartyCost / guestCount;

const budgetVariance = targetBudget - totalPartyCost;

console.log(`
================ DU TOAN NGAN SACH SINH NHAT ================

Chu nhan bua tiec: ${partyHost}

Chi phi thue dia diem: ${venueCost} VND
Tien do an: ${foodTotal} VND
Chi phi do uong: ${drinkCost} VND
Chi phi trang tri + banh kem: ${decorCost} VND

--------------------------------------------------------------
TONG CHI PHI: ${totalPartyCost} VND
CHI PHI BINH QUAN/KHACH: ${costPerGuest} VND
NGAN SACH DU KIEN: ${targetBudget} VND
CHENH LECH NGAN SACH: ${budgetVariance} VND
==============================================================
`);