
"use strict";

// Dữ liệu ban đầu
let bookings = [
    {
        bookingCode: "CIN-001",
        customerName: "Nguyễn Văn An",
        movieTitle: "Ánh Trăng Cuối Phố",
        ticketCount: 2,
        pricePerTicket: 90000,
        totalAmount: 194400,
    },
    {
        bookingCode: "CIN-002",
        customerName: "Trần Thị Bình",
        movieTitle: "Biệt Đội Sao Băng",
        ticketCount: 4,
        pricePerTicket: 90000,
        totalAmount: 349920,
    },
    {
        bookingCode: "CIN-003",
        customerName: "Lê Minh Châu",
        movieTitle: "Mùa Hè Rực Lửa",
        ticketCount: 6,
        pricePerTicket: 110000,
        totalAmount: 641520,
    },
];

// Định dạng tiền Việt Nam
function formatCurrency(amount) {
    return amount.toLocaleString("vi-VN") + " VNĐ";
}

// 1. Hiển thị danh sách đơn đặt vé
function displayBookings(bookings) {
    // Kiểm tra nếu danh sách trống
    if (!bookings || bookings.length === 0) {
        console.log("Danh sách đơn đặt vé trống");
        return;
    }

    let totalRevenue = 0;

    bookings.forEach((element, index) => {
        totalRevenue += element.totalAmount;

        console.log(
            `${index + 1}. ${element.bookingCode} - ${element.customerName} - ${element.movieTitle} | SL: ${element.ticketCount} | Giá: ${formatCurrency(element.pricePerTicket)} | Tổng TT: ${formatCurrency(element.totalAmount)}`
        );
    });

    console.log(`Tổng: ${bookings.length} đơn đặt vé - Doanh thu: ${formatCurrency(totalRevenue)}`);
}

// Chuẩn hóa tên khách hàng và tên phim
function formatName(name) {
    if (name === null || name.trim() === "") {
        return "";
    }

    let words = name.trim().split(/\s+/);

    let capitalizeWords = words.map((word) => {
        return word.charAt(0).toLocaleUpperCase("vi-VN")
            + word.slice(1).toLocaleLowerCase("vi-VN");
    });

    return capitalizeWords.join(" ");
}

// Tìm vị trí đơn đặt vé theo mã
function findBookingIndex(bookingCode) {
    if (bookingCode === null || bookingCode.trim() === "") {
        return -1;
    }

    let targetBookingCode = bookingCode.trim().toUpperCase();

    for (let i = 0; i < bookings.length; i++) {
        if (bookings[i].bookingCode === targetBookingCode) {
            return i;
        }
    }

    return -1;
}

// Kiểm tra mã đặt vé theo thứ tự yêu cầu
function validateBookingCode(bookingCode) {
    if (bookingCode === null || bookingCode.trim() === "") {
        return "Lỗi: Chưa nhập mã đặt vé";
    }

    let upperCode = bookingCode.trim().toUpperCase();

    if (upperCode.length < 6) {
        return "Lỗi: Độ dài nhỏ hơn 6 ký tự";
    }

    if (!upperCode.startsWith("CIN-")) {
        return 'Lỗi: Sai tiền tố "CIN-"';
    }

    if (/\s/.test(upperCode)) {
        return "Lỗi: Chứa khoảng trắng";
    }

    if (findBookingIndex(upperCode) !== -1) {
        return "Lỗi: Mã đặt vé đã tồn tại";
    }

    return "";
}

// Nhập số nguyên dương, trả về null nếu bấm Cancel
function inputPositiveInteger(message) {
    while (true) {
        let input = prompt(message);

        if (input === null) {
            return null;
        }

        let number = Number(input.trim());

        if (
            input.trim() !== ""
            && Number.isInteger(number)
            && number > 0
        ) {
            return number;
        }

        console.log("Lỗi: Vui lòng nhập số nguyên lớn hơn 0.");
    }
}

// Tính tiền đơn đặt vé
function calculateTotal(ticketCount, pricePerTicket) {
    let baseCost = ticketCount * pricePerTicket;

    let discount = ticketCount >= 4
        ? Math.round(baseCost * 0.1)
        : 0;

    let serviceFee = Math.round((baseCost - discount) * 0.08);

    let totalAmount = baseCost - discount + serviceFee;

    return {
        baseCost: baseCost,
        discount: discount,
        serviceFee: serviceFee,
        totalAmount: totalAmount,
    };
}

