# Dò luồng & Sửa lỗi Tính Cước Lũy tiến GrabRide

## 1. Phân tích lỗi

Lỗi nằm ở câu lệnh:

```javascript
totalFare = baseFare + distanceInKm * extraFarePerKm;
```

Khi quãng đường lớn hơn 2 km, chương trình đang lấy toàn bộ số km để tính cước phát sinh.

Công thức đúng phải là:

```javascript
totalFare = baseFare + (distanceInKm - 2) * extraFarePerKm;
```

Như vậy, 2 km đầu tiên chỉ tính cước cơ sở, các km vượt quá 2 km mới tính thêm `4.500 VNĐ/km`.

## 2. Test Cases

| Trường hợp kiểm thử                 | Dữ liệu đầu vào                      | Kết quả sai thực tế | Kết quả đúng mong đợi |
| ----------------------------------- | ------------------------------------ | ------------------: | --------------------: |
| TC01 - Chuyến xe đúng 2 km, mưa lớn | distanceInKm = 2, isHeavyRain = true |          14.400 VNĐ |            14.400 VNĐ |
| TC02 - Chuyến xe 4 km, mưa lớn      | distanceInKm = 4, isHeavyRain = true |          36.000 VNĐ |            25.200 VNĐ |

### Giải thích TC02

Cước đúng:

* 2 km đầu: 12.000 VNĐ
* 2 km tiếp theo: 2 × 4.500 = 9.000 VNĐ
* Cước trước phụ phí: 21.000 VNĐ
* Phụ phí mưa lớn 20%: 21.000 × 1.2 = 25.200 VNĐ

## 3. Kết luận

Nguyên nhân lỗi là chương trình tính `distanceInKm * extraFarePerKm` thay vì chỉ tính phần quãng đường vượt quá 2 km.

Cần sửa thành:

```javascript
(distanceInKm - 2) * extraFarePerKm
```

để tránh tính trùng 2 km đầu tiên.
