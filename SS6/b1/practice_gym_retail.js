let isRunning = true;
let orderCode = "";
let isOrderValid = false;

do {
    console.log("\n========================================");
    console.log("       FITNESS GYM - CUA HANG PHU KIEN");
    console.log("========================================");
    console.log("1. Nhap va chuan hoa ma don hang");
    console.log("2. Tinh tien va in hoa don");
    console.log("3. Thoat chuong trinh");
    console.log("========================================");

    const choice = prompt("Nhap lua chon:");

    switch (choice) {
        case "1": {
            // Nhap ma don hang
            const rawOrderCode = prompt("Nhap ma don hang:");

            if (rawOrderCode === null) {
                console.log("Da huy nhap ma don hang.");
                break;
            }

            // Loai bo khoang trang
            const cleanOrderCode = rawOrderCode.trim();

            // Chuyen thanh chu hoa
            const normalizedOrderCode = cleanOrderCode.toUpperCase();

            // Kiem tra ma don hang
            const hasValidPrefix =
                normalizedOrderCode.startsWith("GYM-");

            const hasMinimumLength =
                normalizedOrderCode.length >= 8;

            if (hasValidPrefix && hasMinimumLength) {
                orderCode = normalizedOrderCode;
                isOrderValid = true;

                console.log("----------------------------------------");
                console.log("Ma don hang hop le.");
                console.log("Ma don hang:", orderCode);
                console.log("----------------------------------------");
            } else {
                orderCode = "";
                isOrderValid = false;

                console.log("----------------------------------------");
                console.log("Ma don hang khong hop le.");
                console.log("Yeu cau: Bat dau bang GYM-");
                console.log("Va co toi thieu 8 ky tu.");
                console.log("----------------------------------------");
            }

            break;
        }

        case "2": {
            // Kiem tra ma don hang truoc khi in hoa don
            if (!isOrderValid) {
                console.log("----------------------------------------");
                console.log("Khong the in hoa don.");
                console.log("Vui long nhap ma don hang hop le truoc.");
                console.log("----------------------------------------");
                break;
            }

            console.log("\n========================================");
            console.log("          NHAP SO LUONG SAN PHAM");
            console.log("========================================");

            // Danh sach san pham
            const product1 = "SHAKER";
            const product2 = "GLOVES";
            const product3 = "STRAP";

            const productName1 = "Binh lac";
            const productName2 = "Gang tay";
            const productName3 = "Day keo lung";

            const price1 = 120000;
            const price2 = 180000;
            const price3 = 150000;

            // Nhap so luong
            const quantity1Input = prompt(
                "Nhap so luong Binh lac (SHAKER):"
            );

            const quantity2Input = prompt(
                "Nhap so luong Gang tay (GLOVES):"
            );

            const quantity3Input = prompt(
                "Nhap so luong Day keo lung (STRAP):"
            );

            if (
                quantity1Input === null ||
                quantity2Input === null ||
                quantity3Input === null
            ) {
                console.log("Da huy thao tac thanh toan.");
                break;
            }

            const quantity1 = Number(quantity1Input);
            const quantity2 = Number(quantity2Input);
            const quantity3 = Number(quantity3Input);

            // Kiem tra so luong
            if (
                !Number.isInteger(quantity1) ||
                !Number.isInteger(quantity2) ||
                !Number.isInteger(quantity3) ||
                quantity1 < 0 ||
                quantity2 < 0 ||
                quantity3 < 0
            ) {
                console.log("----------------------------------------");
                console.log("So luong khong hop le.");
                console.log("Vui long nhap so nguyen tu 0 tro len.");
                console.log("----------------------------------------");
                break;
            }

            // Nhap thong tin VIP
            const vipInput = prompt(
                "Khach hang co the VIP? (Y/N):"
            );

            if (vipInput === null) {
                console.log("Da huy thao tac thanh toan.");
                break;
            }

            const vipStatus = vipInput.trim().toUpperCase();

            let isVip = false;

            if (vipStatus === "Y") {
                isVip = true;
            } else if (vipStatus === "N") {
                isVip = false;
            } else {
                console.log("----------------------------------------");
                console.log("Lua chon VIP khong hop le.");
                console.log("Vui long nhap Y hoac N.");
                console.log("----------------------------------------");
                break;
            }

            // Tao mang san pham de xu ly bang vong lap for
            const productCodes = [
                product1,
                product2,
                product3
            ];

            const productNames = [
                productName1,
                productName2,
                productName3
            ];

            const prices = [
                price1,
                price2,
                price3
            ];

            const quantities = [
                quantity1,
                quantity2,
                quantity3
            ];

            let totalAmount = 0;

            // Tinh tien bang vong lap for
            for (let i = 0; i < productCodes.length; i++) {
                const itemAmount =
                    prices[i] * quantities[i];

                totalAmount += itemAmount;
            }

            // Tinh giam gia VIP
            let discountAmount = 0;

            if (isVip) {
                discountAmount =
                    totalAmount * 0.1;
            }

            const finalAmount =
                totalAmount - discountAmount;

            // In hoa don
            console.log("\n");
            console.log("-".repeat(60));
            console.log("             HOA DON FITNESS GYM");
            console.log("-".repeat(60));

            console.log(
                "Ma don hang : " + orderCode
            );

            console.log(
                "Hoi vien VIP: " + (isVip ? "Co" : "Khong")
            );

            console.log("-".repeat(60));

            console.log(
                "San pham".padEnd(20) +
                "SL".padStart(5) +
                "Don gia".padStart(15) +
                "Thanh tien".padStart(20)
            );

            console.log("-".repeat(60));

            // In tung san pham
            for (let i = 0; i < productCodes.length; i++) {
                const itemAmount =
                    prices[i] * quantities[i];

                if (quantities[i] > 0) {
                    console.log(
                        productNames[i].padEnd(20) +
                        String(quantities[i]).padStart(5) +
                        String(prices[i]).padStart(15) +
                        String(itemAmount).padStart(20)
                    );
                }
            }

            console.log("-".repeat(60));

            console.log(
                "Tong tien".padEnd(40) +
                String(totalAmount).padStart(20)
            );

            console.log(
                "Giam VIP 10%".padEnd(40) +
                String(discountAmount).padStart(20)
            );

            console.log("-".repeat(60));

            console.log(
                "THANH TOAN".padEnd(40) +
                String(finalAmount).padStart(20)
            );

            console.log("-".repeat(60));
            console.log("       CAM ON QUY KHACH DA MUA HANG!");
            console.log("-".repeat(60));

            break;
        }

        case "3": {
            isRunning = false;

            console.log("----------------------------------------");
            console.log("Da thoat chuong trinh.");
            console.log("Cam on quy khach!");
            console.log("----------------------------------------");

            break;
        }

        default: {
            console.log("----------------------------------------");
            console.log("Lua chon khong hop le.");
            console.log("Vui long chon 1, 2 hoac 3.");
            console.log("----------------------------------------");

            break;
        }
    }
} while (isRunning);
