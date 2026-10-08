# BÀI 2: KHẮC PHỤC LỖI SAO CHÉP NÔNG ĐỐI TƯỢNG

## 1. Phân tích lỗi

### Lỗi 1: Truy cập thuộc tính động bằng Dot Notation

Mã nguồn sai:

```javascript
const basePrice = bookingReservation.priceKey;
```

JavaScript tìm thuộc tính có tên `"priceKey"` thay vì lấy giá trị `"roomPrice"` từ biến `priceKey`. Do thuộc tính này không tồn tại nên kết quả là `undefined`.

Cách sửa:

```javascript
const basePrice = bookingReservation[priceKey];
```

Kết quả: `basePrice = 1500000`.

### Lỗi 2: Gán undefined thay vì xóa thuộc tính

Mã nguồn sai:

```javascript
bookingReservation.discountCode = undefined;
```

Cách này chỉ thay đổi giá trị của thuộc tính, không xóa thuộc tính khỏi đối tượng. Vì vậy, biểu thức `'discountCode' in bookingReservation` vẫn trả về `true`.

Cách sửa:

```javascript
delete bookingReservation.discountCode;
```

Sau khi xóa, biểu thức `'discountCode' in bookingReservation` trả về `false`.

### Lỗi 3: Truy cập sai thuộc tính trong vòng lặp

Mã nguồn sai:

```javascript
console.log(key + ": " + bookingReservation.key);
```

JavaScript tìm thuộc tính có tên `"key"` thay vì thuộc tính có tên được lưu trong biến `key`.

Cách sửa:

```javascript
console.log(key + ": " + bookingReservation[key]);
```

Khi đó chương trình sẽ hiển thị đúng tên và giá trị của từng thuộc tính.

## 2. Bảng Test Cases

| Trường hợp kiểm thử                | Dữ liệu đầu vào                                       | Kết quả sai thực tế                                                                | Kết quả đúng mong đợi                                               |
| ---------------------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| TC01 - Tính tiền và hiển thị phiếu | `roomPrice = 1500000`, `checkInHour = 9`              | Giá phòng là `undefined`, tổng tiền là `NaN`; vòng lặp không hiển thị đúng giá trị | Phụ thu `450000`, tổng tiền `1950000`; hiển thị đúng các thuộc tính |
| TC02 - Xóa voucher không hợp lệ    | `isVoucherValid = false`, `discountCode = "SUMMER10"` | Gán `undefined` nhưng thuộc tính vẫn tồn tại; toán tử `in` trả về `true`           | Xóa thuộc tính bằng `delete`; toán tử `in` trả về `false`           |

## 3. Kết quả kiểm tra

Với giá phòng 1.500.000 đồng và giờ nhận phòng là 9h:

* Phụ thu nhận phòng sớm: 450.000 đồng.
* Tổng tiền thanh toán: 1.950.000 đồng.
* Mã voucher không hợp lệ đã bị xóa khỏi đối tượng.
* Vòng lặp `for...in` hiển thị đúng các thuộc tính và giá trị.

Kết quả kiểm tra:

```javascript
"discountCode" in bookingReservation
// false
```

## 4. Kết luận

Bài tập sử dụng ba kiến thức JavaScript cơ bản:

1. Bracket Notation: `object[key]` để truy cập thuộc tính động.
2. Toán tử `delete` để xóa thuộc tính khỏi đối tượng.
3. Vòng lặp `for...in` kết hợp `object[key]` để duyệt và hiển thị các thuộc tính.

Chương trình sau khi sửa đáp ứng yêu cầu tính tiền, xóa voucher không hợp lệ và hiển thị thông tin phiếu đặt phòng.
