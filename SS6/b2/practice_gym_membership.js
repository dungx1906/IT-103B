// ===============================================
// HE THONG QUAN LY HOI VIEN FITNESS GYM
// ===============================================

let isRunning = true;

// Bien trang thai ca lam viec
let registeredMembers = 0;
let totalRevenue = 0;
let checkInCount = 0;

// Thong tin hoi vien hien tai
let memberCode = "";
let memberName = "";
let memberPackage = "";
let trainingMonths = 0;
let hasPT = false;
let isMemberRegistered = false;

// Nam hien tai theo yeu cau bai toan
const currentYear = 2024;

do {
    console.log("\n===============================================");
    console.log("          FITNESS GYM - QUAN LY CA TRUC");
    console.log("===============================================");
    console.log("1. Dang ky hoi vien moi");
    console.log("2. Tinh tien goi tap");
    console.log("3. Quet ma the check-in");
    console.log("4. Xuat bao cao va thoat");
    console.log("===============================================");

    const choice = prompt("Nhap lua chon:");

    switch (choice) {

        // =========================================
        // CHUC NANG 1: DANG KY HOI VIEN
        // =========================================

        case "1": {
            const inputMemberCode = prompt(
                "Nhap ma the hoi vien:"
            );

            if (inputMemberCode === null) {
                console.log("Da huy dang ky hoi vien.");
                break;
            }

            const inputMemberName = prompt(
                "Nhap ho ten hoi vien:"
            );

            if (inputMemberName === null) {
                console.log("Da huy dang ky hoi vien.");
                break;
            }

            const inputPackage = prompt(
                "Nhap goi tap (STANDARD/VIP):"
            );

            if (inputPackage === null) {
                console.log("Da huy dang ky hoi vien.");
                break;
            }

            const inputMonths = prompt(
                "Nhap so thang dang ky:"
            );

            if (inputMonths === null) {
                console.log("Da huy dang ky hoi vien.");
                break;
            }

            const inputPT = prompt(
                "Dang ky PT? (Y/N):"
            );

            if (inputPT === null) {
                console.log("Da huy dang ky hoi vien.");
                break;
            }

            // Chuan hoa du lieu
            const cleanMemberCode =
                inputMemberCode.trim().toUpperCase();

            const cleanMemberName =
                inputMemberName.trim();

            const cleanPackage =
                inputPackage.trim().toUpperCase();

            const cleanPT =
                inputPT.trim().toUpperCase();

            const months = Number(inputMonths);

            // Kiem tra ma hoi vien
            const isCodeValid =
                cleanMemberCode.startsWith("GYM-");

            // Kiem tra goi tap
            const isPackageValid =
                cleanPackage === "STANDARD" ||
                cleanPackage === "VIP";

            // Kiem tra so thang
            const isMonthsValid =
                Number.isInteger(months) &&
                months > 0;

            // Kiem tra PT
            const isPTValid =
                cleanPT === "Y" ||
                cleanPT === "N";

            if (
                !isCodeValid ||
                !isPackageValid ||
                !isMonthsValid ||
                !isPTValid ||
                cleanMemberName === ""
            ) {
                console.log("-----------------------------------------------");
                console.log("Du lieu dang ky khong hop le.");
                console.log("Kiem tra lai ma the, ho ten, goi tap,");
                console.log("so thang va lua chon PT.");
                console.log("-----------------------------------------------");

                break;
            }

            // Luu thong tin hoi vien
            memberCode = cleanMemberCode;
            memberName = cleanMemberName;
            memberPackage = cleanPackage;
            trainingMonths = months;

            if (cleanPT === "Y") {
                hasPT = true;
            } else {
                hasPT = false;
            }

            isMemberRegistered = true;

            registeredMembers++;

            console.log("-----------------------------------------------");
            console.log("DANG KY HOI VIEN THANH CONG");
            console.log("-----------------------------------------------");
            console.log("Ma the:", memberCode);
            console.log("Ho ten:", memberName);
            console.log("Goi tap:", memberPackage);
            console.log("So thang:", trainingMonths);
            console.log(
                "PT ca nhan:",
                hasPT ? "Co" : "Khong"
            );
            console.log("-----------------------------------------------");

            break;
        }

        // =========================================
        // CHUC NANG 2: TINH TIEN GOI TAP
        // =========================================

        case "2": {

            // Khong cho tinh tien neu chua dang ky
            if (!isMemberRegistered) {
                console.log("-----------------------------------------------");
                console.log("KHONG THE TINH TIEN");
                console.log(
                    "Vui long dang ky hoi vien bang chuc nang 1 truoc."
                );
                console.log("-----------------------------------------------");

                break;
            }

            // Bang gia
            const standardPrice = 500000;
            const vipPrice = 800000;
            const ptPrice = 300000;

            let monthlyPrice = 0;

            if (memberPackage === "STANDARD") {
                monthlyPrice = standardPrice;
            } else {
                monthlyPrice = vipPrice;
            }

            // Tinh tien goi tap
            const packageAmount =
                monthlyPrice * trainingMonths;

            // Tinh tien PT
            let ptAmount = 0;

            if (hasPT) {
                ptAmount =
                    ptPrice * trainingMonths;
            }

            // Tong truoc giam
            const subtotal =
                packageAmount + ptAmount;

            // Xac dinh muc giam gia
            let discountRate = 0;

            if (trainingMonths >= 12) {
                discountRate = 0.25;
            } else if (trainingMonths >= 6) {
                discountRate = 0.15;
            }

            // Tinh tien giam
            const discountAmount =
                subtotal * discountRate;

            // Thanh tien
            const finalAmount =
                subtotal - discountAmount;

            // Cong vao doanh thu ca
            totalRevenue += finalAmount;

            console.log("\n-----------------------------------------------");
            console.log("              HOA DON GOI TAP");
            console.log("-----------------------------------------------");
            console.log("Ma hoi vien :", memberCode);
            console.log("Ho ten      :", memberName);
            console.log("Goi tap     :", memberPackage);
            console.log("So thang    :", trainingMonths);
            console.log(
                "Gia/thang   :",
                monthlyPrice,
                "VNĐ"
            );
            console.log(
                "Tien goi    :",
                packageAmount,
                "VNĐ"
            );
            console.log(
                "Tien PT     :",
                ptAmount,
                "VNĐ"
            );
            console.log(
                "Tam tinh    :",
                subtotal,
                "VNĐ"
            );
            console.log(
                "Giam gia    :",
                discountRate * 100,
                "%"
            );
            console.log(
                "Tien giam   :",
                discountAmount,
                "VNĐ"
            );
            console.log("-----------------------------------------------");
            console.log(
                "THANH TOAN  :",
                finalAmount,
                "VNĐ"
            );
            console.log("-----------------------------------------------");

            break;
        }

        // =========================================
        // CHUC NANG 3: CHECK-IN
        // =========================================

        case "3": {

            const inputCheckInCode = prompt(
                "Nhap ma the check-in:"
            );

            if (inputCheckInCode === null) {
                console.log("Da huy check-in.");
                break;
            }

            const cleanCheckInCode =
                inputCheckInCode.trim().toUpperCase();

            const isPrefixValid =
                cleanCheckInCode.startsWith("GYM-");

            const yearText =
                String(currentYear);

            const isYearValid =
                cleanCheckInCode.endsWith(yearText);

            if (isPrefixValid && isYearValid) {

                checkInCount++;

                console.log("-----------------------------------------------");
                console.log("CHECK-IN THANH CONG");
                console.log("Ma the:", cleanCheckInCode);
                console.log("So luot check-in:", checkInCount);
                console.log("-----------------------------------------------");

            } else {

                console.log("-----------------------------------------------");
                console.log("MA THE CHECK-IN KHONG HOP LE");
                console.log(
                    "Ma the phai bat dau bang GYM-"
                );
                console.log(
                    "Va ket thuc bang nam",
                    currentYear
                );
                console.log("-----------------------------------------------");
            }

            break;
        }

        // =========================================
        // CHUC NANG 4: BAO CAO VA THOAT
        // =========================================

        case "4": {

            console.log("\n");
            console.log("================================================");
            console.log("           BAO CAO TONG KET CA TRUC");
            console.log("================================================");
            console.log(
                "So hoi vien dang ky :",
                registeredMembers
            );
            console.log(
                "So luot check-in    :",
                checkInCount
            );
            console.log(
                "Tong doanh thu      :",
                totalRevenue,
                "VNĐ"
            );
            console.log("================================================");
            console.log("         KET THUC CA LAM VIEC");
            console.log("================================================");

            isRunning = false;

            break;
        }

        // =========================================
        // LUA CHON KHONG HOP LE
        // =========================================

        default: {

            console.log("-----------------------------------------------");
            console.log("Lua chon khong hop le.");
            console.log("Vui long chon tu 1 den 4.");
            console.log("-----------------------------------------------");

            break;
        }
    }

} while (isRunning);

