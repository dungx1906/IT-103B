# THIẾT KẾ BẢNG DỰ TOÁN NGÂN SÁCH TIỆC SINH NHẬT

## 1. Mục tiêu

Xây dựng chương trình JavaScript tính toán tổng chi phí tổ chức
tiệc sinh nhật, chi phí trung bình trên mỗi khách và số tiền
chênh lệch so với ngân sách dự kiến.

## 2. Danh sách biến

| Biến | Kiểu dữ liệu | Đơn vị | Giá trị mẫu |
|---|---|---|---:|
| partyHost | String | Người | Nguyen Van An |
| venueCost | Number | VND | 2.000.000 |
| foodCostPerGuest | Number | VND/người | 150.000 |
| guestCount | Number | Người | 10 |
| drinkCost | Number | VND | 500.000 |
| decorCost | Number | VND | 800.000 |
| targetBudget | Number | VND | 5.000.000 |

## 3. Công thức

### Tổng tiền đồ ăn

foodTotal = foodCostPerGuest * guestCount

### Tổng chi phí

totalPartyCost = venueCost + foodTotal + drinkCost + decorCost

### Chi phí trung bình

costPerGuest = totalPartyCost / guestCount

### Chênh lệch ngân sách

budgetVariance = targetBudget - totalPartyCost

## 4. Test Case 01 - Thay đổi số lượng khách

Thay đổi:

guestCount = 15

Kết quả:

- Tiền đồ ăn: 2.250.000 VND
- Tổng chi phí: 5.550.000 VND
- Chi phí trung bình: 370.000 VND/người
- Chênh lệch ngân sách: -550.000 VND

## 5. Test Case 02 - Thay đổi ngân sách

Giữ nguyên số lượng khách:

guestCount = 10

Thay đổi:

targetBudget = 6.000.000

Kết quả:

- Tổng chi phí: 4.800.000 VND
- Chi phí trung bình: 480.000 VND/người
- Chênh lệch ngân sách: 1.200.000 VND

## 6. Kết luận

Chương trình sử dụng các biến kiểu String và Number,
các toán tử +, -, *, / và Template Literals để tính toán
và xuất bảng dự toán chi phí ra Console.