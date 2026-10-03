// ===============================================
// PHÂN TÍCH TRADE-OFF CÁC PHƯƠNG THỨC CẮT CHUỖI
// ===============================================

// Dữ liệu mẫu
const code = "MED-1024";

console.log("===============================================");
console.log("      SO SÁNH SLICE VÀ SUBSTRING");
console.log("===============================================");

// -----------------------------------------------
// 1. Sử dụng slice()
// -----------------------------------------------

console.log("\n1. Phương thức slice()");

const sliceNormal = code.slice(4, 8);

console.log("slice(4, 8):", sliceNormal);

// Chỉ số âm
const sliceNegative = code.slice(-4);

console.log("slice(-4):", sliceNegative);

// start > end
const sliceStartGreater = code.slice(7, 4);

console.log("slice(7, 4):", sliceStartGreater);


// -----------------------------------------------
// 2. Sử dụng substring()
// -----------------------------------------------

console.log("\n2. Phương thức substring()");

const substringNormal = code.substring(4, 8);

console.log("substring(4, 8):", substringNormal);

// Chỉ số âm
const substringNegative = code.substring(-4);

console.log("substring(-4):", substringNegative);

// start > end
const substringStartGreater = code.substring(7, 4);

console.log("substring(7, 4):", substringStartGreater);


// -----------------------------------------------
// 3. Cảnh báo substr()
// -----------------------------------------------

console.log("\n3. Phương thức substr()");

console.log("substr() là phương thức đã lỗi thời (Deprecated).");
console.log("Không nên sử dụng substr() trong mã nguồn mới.");


// -----------------------------------------------
// 4. Chuẩn hóa mã hồ sơ bệnh nhân
// -----------------------------------------------

console.log("\n===============================================");
console.log("Không nên sử dụng substr() vì đã Deprecated.");

