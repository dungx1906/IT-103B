const vehicleType = "CAR_4";
const distanceKm = 8;
const isPeakHour = true;

let baseFare = 0;
let pricePerAdditionalKm = 0;
let totalFare = 0;
let peakFee = 0;

switch (vehicleType) {
  case "BIKE":
    baseFare = 12000;
    pricePerAdditionalKm = 4500;
    break;

  case "CAR_4":
    baseFare = 20000;
    pricePerAdditionalKm = 9000;
    break;

  case "CAR_7":
    baseFare = 25000;
    pricePerAdditionalKm = 11000;
    break;

  case "DELIVERY":
    baseFare = 15000;
    pricePerAdditionalKm = 5000;
    break;

  default:
    console.log("Loại phương tiện không tồn tại.");
}

if (
  vehicleType === "BIKE" ||
  vehicleType === "CAR_4" ||
  vehicleType === "CAR_7"
) {
  if (distanceKm <= 2) {
    totalFare = baseFare;
  } else {
    totalFare = baseFare + (distanceKm - 2) * pricePerAdditionalKm;
  }
} else if (vehicleType === "DELIVERY") {
  if (distanceKm <= 3) {
    totalFare = baseFare;
  } else {
    totalFare = baseFare + (distanceKm - 3) * pricePerAdditionalKm;
  }
}

if (isPeakHour) {
  peakFee = totalFare * 0.2;
  totalFare = totalFare * 1.2;
}

if (
  vehicleType === "BIKE" ||
  vehicleType === "CAR_4" ||
  vehicleType === "CAR_7" ||
  vehicleType === "DELIVERY"
) {
  console.log("Loại phương tiện:", vehicleType);
  console.log("Quãng đường:", distanceKm, "km");
  console.log("Cước ban đầu:", totalFare - peakFee, "VNĐ");
  console.log("Phụ phí cao điểm:", peakFee, "VNĐ");
  console.log("Tổng cước phải trả:", totalFare, "VNĐ");
}

