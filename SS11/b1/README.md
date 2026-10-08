# Dò vết & Sửa lỗi Falsy khi cập nhật thiết bị

## 1. Phân tích lỗi

Mã nguồn ban đầu sử dụng:

```javascript
if (updatedData.isActive) {
  targetDevice.isActive = updatedData.isActive;
}
```

và:

```javascript
if (updatedData.powerWatts) {
  targetDevice.powerWatts = updatedData.powerWatts;
}
```

Đây là lỗi do JavaScript coi `false` và `0` là các giá trị Falsy.

Khi người dùng muốn tắt điều hòa:

```javascript
{
  isActive: false
}
```

điều kiện:

```javascript
if (updatedData.isActive)
```

tương đương với việc kiểm tra:

```javascript
if (false)
```

nên khối lệnh không được thực hiện.

Tương tự, khi người dùng muốn đặt công suất đèn về 0W:

```javascript
{
  powerWatts: 0
}
```

điều kiện:

```javascript
if (updatedData.powerWatts)
```

tương đương với:

```javascript
if (0)
```

nên lệnh cập nhật cũng bị bỏ qua.

## 2. Cách sửa

Không kiểm tra trực tiếp bằng `if (prop)`.

Sử dụng:

```javascript
if (updatedData.isActive !== undefined) {
  targetDevice.isActive = updatedData.isActive;
}
```

và:

```javascript
if (updatedData.powerWatts !== undefined) {
  targetDevice.powerWatts = updatedData.powerWatts;
}
```

Cách kiểm tra này xác định thuộc tính có giá trị khác `undefined`, vì vậy vẫn chấp nhận được các giá trị hợp lệ như `false` và `0`.

## 3. Bảng Test Cases

| Trường hợp kiểm thử     | Dữ liệu đầu vào                        | Kết quả sai thực tế                                                                  | Kết quả đúng mong đợi                           |
| ----------------------- | -------------------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------- |
| TC01 - Tắt điều hòa     | `targetId = "D01"`, `isActive = false` | Điều kiện `if (updatedData.isActive)` là `false`, nên điều hòa vẫn `isActive = true` | Điều hòa được cập nhật thành `isActive = false` |
| TC02 - Hạ công suất đèn | `targetId = "D02"`, `powerWatts = 0`   | Điều kiện `if (updatedData.powerWatts)` là `false`, nên công suất vẫn là `100W`      | Đèn được cập nhật thành `powerWatts = 0W`       |

## 4. So sánh

Cách kiểm tra sai:

```javascript
if (updatedData.isActive)
```

```javascript
if (updatedData.powerWatts)
```

Cách kiểm tra đúng:

```javascript
if (updatedData.isActive !== undefined)
```

```javascript
if (updatedData.powerWatts !== undefined)
```

## 5. Kết luận

`false` và `0` là các giá trị hợp lệ trong dữ liệu cập nhật nhưng thuộc nhóm Falsy của JavaScript.

Vì vậy, khi cần phân biệt giữa "không truyền thuộc tính" và "truyền thuộc tính với giá trị false hoặc 0", cần sử dụng:

```javascript
updatedData.property !== undefined
```

Thay vì:

```javascript
if (updatedData.property)
```

Sau khi sửa, hệ thống có thể tắt điều hòa bằng `false` và đưa công suất đèn về `0W` chính xác.
