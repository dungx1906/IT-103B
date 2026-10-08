const circulationLogs = [
  {
    logId: "L001",
    studentCode: "SV001",
    bookIsbn: "ISBN001",
    status: "BORROWING",
    fineAmount: 0,
    overdueDays: 0,
    borrowDate: "2026-10-01"
  },
  {
    logId: "L002",
    studentCode: "SV002",
    bookIsbn: "ISBN002",
    status: "BORROWING",
    fineAmount: 0,
    overdueDays: 0,
    borrowDate: "2026-09-20"
  },
  {
    logId: "L003",
    studentCode: "SV003",
    bookIsbn: "ISBN003",
    status: "RETURNED",
    fineAmount: 25000,
    overdueDays: 5,
    borrowDate: "2026-09-10"
  }
];

console.log("==============================================");
console.log("       QUẢN LÝ LƯU CHUYỂN THƯ VIỆN");
console.log("==============================================");

// CREATE: Sinh viên mượn sách mới
const newStudentCode = "SV004";
const newBookIsbn = "ISBN004";

if (newStudentCode !== "" && newBookIsbn !== "") {
  const newLog = {
    logId: "L004",
    studentCode: newStudentCode,
    bookIsbn: newBookIsbn,
    status: "BORROWING",
    fineAmount: 0,
    overdueDays: 0,
    borrowDate: "2026-10-08"
  };

  circulationLogs.push(newLog);

  console.log("\nĐã tạo giao dịch mượn sách L004.");
}

// UPDATE: Sinh viên SV001 trả sách
const returnLogId = "L001";
const returnStatus = "RETURNED";
const overdueDays = 3;

for (let i = 0; i < circulationLogs.length; i++) {
  if (circulationLogs[i].logId === returnLogId) {
    circulationLogs[i].status = returnStatus;
    circulationLogs[i].overdueDays = overdueDays;

    if (circulationLogs[i].overdueDays > 0) {
      circulationLogs[i].fineAmount =
        circulationLogs[i].overdueDays * 5000;
    }

    console.log("\nĐã cập nhật giao dịch L001.");
    console.log("Phí phạt:", circulationLogs[i].fineAmount, "VNĐ");
  }
}

// UPDATE: Xử lý trường hợp mất sách
const lostLogId = "L002";

for (let i = 0; i < circulationLogs.length; i++) {
  if (circulationLogs[i].logId === lostLogId) {
    circulationLogs[i].status = "LOST";
    circulationLogs[i].fineAmount = 200000;

    console.log("\nĐã cập nhật giao dịch L002 thành LOST.");
    console.log("Phí đền bù:", circulationLogs[i].fineAmount, "VNĐ");
  }
}

// DELETE: Xóa giao dịch RETURNED đã quyết toán quá 30 ngày
const currentDate = new Date("2026-10-08");
const maxDaysToKeep = 30;

for (let i = circulationLogs.length - 1; i >= 0; i--) {
  if (circulationLogs[i].status === "RETURNED") {
    const borrowDate = new Date(circulationLogs[i].borrowDate);

    const timeDifference = currentDate - borrowDate;
    const daysPassed = timeDifference / (1000 * 60 * 60 * 24);

    if (
      daysPassed > maxDaysToKeep &&
      circulationLogs[i].fineAmount >= 0
    ) {
      circulationLogs.splice(i, 1);
    }
  }
}

// READ: Báo cáo tổng kết
let totalBorrowing = 0;
let totalFineCollected = 0;

for (let i = 0; i < circulationLogs.length; i++) {
  if (circulationLogs[i].status === "BORROWING") {
    totalBorrowing++;
  }

  if (
    circulationLogs[i].status === "RETURNED" ||
    circulationLogs[i].status === "LOST"
  ) {
    totalFineCollected += circulationLogs[i].fineAmount;
  }
}

console.log("\n==============================================");
console.log("          BÁO CÁO TỔNG KẾT CUỐI NGÀY");
console.log("==============================================");

for (let i = 0; i < circulationLogs.length; i++) {
  console.log(
    circulationLogs[i].logId +
    " | Sinh viên: " +
    circulationLogs[i].studentCode +
    " | ISBN: " +
    circulationLogs[i].bookIsbn +
    " | Trạng thái: " +
    circulationLogs[i].status +
    " | Phạt: " +
    circulationLogs[i].fineAmount +
    " VNĐ"
  );
}

console.log("----------------------------------------------");
console.log("Tổng số sách đang được mượn:", totalBorrowing);
console.log("Tổng tiền phạt/đền bù:", totalFineCollected, "VNĐ");
console.log("==============================================");