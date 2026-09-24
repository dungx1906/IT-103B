# Khắc phục lỗi rẽ nhánh phân loại hạng thành viên GrabRewards

## 1. Phân tích lỗi

Lỗi nằm ở câu lệnh:

```javascript
totalFare = baseFare + distanceKm * pricePerAdditionalKm;
```

Khi `distanceKm > 2`, chương trình đang lấy toàn bộ quãng đường để tính phí phụ trội.

Điều này làm 2 km đầu tiên bị tính thêm một lần nữa.

Công thức đúng phải là:

```javascript
totalFare = baseFare + (distanceKm - 2) * pricePerAdditionalKm;
```

Chỉ phần quãng đường vượt quá 2 km mới được tính `4.500 VNĐ/km`.

## 2. Test Cases

| Trường hợp kiểm thử             | Dữ liệu đầu vào                   | Kết quả sai thực tế | Kết quả đúng mong đợi |
| ------------------------------- | --------------------------------- | ------------------: | --------------------: |
| TC01 - Quãng đường bằng 2 km    | distanceKm = 2, isRaining = false |          12.000 VNĐ |            12.000 VNĐ |
| TC02 - Quãng đường lớn hơn 2 km | distanceKm = 4, isRaining = false |          30.000 VNĐ |            21.000 VNĐ |

### Giải thích TC02

Quãng đường 4 km gồm:

* 2 km đầu: `12.000 VNĐ`
* 2 km tiếp theo: `2 × 4.500 = 9.000 VNĐ`
* Tổng đúng: `12.000 + 9.000 = 21.000 VNĐ`

Trong mã nguồn cũ:

`12.000 + 4 × 4.500 = 30.000 VNĐ`

Do đó, 2 km đầu đã bị tính lặp lại trong phần phụ trội.

## 3. Kết luận

Cần thay:

```javascript
totalFare = baseFare + distanceKm * pricePerAdditionalKm;
```

bằng:

```javascript
totalFare = baseFare + (distanceKm - 2) * pricePerAdditionalKm;
```

Sau khi sửa, chương trình tính đúng cước lũy tiến và không tính lặp 2 km cơ sở.
