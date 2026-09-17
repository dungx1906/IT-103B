// Dữ liệu tiếp nhận từ biểu mẫu đơn hàng dạng chuỗi ký tự thô
const customerName = "Nguyen Thi Mai";
const foodItemName = "Com Tam Suon Bi Cha";
const rawFoodPrice = "55000";
const rawToppingPrice = "15000";
const rawDeliveryFee = "20000";
const voucherDiscount = 10000;

// 1. Tính tổng giá trị món ăn (Đang phát sinh lỗi nối chuỗi)
const foodTotal = Number(rawFoodPrice) + Number(rawToppingPrice);

// 2. Tính toán tổng số tiền thanh toán cuối cùng (Tiếp tục bị lỗi nối chuỗi)
const finalPayment = foodTotal + Number(rawDeliveryFee) - voucherDiscount;

// 3. Xuất kết quả kiểm tra ra bảng điều khiển Console
console.log(`Khách hàng: ${customerName}`);
console.log(`Món ăn: ${foodItemName}`);
console.log(`Tổng tiền món ăn: ${foodTotal} VND`);
console.log(`Số tiền thanh toán thực tế: ${finalPayment} VND`);