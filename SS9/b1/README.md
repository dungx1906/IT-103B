# Dò vết & Sửa lỗi Truy cập Thuộc tính Động

## 1. Phân tích lỗi

Trong mã nguồn ban đầu, dòng lệnh bị sai là:

```javascript
const basePrice = bookingReservation.priceKey;
```

Biến `priceKey` có giá trị:

```javascript
const priceKey = "roomPrice";
```

Khi sử dụng Dot Notation:

```javascript
bookingReservation.priceKey
```

JavaScript sẽ tìm thuộc tính có tên chính xác là `"priceKey"` trong đối tượng `bookingReservation`.

Tuy nhiên, đối tượng không có thuộc tính `priceKey`, mà chỉ có thuộc tính:

```javascript
roomPrice: 1500000
```

Do đó:

```javascript
bookingReservation.priceKey
```

trả về:

```javascript
undefined
```

Sau đó chương trình thực hiện:

```javascript
surcharge = basePrice * 0.3;
```

Do `basePrice` là `undefined`, phép tính tạo ra:

```javascript
undefined * 0.3
```

kết quả là:

```javascript
NaN
```

Tiếp theo:

```javascript
const totalAmount = basePrice + surcharge;
```

cũng cho kết quả `NaN`.

## 2. Cách sửa lỗi

Vì `priceKey` là một biến chứa tên thuộc tính cần truy cập, phải sử dụng Bracket Notation:

```javascript
const basePrice = bookingReservation[priceKey];
```

Khi đó JavaScript lấy giá trị của thuộc tính `roomPrice`:

```text
bookingReservation["roomPrice"] = 1500000
```

Vì vậy:

```text
basePrice = 1500000
```

## 3. Test Cases

| Trường hợp kiểm thử       | Dữ liệu đầu vào                                                     | Kết quả sai thực tế                                             | Kết quả đúng mong đợi                                                |
| ------------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------- | -------------------------------------------------------------------- |
| TC01 - Nhận phòng sớm     | `priceKey = "roomPrice"`, `roomPrice = 1500000`, `checkInHour = 9`  | `basePrice = undefined`, `surcharge = NaN`, `totalAmount = NaN` | `basePrice = 1500000`, `surcharge = 450000`, `totalAmount = 1950000` |
| TC02 - Nhận phòng sau 12h | `priceKey = "roomPrice"`, `roomPrice = 1500000`, `checkInHour = 14` | `basePrice = undefined`, `surcharge = 0`, `totalAmount = NaN`   | `basePrice = 1500000`, `surcharge = 0`, `totalAmount = 1500000`      |

## 4. Kết luận

Lỗi xảy ra do sử dụng Dot Notation để truy cập thuộc tính thông qua một biến.

Sai:

```javascript
bookingReservation.priceKey
```

Đúng:

```javascript
bookingReservation[priceKey]
```

Dot Notation phù hợp khi biết trực tiếp tên thuộc tính:

```javascript
bookingReservation.roomPrice
```

Bracket Notation phù hợp khi tên thuộc tính được lưu trong biến:

```javascript
const priceKey = "roomPrice";
bookingReservation[priceKey];
```

Sau khi sửa, chương trình tính đúng phụ thu nhận phòng sớm và tổng số tiền thanh toán.
