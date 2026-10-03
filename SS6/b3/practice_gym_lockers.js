let isRunning = true;

let memberCode = "";
let memberRank = "";
let lockerZone = "";

let materialLog = "";
let towelQuantity = 0;
let lockQuantity = 0;

let totalMaterialFee = 0;
let depositAmount = 0;
let isMemberValid = false;
let isMaterialRecorded = false;

const towelPrice = 20000;
const lockPrice = 15000;
const depositPerBorrow = 50000;

do {
    console.log("\n==============================================");
    console.log("   HỆ THỐNG QUẢN LÝ TỦ ĐỒ & VẬT TƯ PHÒNG GYM");
    console.log("==============================================");
    console.log("1. Tiếp nhận và xác thực thẻ hội viên");
    console.log("2. Ghi nhận vật tư mượn thêm");
    console.log("3. In phiếu bàn giao và tính phụ phí");
    console.log("4. Đóng ca làm việc và thoát");

    let choice = prompt("Chọn chức năng: ");

    if (choice === null) {
        console.log("Đã hủy thao tác.");
        break;
    }

    choice = choice.trim();

    switch (choice) {
        case "1": {
            console.log("\n--- TIẾP NHẬN THẺ HỘI VIÊN ---");

            let inputMemberCode = prompt("Nhập mã thẻ hội viên: ");

            if (inputMemberCode === null) {
                console.log("Đã hủy thao tác.");
                break;
            }

            inputMemberCode = inputMemberCode.trim().toUpperCase();

            if (!inputMemberCode.startsWith("GYM-")) {
                console.log("Mã thẻ không hợp lệ. Mã phải bắt đầu bằng GYM-.");
                isMemberValid = false;
                break;
            }

            if (inputMemberCode.length < 8) {
                console.log("Mã thẻ không hợp lệ. Mã quá ngắn.");
                isMemberValid = false;
                break;
            }

            memberCode = inputMemberCode;

            let inputRank = prompt("Nhập hạng hội viên (VIP/STANDARD): ");

            if (inputRank === null) {
                console.log("Đã hủy thao tác.");
                break;
            }

            inputRank = inputRank.trim().toUpperCase();

            if (inputRank !== "VIP" && inputRank !== "STANDARD") {
                console.log("Hạng hội viên không hợp lệ.");
                isMemberValid = false;
                break;
            }

            memberRank = inputRank;

            if (memberRank === "VIP") {
                lockerZone = "ZONE-A";
            } else {
                lockerZone = "ZONE-B";
            }

            isMemberValid = true;
            materialLog = "";
            towelQuantity = 0;
            lockQuantity = 0;
            totalMaterialFee = 0;
            depositAmount = 0;
            isMaterialRecorded = false;

            console.log("\nXác thực thẻ thành công.");
            console.log(`Mã hội viên: ${memberCode}`);
            console.log(`Hạng hội viên: ${memberRank}`);
            console.log(`Khu vực tủ được cấp: ${lockerZone}`);

            if (memberRank === "VIP") {
                console.log("Quyền lợi: Miễn phí 1 khăn tắm lớn.");
            } else {
                console.log("Hội viên STANDARD: Vật tư mượn thêm tính phí.");
            }

            break;
        }

        case "2": {
            console.log("\n--- GHI NHẬN VẬT TƯ MƯỢN THÊM ---");

            if (!isMemberValid) {
                console.log("Vui lòng xác thực thẻ hội viên trước.");
                break;
            }

            let inputMaterialLog = prompt(
                'Nhập chuỗi vật tư, ví dụ "TOWEL:2|LOCK:1": '
            );

            if (inputMaterialLog === null) {
                console.log("Đã hủy thao tác.");
                break;
            }

            inputMaterialLog = inputMaterialLog.trim().toUpperCase();

            if (inputMaterialLog === "") {
                console.log("Chuỗi vật tư không được để trống.");
                break;
            }

            materialLog = inputMaterialLog;

            towelQuantity = 0;
            lockQuantity = 0;

            let remainingLog = materialLog;

            while (remainingLog.length > 0) {
                let separatorIndex = remainingLog.indexOf("|");

                let currentItem;

                if (separatorIndex === -1) {
                    currentItem = remainingLog;
                    remainingLog = "";
                } else {
                    currentItem = remainingLog.slice(0, separatorIndex);
                    remainingLog = remainingLog.slice(separatorIndex + 1);
                }

                let colonIndex = currentItem.indexOf(":");

                if (colonIndex === -1) {
                    console.log(`Vật tư không hợp lệ: ${currentItem}`);
                    continue;
                }

                let materialCode = currentItem.slice(0, colonIndex).trim();
                let quantityText = currentItem.slice(colonIndex + 1).trim();
                let quantity = Number(quantityText);

                if (!Number.isInteger(quantity) || quantity < 0) {
                    console.log(`Số lượng không hợp lệ: ${currentItem}`);
                    continue;
                }

                if (materialCode === "TOWEL") {
                    towelQuantity = towelQuantity + quantity;
                } else if (materialCode === "LOCK") {
                    lockQuantity = lockQuantity + quantity;
                } else {
                    console.log(`Không hỗ trợ loại vật tư: ${materialCode}`);
                }
            }

            if (memberRank === "VIP" && towelQuantity > 1) {
                console.log("VIP được miễn phí 1 khăn tắm lớn.");

                towelQuantity = towelQuantity - 1;
            } else if (memberRank === "VIP" && towelQuantity === 1) {
                towelQuantity = 0;
            }

            totalMaterialFee =
                towelQuantity * towelPrice +
                lockQuantity * lockPrice;

            if (towelQuantity > 0 || lockQuantity > 0) {
                depositAmount = depositPerBorrow;
            } else {
                depositAmount = 0;
            }

            isMaterialRecorded = true;

            console.log("\nĐã ghi nhận vật tư.");
            console.log(`Khăn tắm tính phí: ${towelQuantity}`);
            console.log(`Khóa tủ phụ: ${lockQuantity}`);
            console.log(`Phụ phí vật tư: ${totalMaterialFee.toLocaleString("vi-VN")} VNĐ`);
            console.log(`Tiền đặt cọc: ${depositAmount.toLocaleString("vi-VN")} VNĐ`);

            break;
        }

        case "3": {
            console.log("\n--- PHIẾU BÀN GIAO TỦ ĐỒ & VẬT TƯ ---");

            if (!isMemberValid) {
                console.log("Chưa có hội viên hợp lệ. Vui lòng chọn chức năng 1.");
                break;
            }

            if (!isMaterialRecorded) {
                console.log("Chưa ghi nhận vật tư. Vui lòng chọn chức năng 2.");
                break;
            }

            let title = " PHIẾU BÀN GIAO GYM ";

            console.log("\n" + "=".repeat(50));
            console.log(title);
            console.log("=".repeat(50));

            console.log(`Mã hội viên       : ${memberCode.padEnd(20)}`);
            console.log(`Hạng hội viên     : ${memberRank.padEnd(20)}`);
            console.log(`Khu vực tủ        : ${lockerZone.padEnd(20)}`);
            console.log("-".repeat(50));

            console.log(
                `Khăn tắm          : ${String(towelQuantity).padStart(5)} chiếc`
            );

            console.log(
                `Khóa tủ phụ       : ${String(lockQuantity).padStart(5)} chiếc`
            );

            console.log("-".repeat(50));

            console.log(
                `Phụ phí vật tư    : ${totalMaterialFee
                    .toLocaleString("vi-VN")
                    .padStart(15)} VNĐ`
            );

            console.log(
                `Tiền đặt cọc      : ${depositAmount
                    .toLocaleString("vi-VN")
                    .padStart(15)} VNĐ`
            );

            console.log("-".repeat(50));

            console.log(
                `TỔNG THANH TOÁN   : ${(totalMaterialFee + depositAmount)
                    .toLocaleString("vi-VN")
                    .padStart(15)} VNĐ`
            );

            console.log("=".repeat(50));

            if (memberRank === "VIP") {
                console.log("Quyền lợi VIP: Miễn phí 1 khăn tắm lớn.");
            }

            console.log("Lưu ý: Tiền đặt cọc được hoàn lại khi trả vật tư.");
            console.log("=".repeat(50));

            break;
        }

        case "4": {
            console.log("\n--- ĐÓNG CA LÀM VIỆC ---");

            console.log("Thông tin ca làm việc:");
            console.log(`Hội viên đã tiếp nhận : ${isMemberValid ? 1 : 0}`);
            console.log(`Tổng phụ phí vật tư   : ${totalMaterialFee.toLocaleString("vi-VN")} VNĐ`);
            console.log(`Tiền đặt cọc          : ${depositAmount.toLocaleString("vi-VN")} VNĐ`);

            console.log("\nCa làm việc đã được đóng.");
            console.log("Cảm ơn bạn đã sử dụng hệ thống.");

            isRunning = false;
            break;
        }

        default: {
            console.log("Chức năng không hợp lệ. Vui lòng chọn từ 1 đến 4.");
            break;
        }
    }

} while (isRunning);

