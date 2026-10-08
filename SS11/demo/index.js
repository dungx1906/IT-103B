function getOrderStatus(status) {
    switch (status) {
        case "PENDING":
            return "Chờ xác nhận";

        case "IN_PROGRESS":
            return "Đang xử lý";

        case "SUCCESS":
            return "Thành công";

        case "FAILED":
            return "Thất bại";

        default:
            return "Trạng thái không hợp lệ";
    }
}

console.log(getOrderStatus("PENDING"));
console.log(getOrderStatus("IN_PROGRESS"));
console.log(getOrderStatus("SUCCESS"));
console.log(getOrderStatus("FAILED"));