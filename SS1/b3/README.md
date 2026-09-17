# Phân tích Trade-off: Number() vs Unary Plus (+value)

## 1. Mục tiêu

So sánh hai phương pháp ép kiểu dữ liệu trong JavaScript:

- Number()
- Unary Plus (+value)

Thực hiện kiểm nghiệm trên nhiều loại dữ liệu đầu vào và đánh giá
tính dễ đọc, khả năng bảo trì và khả năng xử lý dữ liệu đặc biệt.

---

## 2. Bộ dữ liệu kiểm nghiệm

Các giá trị được sử dụng:

1. "150000" - Số nguyên dạng chuỗi
2. "3.75" - Số thực dạng chuỗi
3. "" - Chuỗi rỗng
4. "100k" - Chuỗi chứa chữ cái
5. null - Giá trị null
6. undefined - Giá trị undefined

---

## 3. Kết quả thực nghiệm

| Giá trị | Number() | +value | typeof Number() | typeof +value |
|---|---:|---:|---|---|
| "150000" | 150000 | 150000 | number | number |
| "3.75" | 3.75 | 3.75 | number | number |
| "" | 0 | 0 | number | number |
| "100k" | NaN | NaN | number | number |
| null | 0 | 0 | number | number |
| undefined | NaN | NaN | number | number |

---

## 4. Phân tích Trade-off

| Tiêu chí | Number() | Unary Plus (+value) |
|---|---|---|
| Tính dễ đọc & rõ ý định | Dễ đọc, thể hiện rõ đang chuyển đổi sang số | Ngắn gọn nhưng khó hiểu hơn với người mới |
| Nguy cơ nhầm lẫn cú pháp | Thấp | Cao hơn, đặc biệt khi kết hợp phép cộng |
| Xử lý chuỗi kèm đơn vị | Không bóc tách được "100k" | Không bóc tách được "100k" |
| Khả năng bảo trì | Dễ bảo trì | Có thể khó hiểu khi đọc code |
| Độ ngắn gọn | Dài hơn | Rất ngắn gọn |

---

## 5. Ví dụ về nguy cơ nhầm lẫn

Sử dụng Number():

const subtotal = Number(price);
const total = subtotal + Number(fee);

Cách viết thể hiện rõ fee được chuyển sang số.

Sử dụng Unary Plus:

const subtotal = Number(price);
const total = subtotal + +fee;

Biểu thức `+ +fee` có thể gây khó hiểu cho lập trình viên mới.

---

## 6. Xử lý chuỗi có đơn vị

Cả Number() và Unary Plus đều không thể chuyển trực tiếp:

"100k"

thành:

100

Kết quả đều là:

NaN

Nếu cần bóc tách số từ chuỗi có ký tự phía sau, có thể sử dụng:

parseInt("100k", 10)

Kết quả:

100

Tuy nhiên, cần sử dụng parseInt() có chủ đích vì nó có hành vi
khác với Number().

---

## 7. Kết luận

Đề xuất sử dụng Number() làm quy chuẩn chung cho dự án.

Lý do:

- Dễ đọc và dễ hiểu.
- Thể hiện rõ ý định ép kiểu dữ liệu.
- Dễ bảo trì khi nhiều lập trình viên cùng làm việc.
- Giảm nguy cơ nhầm lẫn với toán tử cộng.
- Phù hợp với các dữ liệu số từ form hoặc API.

Unary Plus (+value) có ưu điểm là ngắn gọn nhưng dễ gây nhầm lẫn
khi đọc code, đặc biệt trong các biểu thức có nhiều toán tử.

Do đó:

Number() → Quy chuẩn chung.

+value → Chỉ nên sử dụng khi lập trình viên hiểu rõ cú pháp và
ngữ cảnh sử dụng.