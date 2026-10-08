const bookingReservation = {
  bookingId: "BK-2024-8891",
  guestName: "Trần Minh Quang",
  roomType: "Deluxe Ocean View",
  roomPrice: 1500000,
  checkInHour: 9,
  discountCode: "SUMMER10"
};

const isVoucherValid = false;

const priceKey = "roomPrice";

// Sửa lỗi 1: Dùng Bracket Notation để truy cập thuộc tính động
const basePrice = bookingReservation[priceKey];

let earlySurcharge = 0;

if (bookingReservation.checkInHour < 12) {
  earlySurcharge = basePrice * 0.3;
  bookingReservation.earlySurcharge = earlySurcharge;
}

const totalAmount = basePrice + earlySurcharge;
bookingReservation.totalAmount = totalAmount;

// Sửa lỗi 2: Dùng delete để xóa thuộc tính không hợp lệ
if (!isVoucherValid) {
  delete bookingReservation.discountCode;
}

console.log("--- CHI TIẾT PHIẾU ĐẶT PHÒNG ---");

// Sửa lỗi 3: Dùng Bracket Notation trong vòng lặp for...in
for (const key in bookingReservation) {
  console.log(key + ": " + bookingReservation[key]);
}

// Kiểm tra thuộc tính discountCode đã bị xóa
console.log(
  "discountCode còn tồn tại:",
  "discountCode" in bookingReservation
);