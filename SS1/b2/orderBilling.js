const customerName = "Nguyen Van An";
const rawMainDishPrice = "120000";
const rawDrinkPrice = "35000";
const rawQuantity = "2";
const rawDistanceKm = "3.5";
const openingDiscount = 20000;
const vatRate = 0.08;


const foodSubtotal = (Number(rawMainDishPrice) + Number(rawDrinkPrice)) * Number(rawQuantity)
const discountedTotal = foodSubtotal - openingDiscount
const vatAmount = discountedTotal * vatRate
const shippingFee = 15000 + Number(rawDistanceKm) * 4000
const finalPayment = discountedTotal + vatAmount + shippingFee

console.log(`
=============== HÓA ĐƠN ĐẶT MÓN ===============
Khách hàng: ${customerName} VND
Tiền món ăn: ${foodSubtotal} VND
Chiết khấu khai trương: ${openingDiscount} VND
Tiền sau chiết khấu: ${discountedTotal} VND
Thuế VAT (8%): ${vatAmount} VND
Cước vận chuyển: ${shippingFee} VND
-----------------------------------------------
TỔNG THANH TOÁN THỰC TẾ: ${finalPayment} VND
===============================================
    `);