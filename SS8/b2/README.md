````markdown
# Khắc phục lỗi Tham chiếu Vùng nhớ Mảng khi Sao chép Trạng thái Trạm Sạc

## 1. Phân tích lỗi

### Lỗi 1: Sử dụng pop() thay vì shift()

Mã nguồn ban đầu:

```javascript
const xeVaoSac = hangDoiXeCho.pop();
````

`pop()` lấy phần tử cuối cùng của mảng.

Với hàng đợi:

```javascript
[
    "30A-98765",
    "29B-12345",
    "51C-45678"
]
```

`pop()` sẽ lấy:

```text
51C-45678
```

Điều này không đúng với nghiệp vụ hàng đợi FIFO.

Theo FIFO (First In First Out), xe đến trước phải được xử lý trước.

Cách sửa:

```javascript
const xeVaoSac = hangDoiXeCho.shift();
```

`shift()` lấy phần tử đầu tiên của mảng.

Kết quả:

```text
30A-98765
```

Đây là xe đến đầu tiên nên đúng với quy tắc FIFO.

---

### Lỗi 2: Duyệt mảng bằng <= length

Mã nguồn ban đầu:

```javascript
for (let i = 0; i <= hangDoiXeCho.length; i++) {
    console.log(`STT ${i + 1}: ${hangDoiXeCho[i]}`);
}
```

Sau khi sử dụng `pop()` và `push()`, hàng đợi có 3 phần tử.

```javascript
hangDoiXeCho.length
```

có giá trị:

```text
3
```

Các index hợp lệ là:

```text
0
1
2
```

Nhưng điều kiện:

```javascript
i <= hangDoiXeCho.length
```

cho phép `i` bằng 3.

Khi đó:

```javascript
hangDoiXeCho[3]
```

có giá trị:

```text
undefined
```

Vì vậy bảng LED xuất hiện:

```text
STT 4: Xe undefined
```

Cách sửa:

```javascript
for (let i = 0; i < hangDoiXeCho.length; i++) {
    console.log(`STT ${i + 1}: ${hangDoiXeCho[i]}`);
}
```

Điều kiện `< length` giúp vòng lặp chỉ truy cập các index hợp lệ.

---

## 2. Test Cases

| Trường hợp kiểm thử          | Dữ liệu đầu vào                                                   | Kết quả sai thực tế                       | Kết quả đúng mong đợi               |
| ---------------------------- | ----------------------------------------------------------------- | ----------------------------------------- | ----------------------------------- |
| TC01 - Lấy xe theo FIFO      | `["30A-98765", "29B-12345", "51C-45678"]`                         | `pop()` lấy `51C-45678`                   | `shift()` lấy `30A-98765`           |
| TC02 - Hiển thị danh sách xe | Hàng đợi sau khi xử lý: `["29B-12345", "51C-45678", "43D-88888"]` | `i <= length` tạo thêm `STT 4: undefined` | `i < length` chỉ hiển thị đúng 3 xe |

---

## 3. Kiểm thử TC01

Dữ liệu:

```javascript
const hangDoiXeCho = [
    "30A-98765",
    "29B-12345",
    "51C-45678"
];
```

Sử dụng:

```javascript
const xeVaoSac = hangDoiXeCho.shift();
```

Kết quả:

```text
Xe vào sạc: 30A-98765
```

Kết quả này đúng nguyên tắc FIFO.

---

## 4. Kiểm thử TC02

Sau khi lấy xe đầu tiên:

```text
29B-12345
51C-45678
```

Thêm xe mới:

```javascript
hangDoiXeCho.push("43D-88888");
```

Hàng đợi trở thành:

```text
29B-12345
51C-45678
43D-88888
```

Vòng lặp:

```javascript
for (let i = 0; i < hangDoiXeCho.length; i++) {
    console.log(`STT ${i + 1}: ${hangDoiXeCho[i]}`);
}
```

Kết quả:

```text
STT 1: 29B-12345
STT 2: 51C-45678
STT 3: 43D-88888
```

Không còn dòng:

```text
STT 4: undefined
```

---

## 5. Tổng kết

### Lỗi thứ nhất

Sai:

```javascript
hangDoiXeCho.pop();
```

Đúng:

```javascript
hangDoiXeCho.shift();
```

Mục đích: đảm bảo hàng đợi FIFO.

### Lỗi thứ hai

Sai:

```javascript
i <= hangDoiXeCho.length
```

Đúng:

```javascript
i < hangDoiXeCho.length
```

Mục đích: không truy cập phần tử nằm ngoài phạm vi mảng.

### Thao tác thêm xe

```javascript
hangDoiXeCho.push("43D-88888");
```

`push()` thêm phần tử vào cuối mảng.

### Kết quả cuối cùng

```text
Xe vào sạc: 30A-98765
STT 1: 29B-12345
STT 2: 51C-45678
STT 3: 43D-88888
```

Chương trình không sử dụng cấu trúc dữ liệu hoặc thuật toán nâng cao.

```
```
