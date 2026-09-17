# README - Quyết toán hóa đơn đặt món

## 1. Mục tiêu

Xây dựng chương trình JavaScript tính toán hóa đơn đặt món trực tuyến,
sử dụng ép kiểu dữ liệu bằng Number() và parseFloat(), các toán tử số học
và Template Literals để xuất hóa đơn ra Console.

## 2. Công thức

Tiền món ăn chưa giảm:

foodSubtotal = (mainDishPrice + drinkPrice) * quantity

Tiền sau chiết khấu:

discountedTotal = foodSubtotal - openingDiscount

Tiền VAT:

vatAmount = discountedTotal * vatRate

Cước vận chuyển:

shippingFee = 15000 + distanceKm * 4000

Tổng thanh toán:

finalPayment = discountedTotal + vatAmount + shippingFee

## 3. Test Case 01 - Dữ liệu ban đầu

### Input

- Giá món chính: 120000 VND
- Giá đồ uống: 35000 VND
- Số lượng: 2
- Khoảng cách: 3.5 km
- Chiết khấu: 20000 VND
- VAT: 8%

### Expected Output

- Tiền món ăn: 310000 VND
- Tiền sau chiết khấu: 290000 VND
- VAT: 23200 VND
- Cước vận chuyển: 29000 VND
- Tổng thanh toán: 342200 VND

## 4. Test Case 02 - Thay đổi khoảng cách

Thay đổi:

rawDistanceKm = "5.0"

### Expected Output

- Tiền món ăn: 310000 VND
- Tiền sau chiết khấu: 290000 VND
- VAT: 23200 VND
- Cước vận chuyển: 35000 VND
- Tổng thanh toán: 348200 VND

## 5. Test Case 03 - Thay đổi số lượng

Thay đổi:

rawQuantity = "3"

### Expected Output

- Tiền món ăn: 465000 VND
- Tiền sau chiết khấu: 445000 VND
- VAT: 35600 VND
- Cước vận chuyển: 29000 VND
- Tổng thanh toán: 509600 VND

## 6. Cách kiểm thử

1. Mở file index.html bằng Google Chrome hoặc Microsoft Edge.
2. Nhấn F12.
3. Chọn tab Console.
4. Kiểm tra hóa đơn được in ra.
5. Thay đổi dữ liệu trong orderBilling.js và tải lại trang để kiểm tra.

Không sử dụng Terminal để thực thi mã nguồn.