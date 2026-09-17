1. Phân tích lỗi

Các giá trị rawFoodPrice, rawToppingPrice và rawDeliveryFee được nhận từ biểu mẫu dưới dạng chuỗi ký tự (string).

Trong JavaScript, toán tử + khi có ít nhất một toán hạng là chuỗi sẽ thực hiện nối chuỗi thay vì phép cộng số học.

Lỗi tại foodTotal
const foodTotal = rawFoodPrice + rawToppingPrice;

Dữ liệu:

rawFoodPrice = "55000"
rawToppingPrice = "15000"

Kết quả sai:

"55000" + "15000" = "5500015000"

Thay vì:

55000 + 15000 = 70000
Lỗi tại finalPayment

Do foodTotal đã là chuỗi "5500015000", khi thực hiện:

const finalPayment = foodTotal + rawDeliveryFee - voucherDiscount;

Phép + tiếp tục nối chuỗi:

"5500015000" + "20000" = "550001500020000"

Sau đó phép - 10000 khiến JavaScript chuyển chuỗi này thành số để thực hiện phép trừ, dẫn đến kết quả không đúng với số tiền thực tế.

Nguyên nhân chính là dữ liệu giá tiền chưa được chuyển từ string sang number trước khi tính toán.

2. Bảng Test Cases
Trường hợp kiểm thử	Dữ liệu đầu vào	Kết quả sai thực tế	Kết quả đúng mong đợi
TC01 - Tính tổng tiền món ăn	rawFoodPrice = "55000", rawToppingPrice = "15000"	5500015000 VND	70000 VND
TC02 - Tính tổng tiền thanh toán	foodTotal = "5500015000", rawDeliveryFee = "20000", voucherDiscount = 10000	550001500020000 VND	80000 VND
3. Cách sửa lỗi

Sử dụng Number() để ép kiểu tường minh các giá trị chuỗi sang kiểu số trước khi thực hiện phép tính.

const foodPrice = Number(rawFoodPrice);
const toppingPrice = Number(rawToppingPrice);
const deliveryFee = Number(rawDeliveryFee);

Khi đó JavaScript thực hiện phép cộng số học:

55000 + 15000 = 70000

và:

70000 + 20000 - 10000 = 80000
4. Kết quả mong đợi
Khách hàng: Nguyen Thi Mai
Món ăn: Com Tam Suon Bi Cha
Tổng tiền món ăn: 70000 VND
Số tiền thanh toán thực tế: 80000 VND