const rawTicketCode = "   med-card-0428-ut   ";

// Dọn dẹp khoảng trắng và lưu kết quả
const cleanTicketCode = rawTicketCode.trim();

// Chuyển mã phiếu thành chữ in hoa và lưu kết quả
const normalizedTicketCode = cleanTicketCode.toUpperCase();

// Kiểm tra tiền tố
const isValidPrefix = normalizedTicketCode.startsWith("MED-");

// Lấy mã khoa
const departmentCode = normalizedTicketCode.slice(4, 8);

// Kiểm tra mã ưu tiên
const isPriority = normalizedTicketCode.includes("-UT");

// Tạo chuỗi hiển thị trên phiếu
const displayCode = normalizedTicketCode.replaceAll("-", " | ");

console.log("Mã phiếu hợp lệ:", isValidPrefix);
console.log("Khoa điều trị:", departmentCode);
console.log("Phiếu ưu tiên:", isPriority);
console.log("Chuỗi in phiếu:", displayCode);
