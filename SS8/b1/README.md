````markdown
# Dò vết & Sửa lỗi Xóa Phần tử Mảng Trạm Sạc Gây Đột biến Chỉ số Index

## 1. Phân tích lỗi

### Lỗi 1: Sử dụng pop() thay vì shift()

Mã nguồn ban đầu:

```javascript
const nextVehicle = waitingQueue.pop();
````

`pop()` lấy và xóa phần tử cuối cùng của mảng.

Với dữ liệu:

```javascript
const waitingQueue = [
    "29A-112.33",
    "30E-889.12",
    "51K-678.99"
];
```

`pop()` sẽ lấy:

```text
51K-678.99
```

Điều này sai với nghiệp vụ FIFO vì xe đến đầu tiên phải được xử lý trước.

Cách sửa:

```javascript
const nextVehicle = waitingQueue.shift();
```

`shift()` lấy và xóa phần tử đầu tiên của mảng.

Kết quả:

```text
29A-112.33
```

Đây là xe đến đầu tiên nên phù hợp với nguyên tắc FIFO.

---

### Lỗi 2: Điều kiện vòng lặp sử dụng <= length

Mã nguồn ban đầu:

```javascript
for (let i = 0; i <= completedSessionsKwh.length; i++) {
    totalKwh += completedSessionsKwh[i];
}
```

Mảng có 4 phần tử:

```text
Index:  0     1     2     3
Value: 45.2  30.5  62.8  28.0
```

`completedSessionsKwh.length` có giá trị:

```text
4
```

Index hợp lệ chỉ từ:

```text
0 đến 3
```

Nhưng điều kiện:

```javascript
i <= completedSessionsKwh.length
```

cho phép `i` chạy đến 4.

Khi:

```javascript
i = 4
```

thì:

```javascript
completedSessionsKwh[4]
```

có giá trị:

```javascript
undefined
```

Sau đó:

```javascript
totalKwh += undefined;
```

làm cho:

```text
totalKwh = NaN
```

Do đó:

```javascript
totalRevenue = totalKwh * fastChargingRate;
```

cũng trở thành:

```text
NaN
```

Cách sửa:

```javascript
for (let i = 0; i < completedSessionsKwh.length; i++) {
    totalKwh += completedSessionsKwh[i];
}
```

Điều kiện `< length` đảm bảo chỉ truy cập các index hợp lệ.

---

## 2. Test Cases

| Trường hợp kiểm thử                     | Dữ liệu đầu vào                              | Kết quả sai thực tế                                                                       | Kết quả đúng mong đợi                                      |
| --------------------------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| TC01 - Điều phối xe theo FIFO           | `["29A-112.33", "30E-889.12", "51K-678.99"]` | `pop()` lấy `51K-678.99`, xe đến sau lại được sạc trước                                   | `shift()` lấy `29A-112.33`, xe đến đầu tiên được sạc trước |
| TC02 - Tính tổng điện năng và doanh thu | `[45.2, 30.5, 62.8, 28.0]`, đơn giá `4500`   | Vòng lặp chạy đến index `4`, cộng `undefined` làm tổng thành `NaN`, doanh thu thành `NaN` | Tổng điện năng `166.5 kWh`, doanh thu `749250 VNĐ`         |

---

## 3. Kết quả kiểm thử

### Test Case 01

Dữ liệu:

```javascript
[
    "29A-112.33",
    "30E-889.12",
    "51K-678.99"
]
```

Sử dụng:

```javascript
waitingQueue.shift();
```

Kết quả:

```text
Xe được điều phối vào sạc: 29A-112.33
```

Đúng nguyên tắc FIFO.

---

### Test Case 02

Dữ liệu:

```javascript
[45.2, 30.5, 62.8, 28.0]
```

Tính:

```text
45.2 + 30.5 + 62.8 + 28.0 = 166.5 kWh
```

Doanh thu:

```text
166.5 × 4500 = 749250 VNĐ
```

Kết quả:

```text
Tổng sản lượng: 166.5 kWh
Tổng doanh thu: 749250 VNĐ
```

---

## 4. Tổng kết lỗi đã sửa

Lỗi thứ nhất:

```javascript
waitingQueue.pop();
```

được sửa thành:

```javascript
waitingQueue.shift();
```

Mục đích: đảm bảo hàng đợi FIFO.

Lỗi thứ hai:

```javascript
i <= completedSessionsKwh.length
```

được sửa thành:

```javascript
i < completedSessionsKwh.length
```

Mục đích: không truy cập phần tử nằm ngoài phạm vi mảng.

Sau khi sửa, chương trình không còn lấy sai xe trong hàng đợi và không còn phát sinh `NaN` khi tính tổng điện năng và doanh thu.

```
```
