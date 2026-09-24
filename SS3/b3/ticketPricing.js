const customerAge = 19;
const movieRating = "T18";
const seatType = "VIP";
const roomFormatCode = 2;
const dayOfWeek = 4;
const isStudent = true;
const isPhysicalTicket = true;
const comboOptionCode = 1;

let isOrderValid = true;

let baseSeatPrice = 0;
let seatDescription = "";

let roomSurcharge = 0;
let roomFormatName = "";

let discountAmount = 0;
let netTicketPrice = 0;

let comboFee = 0;
let comboName = "";

let physicalTicketFee = 0;
let totalPayable = 0;

let logisticsGift = "";

if (
  !Number.isInteger(customerAge) ||
  isNaN(customerAge) ||
  customerAge < 1 ||
  customerAge > 120
) {
  console.error("[LOI] Du lieu do tuoi khong hop le.");
  isOrderValid = false;
}

if (isOrderValid) {
  switch (movieRating) {
    case "P":
      break;

    case "T13":
      if (customerAge < 13) {
        console.warn(
          "[TU CHOI] Khán giả không đủ độ tuổi theo quy định của bộ phim."
        );
        isOrderValid = false;
      }
      break;

    case "T16":
      if (customerAge < 16) {
        console.warn(
          "[TU CHOI] Khán giả không đủ độ tuổi theo quy định của bộ phim."
        );
        isOrderValid = false;
      }
      break;

    case "T18":
      if (customerAge < 18) {
        console.warn(
          "[TU CHOI] Khán giả không đủ độ tuổi theo quy định của bộ phim."
        );
        isOrderValid = false;
      }
      break;

    default:
      console.error("[LOI] Ma phan loai phim khong ton tai.");
      isOrderValid = false;
      break;
  }
}

if (isOrderValid) {
  if (seatType === "STANDARD") {
    baseSeatPrice = 80000;
    seatDescription = "Ghe Tieu Chuan";
  } else if (seatType === "VIP") {
    baseSeatPrice = 95000;
    seatDescription = "Ghe VIP";
  } else if (seatType === "COUPLE") {
    baseSeatPrice = 160000;
    seatDescription = "Ghe Doi Sweetbox";
  } else {
    baseSeatPrice = 0;
    isOrderValid = false;
    console.error("[LOI] Hang ghe khong hop le.");
  }
}

if (isOrderValid) {
  switch (roomFormatCode) {
    case 1:
      roomFormatName = "2D Tieu Chuan";
      roomSurcharge = 0;
      break;

    case 2:
      roomFormatName = "3D IMAX (Kem Kinh Chuyen Dung)";
      roomSurcharge = 40000;
      break;

    case 3:
      roomFormatName = "4DX Da Giac Quan (Chuyen Dong & Hieu Ung)";
      roomSurcharge = 60000;
      break;

    default:
      roomFormatName = "";
      roomSurcharge = 0;
      isOrderValid = false;
      console.error("[LOI] Dinh dang phong chieu khong ton tai.");
      break;
  }
}

if (isOrderValid) {
  if (
    isStudent === true &&
    dayOfWeek >= 2 &&
    dayOfWeek <= 6
  ) {
    discountAmount = baseSeatPrice * 0.2;
  } else {
    discountAmount = 0;
  }

  netTicketPrice = baseSeatPrice - discountAmount;
}

if (isOrderValid) {
  switch (comboOptionCode) {
    case 0:
      comboName = "Khong chon bap nuoc";
      comboFee = 0;
      break;

    case 1:
      comboName = "Solo Box (1 Bap Ngot + 1 Nuoc)";
      comboFee = 65000;
      break;

    case 2:
      comboName = "Couple Box (1 Bap Ngot + 2 Nuoc + 1 Snack)";
      comboFee = 99000;
      break;

    default:
      comboName = "Goi khong hop le";
      comboFee = 0;
      console.warn(
        "[CANH BAO] Ma combo khong hop le, chuyen ve mac dinh khong su dung."
      );
      break;
  }
}

if (isOrderValid) {
  const physicalTicketFee = isPhysicalTicket === true ? 5000 : 0;

  totalPayable =
    netTicketPrice +
    roomSurcharge +
    comboFee +
    physicalTicketFee;

  const logisticsGift =
    totalPayable >= 200000
      ? "Voucher Bap Ngot Mien Phi Suat Chieu Ke Tiep"
      : "Khong co qua tang kem";

  console.log(`
========================================
 PHIEU DIEU PHOI HAU CAN VA VE XEM PHIM
========================================
Do tuoi khan gia     : ${customerAge} tuoi (Mac phim: ${movieRating})
Hang ghe lua chon    : ${seatDescription} - ${baseSeatPrice} VND
Dinh dang phong chieu: ${roomFormatName} (Phu phi: ${roomSurcharge} VND)
Giam gia uu dai HSSV : -${discountAmount} VND
Tien ve sau uu dai   : ${netTicketPrice} VND
Dich vu bap nuoc     : ${comboName} (${comboFee} VND)
An pham ve cung      : ${
    isPhysicalTicket === true ? "Co yeu cau in" : "Khong in"
  } (${physicalTicketFee} VND)
----------------------------------------
TONG THANH TOAN      : ${totalPayable} VND
QUA TANG KEM THEO     : ${logisticsGift}
========================================
  `);
}