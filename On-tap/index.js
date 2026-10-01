let isRunning = true;
let currentTicketCode = "";
let isTicketValid = false;
let totalRevenue = 0;
let totalVisits = 0;

do {
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

    if (choice === null) {
        console.log("Vui lòng nhập số (0 - 3)!");
        continue;
    }

    choice = choice.trim();

    switch (choice) {
        case "1":
            currentTicketCode = "";
            isTicketValid = false;
            while(!isTicketValid){
                let ticketInput = prompt("Nhập mã phiếu khám bệnh: ");

                if(ticketInput === null){
                    console.log("Chưa nhập mã phiếu");
                    continue;
                }

                currentTicketCode = ticketInput.trim().toUpperCase();

                if (currentTicketCode === ""){
                    console.log("Chưa nhập mã phiếu");
                    continue;
                }

                if(currentTicketCode.length < 6){
                    console.log("Lỗi: Độ dài nhỏ hơn 6 ký tự");
                    continue;
                }

                if(!currentTicketCode.startsWith("MED-")){
                    console.log('Lỗi: Sai tiền tố "MED-"');
                    continue;
                }

                if(currentTicketCode.includes(" ")){
                    console.log("Lỗi: Chứa khoảng trắng ở giữa");
                    continue;
                }

                isTicketValid = true;
                console.log("Kiểm chuẩn mã phiếu thành công!");
                console.log("Mã phiếu: " + currentTicketCode);
                console.log("Trạng thái: Hợp lệ");
                break;
            }
            break;

        case "2":
            
            break;

        case "3":
            break;

        case "0":
            isRunning = false;
            console.log("Cảm ơn bạn đã sử dụng hệ thống Medlatec Clinic!");
            break;

        default:
            console.log("Vui lòng nhập số (0 - 3)!");
            break;
    }
} while (isRunning);