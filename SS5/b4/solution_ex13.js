// ===============================================
// CLINIC SMS NOTIFICATION ENGINE
// He thong tao SMS nhac lich hen kham
// ===============================================

// 1. DU LIEU DAU VAO
const appointmentCode = "MED-2026-1024";
const patientName = "   nguyen van an   ";
const phoneNumber = "0901234567";
const appointmentDate = "04/10/2026 08:30";
const doctorName = "Nguyen Van Hai";
const specialty = "Tim Mach";

// ===============================================
// 2. LAM SACH DU LIEU
// ===============================================

// Xoa khoang trang thua o dau va cuoi ten
const cleanPatientName = patientName.trim();

// Xoa khoang trang thua o dau va cuoi ma lich hen
const cleanAppointmentCode = appointmentCode.trim();

// Xoa khoang trang thua cua so dien thoai
const cleanPhoneNumber = phoneNumber.trim();

// Xoa khoang trang thua cua ten bac si
const cleanDoctorName = doctorName.trim();

// Xoa khoang trang thua cua chuyen khoa
const cleanSpecialty = specialty.trim();

// ===============================================
// 3. CHUAN HOA TEN BENH NHAN
// ===============================================

// Chuyen toan bo ten thanh chu thuong
const lowerPatientName = cleanPatientName.toLowerCase();

// Tach tung tu
const patientNameParts = lowerPatientName.split(" ");

// Viet hoa chu cai dau tung tu
const formattedPatientName =
    patientNameParts[0].slice(0, 1).toUpperCase() +
    patientNameParts[0].slice(1) +
    " " +
    patientNameParts[1].slice(0, 1).toUpperCase() +
    patientNameParts[1].slice(1) +
    " " +
    patientNameParts[2].slice(0, 1).toUpperCase() +
    patientNameParts[2].slice(1);

// ===============================================
// 4. CHUAN HOA TEN BAC SI
// ===============================================

const lowerDoctorName = cleanDoctorName.toLowerCase();

const doctorNameParts = lowerDoctorName.split(" ");

const formattedDoctorName =
    doctorNameParts[0].slice(0, 1).toUpperCase() +
    doctorNameParts[0].slice(1) +
    " " +
    doctorNameParts[1].slice(0, 1).toUpperCase() +
    doctorNameParts[1].slice(1) +
    " " +
    doctorNameParts[2].slice(0, 1).toUpperCase() +
    doctorNameParts[2].slice(1);

// ===============================================
// 5. KIEM TRA MA LICH HEN
// ===============================================

const normalizedAppointmentCode =
    cleanAppointmentCode.toUpperCase();

const isAppointmentCodeValid =
    normalizedAppointmentCode.startsWith("MED-");

// ===============================================
// 6. KIEM TRA SO DIEN THOAI
// ===============================================

const isPhoneLengthValid =
    cleanPhoneNumber.length === 10;

const isPhoneStartValid =
    cleanPhoneNumber.startsWith("0");

const isPhoneValid =
    isPhoneLengthValid && isPhoneStartValid;

// ===============================================
// 7. AN 3 CHU SO GIUA CUA SO DIEN THOAI
// ===============================================

let maskedPhoneNumber = "";

if (isPhoneValid) {
    const phoneStart = cleanPhoneNumber.slice(0, 3);
    const phoneEnd = cleanPhoneNumber.slice(6, 10);

    maskedPhoneNumber =
        phoneStart + "***" + phoneEnd;
}

// ===============================================
// 8. KIEM TRA CHUYEN KHOA
// ===============================================

let formattedSpecialty = "";

if (cleanSpecialty === "") {
    formattedSpecialty = "Chua xac dinh";
} else {
    const lowerSpecialty = cleanSpecialty.toLowerCase();

    const specialtyParts = lowerSpecialty.split(" ");

    formattedSpecialty =
        specialtyParts[0].slice(0, 1).toUpperCase() +
        specialtyParts[0].slice(1);

    if (specialtyParts.length > 1) {
        formattedSpecialty =
            formattedSpecialty +
            " " +
            specialtyParts[1].slice(0, 1).toUpperCase() +
            specialtyParts[1].slice(1);
    }
}

// ===============================================
// 9. KIEM TRA DU LIEU TRUOC KHI TAO SMS
// ===============================================

if (!isAppointmentCodeValid) {

    console.log("Loi: Ma lich hen khong hop le.");

} else if (!isPhoneValid) {

    console.log("Loi: So dien thoai khong hop le.");

} else {

    // ===========================================
    // 10. TAO NOI DUNG SMS
    // ===========================================

    const smsMessage =
        `MEDCARE: Nhac lich hen ${normalizedAppointmentCode}. ` +
        `BN ${formattedPatientName}, ${appointmentDate}, ` +
        `BS ${formattedDoctorName}, ${formattedSpecialty}. ` +
        `SĐT ${maskedPhoneNumber}. Vui long den dung gio.`;

    // ===========================================
    // 11. KIEM TRA DO DAI SMS
    // ===========================================

    const smsLength = smsMessage.length;

    const isSmsValid = smsLength <= 160;

    // ===========================================
    // 12. HIEN THI KET QUA
    // ===========================================

    console.log("===============================================");
    console.log("       CLINIC SMS NOTIFICATION ENGINE");
    console.log("===============================================");

    console.log("Ma lich hen:", normalizedAppointmentCode);
    console.log("Benh nhan:", formattedPatientName);
    console.log("So dien thoai:", maskedPhoneNumber);
    console.log("Ngay gio kham:", appointmentDate);
    console.log("Bac si:", formattedDoctorName);
    console.log("Chuyen khoa:", formattedSpecialty);
    console.log("-----------------------------------------------");

    console.log("Noi dung SMS:");
    console.log(smsMessage);

    console.log("-----------------------------------------------");
    console.log("Do dai SMS:", smsLength, "ky tu");

    if (isSmsValid) {
        console.log("Trang thai SMS: Hop le");
    } else {
        console.log("Trang thai SMS: Vuot qua 160 ky tu");
    }

    console.log("===============================================");
}

