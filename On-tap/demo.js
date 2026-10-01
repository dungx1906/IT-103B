let isRunning = true;
let currentTicketCode = "";
let isTicketValid = false;
let totalRevenue = 0;
let totalVisits = 0;

do {
    // Hiển thị menu chính
    let menu = `
=====================================================
    Hệ thống thu ngân phòng khám Medlatec Clinic
=====================================================
1. Nhập và chuẩn mã phiếu khám bệnh
2. Tính viện phí xét nghiệm
3. Thẩm định mã hồ sơ may mắn
0. Thoát chương trình
=====================================================
`;

    console.log(menu);

    let choice = prompt("Vui lòng nhập lựa chọn của bạn (0 - 3): ");

    // Kiểm tra người dùng bấm Cancel
    if (choice === null) {
        console.log("Vui lòng nhập số (0 - 3)!");
        continue;
    }

    // Xóa khoảng trắng ở đầu và cuối
    choice = choice.trim();

    switch (choice) {
        case "1": {
            // Hủy mã phiếu cũ trước khi nhập mã mới
            currentTicketCode = "";
            isTicketValid = false;

            let ticketInput = prompt("Nhập mã phiếu khám bệnh: ");

            // Kiểm tra Cancel
            if (ticketInput === null) {
                console.log("Chưa nhập mã phiếu");
                break;
            }

            // Chuẩn hóa mã phiếu
            currentTicketCode = ticketInput.trim().toUpperCase();

            // Kiểm tra chuỗi rỗng
            if (currentTicketCode === "") {
                console.log("Chưa nhập mã phiếu");
                currentTicketCode = "";
                isTicketValid = false;
                break;
            }

            // Kiểm tra độ dài tối thiểu
            if (currentTicketCode.length < 6) {
                console.log("Lỗi: Độ dài nhỏ hơn 6 ký tự");
                currentTicketCode = "";
                isTicketValid = false;
                break;
            }

            // Kiểm tra tiền tố MED-
            if (!currentTicketCode.startsWith("MED-")) {
                console.log('Lỗi: Sai tiền tố "MED-"');
                currentTicketCode = "";
                isTicketValid = false;
                break;
            }

            // Kiểm tra khoảng trắng ở giữa
            if (currentTicketCode.includes(" ")) {
                console.log("Lỗi: Chứa khoảng trắng ở giữa");
                currentTicketCode = "";
                isTicketValid = false;
                break;
            }

            // Mã hợp lệ
            isTicketValid = true;

            console.log("Kiểm chuẩn mã phiếu thành công!");
            console.log("Mã phiếu: " + currentTicketCode);
            console.log("Trạng thái: Hợp lệ");
            break;
        }

        case "2": {
            // Kiểm tra mã phiếu trước khi tính tiền
            if (isTicketValid !== true) {
                console.log("Chưa có mã phiếu hợp lệ.");
                console.log("Vui lòng chọn Case 1 trước.");
                break;
            }

            // Lưu mã phiếu để in hóa đơn
            let paymentTicketCode = currentTicketCode;

            let serviceCount;
            let pricePerService;

            // Nhập số lượng chỉ định
            while (true) {
                let serviceInput = prompt(
                    "Nhập số lượng chỉ định xét nghiệm: "
                );

                // Cancel thì hủy giao dịch
                if (serviceInput === null) {
                    console.log("Đã hủy giao dịch.");
                    break;
                }

                serviceInput = serviceInput.trim();

                let serviceValue = Number(serviceInput);

                // Kiểm tra số nguyên dương
                if (
                    serviceInput !== "" &&
                    Number.isFinite(serviceValue) &&
                    Number.isInteger(serviceValue) &&
                    serviceValue > 0
                ) {
                    serviceCount = serviceValue;
                    break;
                }

                console.log(
                    "Dữ liệu không hợp lệ. Vui lòng nhập số nguyên > 0."
                );
            }

            // Nếu Cancel ở số lượng thì quay về menu
            if (serviceCount === undefined) {
                break;
            }

            // Nhập đơn giá
            while (true) {
                let priceInput = prompt(
                    "Nhập đơn giá mỗi chỉ định (VNĐ): "
                );

                // Cancel thì hủy giao dịch
                if (priceInput === null) {
                    console.log("Đã hủy giao dịch.");
                    break;
                }

                priceInput = priceInput.trim();

                let priceValue = Number(priceInput);

                // Kiểm tra số nguyên dương
                if (
                    priceInput !== "" &&
                    Number.isFinite(priceValue) &&
                    Number.isInteger(priceValue) &&
                    priceValue > 0
                ) {
                    pricePerService = priceValue;
                    break;
                }

                console.log(
                    "Dữ liệu không hợp lệ. Vui lòng nhập số nguyên > 0."
                );
            }

            // Nếu Cancel ở đơn giá thì quay về menu
            if (pricePerService === undefined) {
                break;
            }

            // Tính chi phí cơ sở
            let baseCost = serviceCount * pricePerService;

            // Tính tiền giảm giá
            let discount = 0;

            if (serviceCount >= 4) {
                discount = Math.round(baseCost * 0.1);
            }

            // Tính phụ phí vật tư 8%
            let materialFee = Math.round(
                (baseCost - discount) * 0.08
            );

            // Tính tổng thanh toán
            let totalPayment =
                (baseCost - discount) + materialFee;

            // Cập nhật doanh thu và lượt khám
            totalRevenue += totalPayment;
            totalVisits++;

            // Hủy mã phiếu sau khi quyết toán
            currentTicketCode = "";
            isTicketValid = false;

            // In hóa đơn
            console.log("=====================================================");
            console.log("              HÓA ĐƠN VIỆN PHÍ XÉT NGHIỆM");
            console.log("=====================================================");
            console.log("Mã phiếu khám: " + paymentTicketCode);
            console.log("Số chỉ định: " + serviceCount);
            console.log(
                "Đơn giá/chỉ định: " +
                pricePerService.toLocaleString("vi-VN") +
                " VNĐ"
            );
            console.log(
                "Chi phí cơ sở: " +
                baseCost.toLocaleString("vi-VN") +
                " VNĐ"
            );
            console.log(
                "Tiền giảm giá: " +
                discount.toLocaleString("vi-VN") +
                " VNĐ"
            );
            console.log(
                "Phụ phí vật tư y tế: " +
                materialFee.toLocaleString("vi-VN") +
                " VNĐ"
            );
            console.log(
                "Tổng thanh toán: " +
                totalPayment.toLocaleString("vi-VN") +
                " VNĐ"
            );
            console.log("=====================================================");

            break;
        }

        case "3": {
            // Nhập mã hồ sơ may mắn
            let luckyInput = prompt(
                "Nhập mã số seri hồ sơ bệnh nhân: "
            );

            // Kiểm tra Cancel
            if (luckyInput === null) {
                console.log("Lỗi: Dữ liệu không hợp lệ");
                break;
            }

            // Xóa khoảng trắng hai đầu
            let luckyCode = luckyInput.trim();

            // Kiểm tra chuỗi rỗng
            if (luckyCode === "") {
                console.log("Lỗi: Mã số không được để trống");
                break;
            }

            // Kiểm tra chỉ chứa chữ số
            if (!/^[0-9]+$/.test(luckyCode)) {
                console.log(
                    "Lỗi: Mã số chỉ được chứa các chữ số 0 - 9"
                );
                break;
            }

            // Kiểm tra tối thiểu 2 chữ số
            if (luckyCode.length < 2) {
                console.log(
                    "Lỗi: Mã số phải có từ 2 chữ số trở lên"
                );
                break;
            }

            // Kiểm tra toàn số 0
            if (/^0+$/.test(luckyCode)) {
                console.log(
                    "Lỗi: Mã số không được toàn chữ số 0"
                );
                break;
            }

            // Đảo ngược chuỗi
            let reversedCode = "";

            for (let i = luckyCode.length - 1; i >= 0; i--) {
                reversedCode += luckyCode[i];
            }

            // Kiểm tra đối xứng
            let isPalindrome = luckyCode === reversedCode;

            // Tính tổng chữ số
            let digitSum = 0;

            for (let i = 0; i < luckyCode.length; i++) {
                digitSum += Number(luckyCode[i]);
            }

            // Kiểm tra chia hết cho 9
            let isDivisibleByNine = digitSum % 9 === 0;

            // Xác định giải thưởng
            let prize;

            if (isPalindrome && isDivisibleByNine) {
                prize =
                    "Giải Đặc biệt - Voucher gói khám chuyên sâu miễn phí trị giá 500.000 VNĐ";
            } else if (isPalindrome && !isDivisibleByNine) {
                prize =
                    "Giải Nhất - Voucher miễn phí khám răng tổng quát 200.000 VNĐ";
            } else if (!isPalindrome && isDivisibleByNine) {
                prize =
                    "Giải Nhì - Voucher giảm 50.000 VNĐ lần khám kế tiếp";
            } else {
                prize = "Không trúng thưởng - Không có";
            }

            // In kết quả
            console.log("=====================================================");
            console.log("             KẾT QUẢ THẨM ĐỊNH MÃ HỒ SƠ");
            console.log("=====================================================");
            console.log("Mã số gốc: " + luckyCode);
            console.log("Mã đảo ngược: " + reversedCode);
            console.log("Tổng chữ số: " + digitSum);
            console.log(
                "Chia hết cho 9: " +
                (isDivisibleByNine ? "Có" : "Không")
            );
            console.log("Giải thưởng: " + prize);
            console.log("=====================================================");

            break;
        }

        case "0": {
            // In báo cáo trước khi thoát
            console.log("==================================================");
            console.log("             BÁO CÁO TỔNG KẾT CA TRỰC");
            console.log("==================================================");

            if (totalVisits === 0) {
                console.log("Chưa phát sinh lượt khám nào trong ca");
            } else {
                let averageRevenue = Math.round(
                    totalRevenue / totalVisits
                );

                console.log(
                    "Tổng số lượt khám: " + totalVisits
                );

                console.log(
                    "Tổng doanh thu: " +
                    totalRevenue.toLocaleString("vi-VN") +
                    " VNĐ"
                );

                console.log(
                    "Doanh thu trung bình/lượt: " +
                    averageRevenue.toLocaleString("vi-VN") +
                    " VNĐ"
                );
            }

            console.log("==================================================");
            console.log(
                "Cảm ơn bạn đã sử dụng hệ thống Medlatec Clinic!"
            );

            isRunning = false;
            break;
        }

        default:
            // Báo lỗi khi lựa chọn không thuộc 0 - 3
            console.log("Vui lòng nhập số (0 - 3)!");
            break;
    }
} while (isRunning);