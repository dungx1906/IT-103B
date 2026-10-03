# Sửa lỗi Phân tách Chuỗi CSV Danh sách Sản phẩm do Khoảng trắng Thừa

## 1. Phân tích lỗi

Mã nguồn ban đầu có:

```javascript
rawTicketCode.trim();
rawTicketCode.toUpperCase();
```

Hai câu lệnh trên không làm thay đổi biến `rawTicketCode`.

Nguyên nhân là chuỗi trong JavaScript có tính bất biến (String Immutability).

Các phương thức như:

```javascript
trim()
toUpperCase()
replace()
replaceAll()
```

không thay đổi trực tiếp chuỗi ban đầu mà trả về một chuỗi mới.

Vì vậy:

```javascript
rawTicketCode.trim();
```

chỉ tạo ra chuỗi:

```text
med-card-0428-ut
```

nhưng kết quả không được lưu lại.

Tương tự:

```javascript
rawTicketCode.toUpperCase();
```

tạo ra:

```text
   MED-CARD-0428-UT
```

nhưng `rawTicketCode` vẫn giữ nguyên:

```text
   med-card-0428-ut
```

Do đó lệnh:

```javascript
rawTicketCode.startsWith("MED-");
```

trả về:

```text
false
```

vì mã vẫn có khoảng trắng ở đầu và đang viết thường.

## 2. Cách sửa

Kết quả của `trim()` được lưu vào biến mới:

```javascript
const cleanTicketCode = rawTicketCode.trim();
```

Sau đó tiếp tục chuyển sang chữ in hoa và lưu vào biến:

```javascript
const normalizedTicketCode = cleanTicketCode.toUpperCase();
```

Khi đó:

```text
MED-CARD-0428-UT
```

được sử dụng cho các thao tác tiếp theo.

## 3. Phân tích vị trí index

Chuỗi sau khi chuẩn hóa:

```text
MED-CARD-0428-UT
```

Có các vị trí:

```text
M E D - C A R D - 0 4 2 8 - U T
0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
```

Mã khoa `CARD` bắt đầu từ index `4` và kết thúc trước index `8`.

Vì vậy sử dụng:

```javascript
const departmentCode = normalizedTicketCode.slice(4, 8);
```

Kết quả:

```text
CARD
```

## 4. Test Cases

| Trường hợp kiểm thử                          | Dữ liệu đầu vào            | Kết quả sai thực tế                                                       | Kết quả đúng mong đợi                                      |      |      |     |
| -------------------------------------------- | -------------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------- | ---- | ---- | --- |
| TC01 - Mã có khoảng trắng và chữ thường      | `"   med-card-0428-ut   "` | `isValidPrefix = false` vì `trim()` và `toUpperCase()` không được lưu lại | `isValidPrefix = true` sau khi `trim()` và `toUpperCase()` |      |      |     |
| TC02 - Kiểm tra mã ưu tiên và chuỗi hiển thị | `"   med-card-0428-ut   "` | `isPriority = false`, chuỗi hiển thị vẫn còn khoảng trắng và chữ thường   | `isPriority = true`, chuỗi in là `MED                      | CARD | 0428 | UT` |

## 5. Nguyên nhân kỹ thuật

Lỗi xảy ra vì chương trình gọi các phương thức xử lý chuỗi nhưng không sử dụng giá trị trả về.

Ví dụ:

```javascript
rawTicketCode.trim();
```

không tương đương với:

```javascript
const cleanTicketCode = rawTicketCode.trim();
```

Câu lệnh thứ hai mới lưu kết quả chuỗi đã được xử lý để sử dụng cho các bước tiếp theo.

Tương tự, cần chuẩn hóa chữ hoa trước khi kiểm tra:

```javascript
const normalizedTicketCode = cleanTicketCode.toUpperCase();

const isValidPrefix = normalizedTicketCode.startsWith("MED-");
```

## 6. Kết quả cuối cùng

Sau khi sửa, chương trình cho kết quả:

```text
Mã phiếu hợp lệ: true
Khoa điều trị: CARD
Phiếu ưu tiên: true
Chuỗi in phiếu: MED | CARD | 0428 | UT
```

Chương trình chỉ sử dụng các thao tác chuỗi cơ bản đã học, không sử dụng cấu trúc dữ liệu hoặc thuật toán nâng cao.
