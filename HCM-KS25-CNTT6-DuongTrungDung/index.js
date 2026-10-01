let currentOrderCode = "";
let isOrderValid = false;
let totalrevenue = 0;
let totalOrder = 0;

let isRunning = true;

let menu = `
===============================================
    HỆ THỐNG THANH TOÁN NHÀ SÁCH TRI THỨC 
===============================================
1. Nhập và kiềm chuẩn mã đơn hàng
2. Tính tiền đơn sách
3. Thẩm định mã hóa đơn may mắn
0. Thoát chương trình
===============================================
`;

do{
    console.log(menu);

    let choiceInput = prompt("Nhạp lựa chọn của bạn(0-3): ");

    if(choiceInput === null){
        console.log("Bạn hãy chọn đúng");
    }

    let choice = choiceInput.trim();


    switch(choice){
        case "1":
            currentOrderCode = "";
            isOrderValid = false;

            while(!isOrderValid){
                let inputOrderCode = prompt("Nhập vào mã đơn hàng:");

                if(inputOrderCode === null){
                    console.log("Vui lòng không để chuỗi rỗng và cancel:");
                    continue;
                }

                currentOrderCode = inputOrderCode.trim().toUpperCase();

                if(currentOrderCode.length < 6){
                    console.log("Độ dài tối thiểu là 6 ký tự!");
                    continue;
                }

                if(!currentOrderCode.startsWith("BOK-")){
                    console.log("Sai tiền tố 'BOK-' !");
                    continue;
                }

                if(currentOrderCode.includes(" ")){
                    console.log("Chứa khoảng trắng ở giữa!");
                    continue;
                }

                console.log("Lưu mã mới thành công:");
                isOrderValid = true;

            }
            break;

        case "2":
            if(!isOrderValid){
                console.log("Vui lòng chọn lựa chọn 1 trước!");
                break;
            }
            
            while(true){
                let bookCount = Number(prompt("Nhập số cuốn sách: "));
                let pricePerBook = Number(prompt("Nhập vào giá mỗi cuốn sách"));

                if(bookCount == "" && pricePerBook ==""){
                    console.log("Vui lòng không để trống!")
                    continue;
                }

                if((bookCount > 0) && (pricePerBook > 0) && (bookCount % 1 == 0) && (pricePerBook % 1 == 0)){
                    console.log("Vui lòng nhập số nguyên và lớn hơn 0!");
                    continue;
                }

                if(bookCount === null && pricePerBook === null){
                    console.log("Vui lòng hủy giao dịch hay Cancel");
                    continue; 
                }

                break;
            }
            let baseCost;
            let discountAmount = 0;

            let bookWrappingAndPackagingFee;


            baseCost = bookCount * pricePerBook;
            if(bookCount > 4){
                discountAmount = Math.round(baseCost * 0.1);
            }

            bookWrappingAndPackagingFee = Math.round((baseCost - discountAmount) * 0.08);

            let totalAmount = (baseCost - discountAmount) + bookWrappingAndPackagingFee;

            totalrevenue += totalAmount;
            totalOrder += 1;

            currentOrderCode = "";
            isOrderValid = false;

            console.log("Mã đơn hàng: ",currentOrderCode);
            console.log("Số cuốn sách:", bookCount, "Cuốn");
            console.log("Chi phí cơ sở:", baseCost, "VND");
            console.log("Tiền giảm giá :", discountAmount ,"VND");
            console.log("Phí bọc sách và đóng gói", bookWrappingAndPackagingFee, "VND");
            console.log("Tổng thanh toán: ", totalAmount, "VND");


            break;

        case "3":
            console.log("lựa chọn 3: ");
            break;

        case "0":
            console.log("Kết thúc chương trình:");
            isRunning = false;
            break;

        default:
            console.log("Vui lòng nhập số(0-3)!")
            break;
}


}while(isRunning)

    