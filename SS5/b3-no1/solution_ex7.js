const rawSchedule = "BS.nguyen_van_hai-KHOA_TIM_MACH-08:30-PHONG_302";

// Tách chuỗi thành các phần
const scheduleParts = rawSchedule.split("-");

// Lấy thông tin từng trường
const rawDoctorName = scheduleParts[0];
const rawDepartment = scheduleParts[1];
const examinationTime = scheduleParts[2];
const rawRoom = scheduleParts[3];

// Xử lý tên bác sĩ
const doctorNameWithoutPrefix = rawDoctorName.slice(3);
const doctorNameWithSpaces = doctorNameWithoutPrefix.replaceAll("_", " ");
const doctorNameLower = doctorNameWithSpaces.toLowerCase();

// Viết hoa chữ cái đầu của từng từ
const doctorWords = doctorNameLower.split(" ");

const doctorName =
    doctorWords[0].slice(0, 1).toUpperCase() + doctorWords[0].slice(1) + " " +
    doctorWords[1].slice(0, 1).toUpperCase() + doctorWords[1].slice(1) + " " +
    doctorWords[2].slice(0, 1).toUpperCase() + doctorWords[2].slice(1);

// Xử lý chuyên khoa
const departmentName = rawDepartment
    .replaceAll("_", " ")
    .toLowerCase();

const departmentWords = departmentName.split(" ");

const formattedDepartment =
    departmentWords[0].slice(0, 1).toUpperCase() + departmentWords[0].slice(1) + " " +
    departmentWords[1].slice(0, 1).toUpperCase() + departmentWords[1].slice(1) + " " +
    departmentWords[2].slice(0, 1).toUpperCase() + departmentWords[2].slice(1);

// Xử lý phòng khám
const roomNumber = rawRoom.slice(6);
const roomName = "Phòng " + roomNumber;

// In bảng phân công
console.log(`
========================================
       PHÂN CÔNG CA KHÁM PHÒNG KHÁM
========================================
Bác sĩ       : ${doctorName}
Chuyên khoa  : ${formattedDepartment}
Giờ khám     : ${examinationTime}
Phòng khám   : ${roomName}
========================================
`);
