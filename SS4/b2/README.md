# Khắc phục Lỗi Bỏ sót Phần tử khi Sử dụng continue trong Vòng lặp

## 1. Phân tích lỗi

Mã nguồn hiện tại sử dụng:

```javascript
if (currentDrinkSize === "X") {
  break;
}
```

Khi gặp ký tự `"X"`, lệnh `break` làm vòng lặp kết thúc ngay lập tức.

Với chuỗi:

```text
MLXSM
```

chương trình xử lý được `M`, `L`, sau đó gặp `X` và dừng lại. Hai ly `S` và `M` phía sau không được tính vào hóa đơn.

Cách sửa là thay `break` bằng `continue`.

`continue` chỉ bỏ qua phần tử hiện tại và chuyển sang lần lặp tiếp theo. Vì vậy chương trình vẫn tiếp tục xử lý các ly phía sau `"X"`.

## 2. Bảng Test Cases

| Trường hợp kiểm thử       | Dữ liệu đầu vào                                                   | Kết quả sai thực tế | Kết quả đúng mong đợi |
| ------------------------- | ----------------------------------------------------------------- | ------------------: | --------------------: |
| Chuỗi có ly bị hủy ở giữa | `orderSizes = "MLXSM"`, `toppingCount = 2`, `isGoldMember = true` |        `76.500 VNĐ` |         `113.400 VNĐ` |
| Chuỗi không có ly bị hủy  | `orderSizes = "MSM"`, `toppingCount = 2`, `isGoldMember = true`   |        `90.000 VNĐ` |          `90.000 VNĐ` |

## 3. Kết luận

Lỗi nghiệp vụ xảy ra do `break` làm dừng toàn bộ vòng lặp khi gặp mã `"X"`.

Sửa thành `continue` giúp:

* Bỏ qua ly bị hủy.
* Tiếp tục quét các ly phía sau.
* Không bỏ sót doanh thu của các ly hợp lệ.