// In hóa đơn chi tiết
function displayInvoice(booking, calculation) {
    console.log("========== HÓA ĐƠN ĐẶT VÉ ==========");
    console.log("Mã đặt vé: " + booking.bookingCode);
    console.log("Khách hàng: " + booking.customerName);
    console.log("Tên phim: " + booking.movieTitle);
    console.log("Số vé: " + booking.ticketCount);
    console.log("Giá mỗi vé: " + formatCurrency(booking.pricePerTicket));
    console.log("Chi phí cơ sở: " + formatCurrency(calculation.baseCost));
    console.log("Giảm giá: " + formatCurrency(calculation.discount));
    console.log("Phí dịch vụ: " + formatCurrency(calculation.serviceFee));
    console.log("Tổng thanh toán: " + formatCurrency(calculation.totalAmount));
    console.log("====================================");
}

// 2. Thêm đơn đặt vé mới
function handleCreateBooking() {
    // Nhập và kiểm tra mã đặt vé
    let codeInput = prompt("Nhập mã đặt vé:");

    if (codeInput === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }

    let bookingCode = codeInput.trim().toUpperCase();
    let errorMessage = validateBookingCode(bookingCode);

    if (errorMessage !== "") {
        console.log(errorMessage);
        return;
    }

    // Nhập tên khách hàng
    let customerName = "";

    while (customerName === "") {
        let customerInput = prompt("Nhập tên khách hàng:");

        if (customerInput === null) {
            console.log("Đã hủy thao tác thêm");
            return;
        }

        customerName = formatName(customerInput);

        if (customerName === "") {
            console.log("Tên khách hàng không được để trống.");
        }
    }

    // Nhập tên phim
    let movieTitle = "";

    while (movieTitle === "") {
        let movieInput = prompt("Nhập tên phim:");

        if (movieInput === null) {
            console.log("Đã hủy thao tác thêm");
            return;
        }

        movieTitle = formatName(movieInput);

        if (movieTitle === "") {
            console.log("Tên phim không được để trống.");
        }
    }

    // Nhập số vé
    let ticketCount = inputPositiveInteger("Nhập số vé:");

    if (ticketCount === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }

    // Nhập giá mỗi vé
    let pricePerTicket = inputPositiveInteger("Nhập giá mỗi vé (VNĐ):");

    if (pricePerTicket === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }

    // Tính tiền và tạo đơn mới
    let calculation = calculateTotal(ticketCount, pricePerTicket);

    let newBooking = {
        bookingCode: bookingCode,
        customerName: customerName,
        movieTitle: movieTitle,
        ticketCount: ticketCount,
        pricePerTicket: pricePerTicket,
        totalAmount: calculation.totalAmount,
    };

    bookings.push(newBooking);

    console.log("Thêm đơn đặt vé thành công!");
    displayInvoice(newBooking, calculation);
}

// 3. Cập nhật đơn đặt vé
function handleUpdateBooking() {
    let codeInput = prompt("Nhập mã đặt vé cần cập nhật:");

    if (codeInput === null) {
        console.log("Đã hủy cập nhật");
        return;
    }

    let bookingCode = codeInput.trim().toUpperCase();
    let index = findBookingIndex(bookingCode);

    if (index === -1) {
        console.log("Không tìm thấy đơn đặt vé có mã " + bookingCode);
        return;
    }

    let ticketCount = inputPositiveInteger("Nhập số vé mới:");

    if (ticketCount === null) {
        console.log("Đã hủy cập nhật");
        return;
    }

    let pricePerTicket = inputPositiveInteger("Nhập giá mỗi vé mới (VNĐ):");

    if (pricePerTicket === null) {
        console.log("Đã hủy cập nhật");
        return;
    }

    // Chỉ cập nhật khi đã nhập đủ dữ liệu hợp lệ
    let booking = bookings[index];
    let oldTotal = booking.totalAmount;
    let calculation = calculateTotal(ticketCount, pricePerTicket);

    booking.ticketCount = ticketCount;
    booking.pricePerTicket = pricePerTicket;
    booking.totalAmount = calculation.totalAmount;

    console.log("Cập nhật thành công");
    console.log("Tổng thanh toán cũ: " + formatCurrency(oldTotal));
    console.log("Tổng thanh toán mới: " + formatCurrency(booking.totalAmount));
}

