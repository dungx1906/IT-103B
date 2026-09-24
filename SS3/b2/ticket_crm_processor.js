const customerName = "Tran Minh Duc";
const customerAge = 20;
const membershipTier = "GOLD";
const movieName = "Dune: Part Two";
const movieAgeRating = 16;
const seatTypeCode = 2;
const isWeekday = true;
const basePrice = 100000;

let seatTypeName = "";
let seatSurcharge = 0;
let discountPercent = 0;
let discountAmount = 0;
let discountedTicketPrice = 0;
let finalPayment = 0;
let pointRate = 0;
let membershipGift = "";
let rewardPoints = 0;
let isValid = true;

if (basePrice <= 0 || Number.isNaN(basePrice)) {
  console.error("Loi: Gia ve goc khong hop le!");
  isValid = false;
}

if (customerAge <= 0 || Number.isNaN(customerAge) || customerAge % 1 !== 0) {
  console.error("Loi: Tuoi khach hang khong hop le!");
  isValid = false;
}

if (isValid) {
  if (customerAge < movieAgeRating) {
    console.warn(
      `CANH BAO KIEM DUYET: Khach hang ${customerName} (${customerAge} tuoi) khong du dieu kien xem phim "${movieName}" (Yeu cau do tuoi toi thieu: ${movieAgeRating}+). Giao dich bi huy bo!`
    );
    isValid = false;
  }
}

if (isValid) {
  switch (seatTypeCode) {
    case 1:
      seatTypeName = "Standard";
      seatSurcharge = 0;
      break;

    case 2:
      seatTypeName = "VIP";
      seatSurcharge = 15000;
      break;

    case 3:
      seatTypeName = "Couple";
      seatSurcharge = 35000;
      break;

    default:
      console.error("Ma loai ghe khong ton tai!");
      isValid = false;
      break;
  }
}

if (isValid) {
  if (customerAge <= 12 || customerAge >= 60) {
    discountPercent = 30;
  } else if (customerAge > 12 && customerAge <= 22 && isWeekday === true) {
    discountPercent = 20;
  } else {
    discountPercent = 0;
  }

  switch (membershipTier) {
    case "DIAMOND":
      pointRate = 0.10;
      membershipGift = "Combo 1 Bap Rang + 2 Nuoc Ngot";
      break;

    case "GOLD":
      pointRate = 0.07;
      membershipGift = "1 Phan Nuoc Ngot Lon";
      break;

    case "SILVER":
      pointRate = 0.05;
      membershipGift = "Khong co";
      break;

    case "STANDARD":
      pointRate = 0.03;
      membershipGift = "Khong co";
      break;

    default:
      pointRate = 0;
      membershipGift = "Khong co";
      break;
  }

  const boardingLane =
    membershipTier === "DIAMOND" || membershipTier === "GOLD"
      ? "Loi Vao Uu Tien (VIP Priority Lane)"
      : "Loi Vao Tieu Chuan (Standard Lane)";

  discountAmount = basePrice * (discountPercent / 100);
  discountedTicketPrice = basePrice - discountAmount;
  finalPayment = discountedTicketPrice + seatSurcharge;

  rewardPoints = finalPayment * pointRate;

  console.log(`
========================================
  HE THONG VE PHIM CGV / LOTTE CINEMA
    PHIEU XAC NHAN GIAO DICH CRM
========================================
Khach hang          : ${customerName}
Do tuoi             : ${customerAge} tuoi
Hang thanh vien     : ${membershipTier}
Phim                : ${movieName} (Phan loai: C${movieAgeRating})
Loai ghe            : ${seatTypeName}
Ngay chieu          : ${isWeekday ? "Ngay thuong (Thu 2 - Thu 6)" : "Cuoi tuan (Thu 7 - Chu Nhat)"}
----------------------------------------
Gia ve goc          : ${basePrice.toLocaleString("vi-VN")} VND
Muc giam gia        : ${discountPercent}%
So tien duoc giam   : ${discountAmount.toLocaleString("vi-VN")} VND
Phu thu loai ghe    : ${seatSurcharge.toLocaleString("vi-VN")} VND
----------------------------------------
TONG THANH TOAN     : ${finalPayment.toLocaleString("vi-VN")} VND
----------------------------------------
QUYEN LOI CRM & DICH VU:
Qua tang kem        : ${membershipGift}
Diem thuong tich luy: ${rewardPoints.toLocaleString("vi-VN")} diem (Ty le: ${pointRate * 100}%)
Loi soat ve         : ${boardingLane}
========================================
  `);
}