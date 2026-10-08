const borrowRecords = [
  {
    recordId: "PM01",
    studentId: "SV101",
    bookTitle: "JavaScript Cơ Bản",
    borrowDays: 10,
    isReturned: false
  },
  {
    recordId: "PM02",
    studentId: "SV102",
    bookTitle: "Clean Architecture",
    borrowDays: 16,
    isReturned: false
  },
  {
    recordId: "PM03",
    studentId: "SV103",
    bookTitle: "Design Patterns",
    borrowDays: 20,
    isReturned: false
  }
];

console.log("==============================================");
console.log("       QUẢN LÝ PHIẾU MƯỢN SÁCH");
console.log("==============================================");

// READ: Hiển thị danh sách ban đầu
console.log("\n--- 1. DANH SÁCH BAN ĐẦU ---");

for (let i = 0; i < borrowRecords.length; i++) {
  console.log(
    borrowRecords[i].recordId + " | " +
    borrowRecords[i].studentId + " | " +
    borrowRecords[i].bookTitle + " | " +
    borrowRecords[i].borrowDays + " ngày | " +
    "Đã trả: " + borrowRecords[i].isReturned
  );
}

// CREATE: Thêm phiếu PM04
const newRecord = {
  recordId: "PM04",
  studentId: "SV104",
  bookTitle: "Clean Code",
  borrowDays: 18,
  isReturned: false
};

borrowRecords.push(newRecord);

console.log("\n--- 2. SAU KHI THÊM PHIẾU PM04 ---");

for (let i = 0; i < borrowRecords.length; i++) {
  console.log(
    borrowRecords[i].recordId + " | " +
    borrowRecords[i].studentId + " | " +
    borrowRecords[i].bookTitle + " | " +
    borrowRecords[i].borrowDays + " ngày | " +
    "Đã trả: " + borrowRecords[i].isReturned
  );
}

// READ: Tính phí phạt các phiếu quá hạn
console.log("\n--- 3. TÍNH PHÍ PHẠT QUÁ HẠN ---");

let totalFine = 0;

for (let i = 0; i < borrowRecords.length; i++) {
  let fine = 0;

  if (borrowRecords[i].borrowDays > 14) {
    fine = (borrowRecords[i].borrowDays - 14) * 5000;
  }

  totalFine += fine;

  console.log(
    borrowRecords[i].recordId +
    " | " +
    borrowRecords[i].bookTitle +
    " | Phí phạt: " +
    fine +
    " VNĐ"
  );
}

console.log("Tổng phí phạt:", totalFine, "VNĐ");

// UPDATE: PM01 trả sách
console.log("\n--- 4. CẬP NHẬT PHIẾU PM01 ---");

const updateRecordId = "PM01";

for (let i = 0; i < borrowRecords.length; i++) {
  if (borrowRecords[i].recordId === updateRecordId) {
    borrowRecords[i].isReturned = true;

    console.log(
      "Phiếu " +
      borrowRecords[i].recordId +
      " đã được cập nhật: isReturned = " +
      borrowRecords[i].isReturned
    );
  }
}

// DELETE: Xóa PM03 sau khi tất toán
console.log("\n--- 5. XÓA PHIẾU PM03 ---");

const deleteRecordId = "PM03";

for (let i = 0; i < borrowRecords.length; i++) {
  if (borrowRecords[i].recordId === deleteRecordId) {
    borrowRecords.splice(i, 1);

    console.log("Đã xóa phiếu:", deleteRecordId);
    break;
  }
}

// READ: Bảng tổng kết
console.log("\n==============================================");
console.log("             BẢNG TỔNG KẾT");
console.log("==============================================");

console.log(
  "Mã phiếu | Sinh viên | Tên sách | Số ngày | Đã trả"
);

console.log("----------------------------------------------");

for (let i = 0; i < borrowRecords.length; i++) {
  console.log(
    borrowRecords[i].recordId + " | " +
    borrowRecords[i].studentId + " | " +
    borrowRecords[i].bookTitle + " | " +
    borrowRecords[i].borrowDays + " | " +
    borrowRecords[i].isReturned
  );
}

console.log("----------------------------------------------");
console.log("Tổng phí phạt:", totalFine, "VNĐ");
console.log("Số phiếu còn lại:", borrowRecords.length);
console.log("==============================================");