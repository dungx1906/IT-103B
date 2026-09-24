const tripId = "GRB-10001";
const distanceKm = 8;
const isPeakHour = true;
const maxDistanceKm = 50;

let tripStatus = "BOOKED";

const baseFare = 12000;
const pricePerAdditionalKm = 4500;
const peakMultiplier = 1.2;

let totalFare = 0;
let cancellationFee = 0;

switch (tripStatus) {
  case "BOOKED":
    console.log("Chuyến xe đang chờ tài xế nhận.");
    break;

  case "PICKING_UP":
    console.log("Tài xế đang đến đón khách.");
    break;

  case "IN_TRANSIT":
    console.log("Chuyến xe đang di chuyển.");
    break;

  case "COMPLETED":
    console.log("Chuyến xe đã hoàn tất.");

    if (distanceKm > maxDistanceKm) {
      console.log("Quãng đường vượt quá giới hạn cho phép.");
    } else {
      if (distanceKm <= 2) {
        totalFare = baseFare;
      } else {
        totalFare =
          baseFare + (distanceKm - 2) * pricePerAdditionalKm;
      }

      if (isPeakHour) {
        totalFare = totalFare * peakMultiplier;
      }

      console.log("Tổng cước chuyến đi:", totalFare, "VNĐ");
    }
    break;

  case "CANCELLED":
    console.log("Chuyến xe đã bị hủy.");

    if (tripStatus === "BOOKED") {
      cancellationFee = 0;
    } else {
      cancellationFee = 10000;
    }

    console.log("Phí hủy chuyến:", cancellationFee, "VNĐ");
    break;

  default:
    console.log("Trạng thái chuyến xe không hợp lệ.");
}

console.log("Mã chuyến đi:", tripId);
console.log("Trạng thái:", tripStatus);

