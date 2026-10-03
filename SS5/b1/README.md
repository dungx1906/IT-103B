# Dò vết & Sửa lỗi Cắt chuỗi Mã Vận đơn Do Sai Lệch Vị trí Index

## 1. Phân tích lỗi

### Lỗi 1: Kiểm tra tiền tố trước khi chuẩn hóa chữ hoa

Mã nguồn ban đầu sử dụng:

```javascript
const isValidPrefix = cleanAppointmentCode.startsWith("MED-");
```

Sau khi `trim()`, giá trị của `cleanAppointmentCode` là:

```text
med-nhi-1024
```

Trong khi chương trình lại kiểm tra tiền tố:

```text
MED-
```

JavaScript phân biệt chữ hoa và chữ thường nên:

```javascript
"med-nhi-1024".startsWith("MED-")
```

cho kết quả:

```text
false
```

Cách sửa là sử dụng `toUpperCase()` trước khi kiểm tra:

```javascript
const normalizedCode = cleanAppointmentCode.toUpperCase();
const isCodeValid = normalizedCode.startsWith("MED-");
```

Khi đó:

```text
MED-NHI-1024
```

bắt đầu bằng `MED-`, nên kết quả là `true`.

### Lỗi 2: Cắt chuỗi cần xác định đúng vị trí index

Chuỗi sau khi chuẩn hóa là:

```text
MED-NHI-1024
```

Các vị trí index:

```text
M E D - N H I - 1 0 2 4
0 1 2 3 4 5 6 7 8 9 10 11
```

Vì vậy:

```javascript
normalizedCode.slice(4, 7)
```

lấy:

```text
NHI
```

và:

```javascript
normalizedCode.slice(8, 12)
```

lấy:

```text
1024
```

Nếu xác định sai vị trí bắt đầu hoặc kết thúc của `slice()`, số thứ tự có thể bị thiếu chữ số.

## 2. Test Cases

| Trường hợp kiểm thử                     | Dữ liệu đầu vào      | Kết quả sai thực tế                                                 | Kết quả đúng mong đợi                                                                   |
| --------------------------------------- | -------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| TC01 - Mã có khoảng trắng và chữ thường | `"  med-nhi-1024  "` | Kiểm tra `"MED-"` trên chuỗi chữ thường nên `isValidPrefix = false` | Sau `trim()` và `toUpperCase()`, mã thành `"MED-NHI-1024"`, trạng thái hợp lệ là `true` |
| TC02 - Kiểm tra vị trí cắt số thứ tự    | `"MED-NHI-1024"`     | Cắt sai vị trí có thể làm thiếu chữ số trong mã `"1024"`            | `slice(8, 12)` trả về đầy đủ `"1024"`                                                   |

## 3. Nguyên nhân kỹ thuật

JavaScript sử dụng index bắt đầu từ `0` khi thao tác với chuỗi.

Hàm:

```javascript
slice(start, end)
```

lấy ký tự từ vị trí `start` và dừng trước vị trí `end`.

Đối với:

```text
MED-NHI-1024
```

số thứ tự `1024` bắt đầu tại index `8` và kết thúc trước index `12`.

Ngoài ra, chuỗi trong JavaScript có tính bất biến (Immutability). Các phương thức như `trim()` và `toUpperCase()` không thay đổi trực tiếp chuỗi ban đầu mà trả về một chuỗi mới.

Ví dụ:

```javascript
const normalizedCode = cleanAppointmentCode.toUpperCase();
```

Do đó cần lưu kết quả vào biến mới để sử dụng.

## 4. Kết quả sau khi sửa

```text
Bệnh nhân: NGUYỄN VĂN AN
Chuyên khoa: NHI
Số thứ tự tiếp đón: 1024
Trạng thái hợp lệ: true
```
