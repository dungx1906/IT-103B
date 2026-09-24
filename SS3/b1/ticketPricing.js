const customerName = "Tran Thi Mai";
const customerAge = 20;
const movieRating = "T18";
const seatType = "VIP";
const isStudent = true;
const isWeekday = true;

const BASE_PRICE = 80000;
const VIP_SURCHARGE = 15000;
const COUPLE_SURCHARGE = 40000;

let surcharge = 0;
let seatName = "";
let discountPercent = 0;
let ticketPrice = 0;
let discountAmount = 0;
let finalPayment = 0;
let isValid = true;

if (movieRating === "T18" && customerAge < 18) {
  console.warn(
    "GIAO DICH THAT BAI: Khach hang duoi 18 tuoi khong duoc phep xem phim nhan T18!"
  );
  isValid = false;
}

if (isValid) {
  switch (seatType) {
    case "STANDARD":
      surcharge = 0;
      seatName = "Ghe Thuong";
      break;

    case "VIP":
      surcharge = VIP_SURCHARGE;
      seatName = "Ghe VIP";
      break;

    case "COUPLE":
      surcharge = COUPLE_SURCHARGE;
      seatName = "Ghe Doi Couple";
      break;

    default:
      console.error("GIAO DICH THAT BAI: Loai ghe khong hop le!");
      isValid = false;
      break;
  }
}

if (isValid) {
  if (isStudent === true && isWeekday === true) {
    discountPercent = 20;
  } else {
    discountPercent = 0;
  }

  ticketPrice = BASE_PRICE + surcharge;

  discountAmount = (ticketPrice * discountPercent) / 100;

  finalPayment = ticketPrice - discountAmount;

  const giftMessage =
    seatType === "COUPLE"
      ? "Tang 01 ly nuoc ngot co lon"
      : "Khong ap dung qua tang";

  console.log(`
========================================
       HOA DON BAN VE CINEMA CGV
========================================
Khach hang: ${customerName}
Do tuoi: ${customerAge} | Nhan phim: ${movieRating} (Hop le)
Hang ghe: ${seatName}
Gia ve co so: ${BASE_PRICE} VND
Phu thu ghe: ${surcharge} VND
Tong gia ve goc: ${ticketPrice} VND
Chiet khau HSSV (${discountPercent}%): -${discountAmount} VND
----------------------------------------
TONG TIEN THANH TOAN: ${finalPayment} VND
Uu dai di kem: ${giftMessage}
========================================
  `);
}

// Kết quả với dữ liệu mẫu

```text
Khach hang: Tran Thi Mai
Do tuoi: 20 | Nhan phim: T18 (Hop le)
Hang ghe: Ghe VIP
Gia ve co so: 80000 VND
Phu thu ghe: 15000 VND
Tong gia ve goc: 95000 VND
Chiet khau HSSV (20%): -19000 VND
----------------------------------------
TONG TIEN THANH TOAN: 76000 VND
Uu dai di kem: Khong ap dung qua tang
```

// Nếu đổi sang kịch bản 2 với `customerAge = 16` và `movieRating = "T18"`, chương trình sẽ dừng tính hóa đơn và in đúng thông báo vi phạm độ tuổi.
