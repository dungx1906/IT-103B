const distanceKm = 8;
const isPeakHour = true;
const memberTier = "GOLD";

const baseFare = 12000;
const pricePerAdditionalKm = 4500;
const peakMultiplier = 1.2;

let totalFare = 0;
let discountRate = 0;
let maxDiscount = 0;
let discount = 0;
let finalFare = 0;

if (distanceKm <= 2) {
  totalFare = baseFare;
} else {
  totalFare = baseFare + (distanceKm - 2) * pricePerAdditionalKm;
}

let peakFee = 0;

if (isPeakHour) {
  peakFee = totalFare * 0.2;
  totalFare = totalFare * peakMultiplier;
}

switch (memberTier) {
  case "PLATINUM":
    discountRate = 0.15;
    maxDiscount = 30000;
    break;

  case "GOLD":
    discountRate = 0.10;
    maxDiscount = 20000;
    break;

  case "SILVER":
    discountRate = 0.05;
    maxDiscount = 10000;
    break;

  case "STANDARD":
  default:
    discountRate = 0;
    maxDiscount = 0;
    break;
}

discount = totalFare * discountRate;

discount = discount > maxDiscount ? maxDiscount : discount;

finalFare = totalFare - discount;

finalFare = finalFare < 12000 ? 12000 : finalFare;

console.log("Cước ban đầu:", totalFare - peakFee, "VNĐ");
console.log("Phụ phí giờ cao điểm:", peakFee, "VNĐ");
console.log("Mức giảm giá hội viên:", discount, "VNĐ");
console.log("Cước thanh toán cuối cùng:", finalFare, "VNĐ");

