
"use strict";

// Danh sach thue bao ban dau
const subscriptions = [
    {
        subscriptionId: "SUB-001",
        customerName: "Nguyen Van An",
        planTier: "FAMILY",
        deviceLimit: 5,
        daysOverdue: 3,
        status: "ACTIVE"
    },
    {
        subscriptionId: "SUB-002",
        customerName: "Tran Thi Mai",
        planTier: "FAMILY",
        deviceLimit: 5,
        daysOverdue: 4,
        status: "ACTIVE"
    }
];

// Kiem tra va cap nhat trang thai thue bao
function auditSubscriptions(list) {
    for (let i = 0; i < list.length; i++) {
        const sub = list[i];

        if (sub.daysOverdue > 3) {
            // Qua thoi gian an han: ha cap ve FREE
            sub.planTier = "FREE";
            sub.deviceLimit = 1;
            sub.status = "EXPIRED";
        } else if (sub.daysOverdue > 0) {
            // Con trong thoi gian an han
            sub.status = "GRACE_PERIOD";
        } else {
            // Khong con no cuoc qua han
            sub.status = "ACTIVE";
        }
    }
}

// Thuc hien kiem tra danh sach thue bao
auditSubscriptions(subscriptions);

// Hien thi ket qua
console.log("===== KET QUA KIEM TRA THUE BAO =====");
console.table(subscriptions);
