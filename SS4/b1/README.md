# Dò vết & Sửa lỗi Lặp Vô tận trong Quản trị Tồn kho Hàng hóa

## 1. Phân tích lỗi

### Lỗi 1: Điều kiện vòng lặp

Mã cũ:

```javascript
for (let cupIndex = 1; cupIndex < orderQuantity; cupIndex++)
```

Với `orderQuantity = 3`, vòng lặp chỉ chạy với `cupIndex = 1` và `cupIndex = 2`, tức chỉ tính 2 ly.

Điều kiện đúng phải là:

```javascript
cupIndex <= orderQuantity
```

Khi đó vòng lặp chạy đủ 3 lần tương ứng với 3 ly.

### Lỗi 2: Áp dụng chiết khấu sai vị trí

Mã cũ đặt:

```javascript
if (isGoldMember) {
  totalBill = totalBill * 0.9;
}
```

bên trong vòng lặp.

Điều này khiến tổng tiền bị giảm 10% sau mỗi lần tính thêm một ly. Chiết khấu phải được thực hiện sau khi vòng lặp đã tính đủ tiền của toàn bộ đơn hàng.

## 2. Bảng Test Cases

| Trường hợp kiểm thử                     | Dữ liệu đầu vào                                                        | Kết quả sai thực tế | Kết quả đúng mong đợi |
| --------------------------------------- | ---------------------------------------------------------------------- | ------------------: | --------------------: |
| 3 ly Phin Sữa Đá, khách Gold            | `orderQuantity = 3`, `isGoldMember = true`, `singleCupPrice = 47.000`  |        `84.630 VNĐ` |         `126.900 VNĐ` |
| 3 ly Phin Sữa Đá, khách không phải Gold | `orderQuantity = 3`, `isGoldMember = false`, `singleCupPrice = 47.000` |        `94.000 VNĐ` |         `141.000 VNĐ` |

## 3. Kết luận

Chương trình sai do điều kiện vòng lặp bị lệch một đơn vị và chiết khấu được đặt bên trong vòng lặp.

Cách sửa:

* Đổi `cupIndex < orderQuantity` thành `cupIndex <= orderQuantity`.
* Tính đủ tổng tiền trong vòng lặp.
* Sau vòng lặp mới áp dụng giảm 10% cho thành viên Gold.