// 4. Xóa đơn đặt vé
function handleDeleteBooking() {
    let codeInput = prompt("Nhập mã đặt vé cần xóa:");

    if (codeInput === null) {
        console.log("Đã hủy thao tác xóa");
        return;
    }

    let bookingCode = codeInput.trim().toUpperCase();
    let index = findBookingIndex(bookingCode);

    if (index === -1) {
        console.log("Không tìm thấy đơn đặt vé có mã " + bookingCode);
        return;
    }

    let confirmation = prompt("Xác nhận xóa đơn đặt vé? (Y/N)");

    if (
        confirmation === null
        || confirmation.trim().toUpperCase() !== "Y"
    ) {
        console.log("Đã hủy thao tác xóa");
        return;
    }

    bookings.splice(index, 1);

    console.log("Xóa thành công, còn " + bookings.length + " đơn");
}

// 5. Tìm kiếm đơn đặt vé theo tên phim
function handleSearchBooking() {
    let keywordInput = prompt("Nhập từ khóa tìm kiếm tên phim:");

    if (keywordInput === null || keywordInput.trim() === "") {
        console.log("Chưa nhập từ khóa tìm kiếm");
        return;
    }

    let keyword = keywordInput.trim().toLocaleLowerCase("vi-VN");
    let results = [];

    for (let i = 0; i < bookings.length; i++) {
        let movieTitle = bookings[i].movieTitle.toLocaleLowerCase("vi-VN");

        if (movieTitle.includes(keyword)) {
            results.push(bookings[i]);
        }
    }

    if (results.length === 0) {
        console.log("Không tìm thấy đơn đặt vé phù hợp");
        return;
    }

    console.log("Kết quả tìm kiếm:");
    displayBookings(results);
}

// Báo cáo tổng kết khi thoát chương trình
function showSummaryReport() {
    console.log("==================================================");
    console.log("BÁO CÁO TỔNG KẾT ĐƠN ĐẶT VÉ");
    console.log("==================================================");

    if (bookings.length === 0) {
        console.log("Chưa có đơn đặt vé nào");
        console.log("==================================================");
        return;
    }

    let totalRevenue = 0;
    let highestBooking = bookings[0];

    for (let i = 0; i < bookings.length; i++) {
        let booking = bookings[i];

        totalRevenue += booking.totalAmount;

        if (booking.totalAmount > highestBooking.totalAmount) {
            highestBooking = booking;
        }
    }

    let averageRevenue = Math.round(totalRevenue / bookings.length);

    console.log("Tổng số đơn đặt vé: " + bookings.length);
    console.log("Tổng doanh thu: " + formatCurrency(totalRevenue));
    console.log("Doanh thu trung bình: " + formatCurrency(averageRevenue));
    console.log(
        "Đơn cao nhất: " + highestBooking.bookingCode
        + " - " + formatCurrency(highestBooking.totalAmount)
    );

    console.log("==================================================");
}

// Hàm chạy chương trình
function main() {
    let choice;
    let isRunning = true;

    do {
        let choiceInput = prompt(`
===================================
HỆ THỐNG QUẢN LÝ ĐẶT VÉ MOONLIGHT CINEMA
===================================
1. Hiển thị danh sách đơn đặt vé
2. Thêm đơn đặt vé mới
3. Cập nhật đơn đặt vé
4. Xóa đơn đặt vé
5. Tìm kiếm đơn đặt vé theo tên phim
0. Thoát chương trình
===================================
Vui lòng nhập lựa chọn của bạn (0 - 5):
        `);

        // Xử lý Cancel ở menu
        if (choiceInput === null) {
            console.log("Lựa chọn không hợp lệ. Vui lòng thử lại.");
            continue;
        }

        let trimmedChoice = choiceInput.trim();

        // Chỉ chấp nhận các lựa chọn nguyên từ 0 đến 5
        if (!/^[0-5]$/.test(trimmedChoice)) {
            console.log("Lựa chọn không hợp lệ. Vui lòng thử lại.");
            continue;
        }

        choice = Number(trimmedChoice);

        switch (choice) {
            case 1:
                displayBookings(bookings);
                break;

            case 2:
                handleCreateBooking();
                break;

            case 3:
                handleUpdateBooking();
                break;

            case 4:
                handleDeleteBooking();
                break;

            case 5:
                handleSearchBooking();
                break;

            case 0:
                showSummaryReport();
                console.log("Cảm ơn bạn đã sử dụng Moonlight Cinema!");
                isRunning = false;
                break;

            default:
                console.log("Lựa chọn không hợp lệ. Vui lòng thử lại.");
                break;
        }
    } while (isRunning);
}

// Chạy chương trình
main();
