
"use strict";

// Danh sach thue bao ban dau
const subscriptions = [
    {
        subscriptionId: "SUB_001",
        customerName: "Nguyen Van An",
        planTier: "PERSONAL",
        deviceLimit: 1,
        status: "ACTIVE"
    },
    {
        subscriptionId: "SUB_002",
        customerName: "Tran Thi Mai",
        planTier: "FAMILY",
        deviceLimit: 5,
        status: "ACTIVE"
    },
    {
        subscriptionId: "SUB_003",
        customerName: "Le Minh Cuong",
        planTier: "PERSONAL",
        deviceLimit: 1,
        status: "ACTIVE"
    }
];

// Gioi han thiet bi theo goi
const PERSONAL_DEVICE_LIMIT = 1;
const FAMILY_DEVICE_LIMIT = 5;

// Bien dem tao ma thue bao
let subscriptionCounter = 4;

// Tim vi tri thue bao theo ma
function findSubscriptionIndex(subscriptionId) {
    for (let i = 0; i < subscriptions.length; i++) {
        if (
            subscriptions[i].subscriptionId ===
            subscriptionId.trim().toUpperCase()
        ) {
            return i;
        }
    }

    return -1;
}

// Tao ma thue bao moi
function generateSubscriptionId() {
    let subscriptionId;

    do {
        subscriptionId = "SUB_" +
            String(subscriptionCounter).padStart(3, "0");

        subscriptionCounter++;
    } while (findSubscriptionIndex(subscriptionId) !== -1);

    return subscriptionId;
}

// Chon gioi han thiet bi theo goi
function getDeviceLimit(planTier) {
    if (planTier === "PERSONAL") {
        return PERSONAL_DEVICE_LIMIT;
    }

    if (planTier === "FAMILY") {
        return FAMILY_DEVICE_LIMIT;
    }

    return -1;
}

// Them thue bao moi
function addSubscription() {
    console.log("\n===== THEM THUE BAO MOI =====");

    const customerName = prompt("Nhap ten khach hang:");

    if (customerName === null || customerName.trim() === "") {
        console.log("Ten khach hang khong duoc de trong.");
        return;
    }

    const planInput = prompt(
        "Chon goi dich vu:\n1. PERSONAL\n2. FAMILY"
    );

    if (planInput === null) {
        console.log("Da huy thao tac.");
        return;
    }

    let planTier;

    switch (planInput.trim()) {
        case "1":
            planTier = "PERSONAL";
            break;

        case "2":
            planTier = "FAMILY";
            break;

        default:
            console.log("Goi dich vu khong hop le.");
            return;
    }

    const subscriptionId = generateSubscriptionId();

    const newSubscription = {
        subscriptionId: subscriptionId,
        customerName: customerName.trim(),
        planTier: planTier,
        deviceLimit: getDeviceLimit(planTier),
        status: "ACTIVE"
    };

    subscriptions.push(newSubscription);

    console.log("Them thue bao thanh cong!");
    console.log("Ma thue bao: " + subscriptionId);
    console.log("Khach hang: " + customerName.trim());
    console.log("Goi dich vu: " + planTier);
}

// Hien thi danh sach thue bao
function listSubscriptions() {
    console.log("\n===== DANH SACH THUE BAO =====");

    if (subscriptions.length === 0) {
        console.log("Danh sach thue bao dang trong.");
        return;
    }

    console.table(
        subscriptions.map(function(subscription) {
            return {
                "Ma thue bao": subscription.subscriptionId,
                "Khach hang": subscription.customerName,
                "Goi dich vu": subscription.planTier,
                "Gioi han thiet bi": subscription.deviceLimit,
                "Trang thai": subscription.status
            };
        })
    );
}

// Cap nhat goi dich vu
function updateSubscription() {
    console.log("\n===== CAP NHAT GOI DICH VU =====");

    const subscriptionId = prompt("Nhap ma thue bao can cap nhat:");

    if (subscriptionId === null || subscriptionId.trim() === "") {
        console.log("Ma thue bao khong duoc de trong.");
        return;
    }

    const index = findSubscriptionIndex(subscriptionId);

    if (index === -1) {
        console.log("Khong tim thay thue bao.");
        return;
    }

    const subscription = subscriptions[index];

    if (subscription.status !== "ACTIVE") {
        console.log("Chi co the cap nhat thue bao dang ACTIVE.");
        return;
    }

    console.log("Khach hang: " + subscription.customerName);
    console.log("Goi hien tai: " + subscription.planTier);

    const planInput = prompt(
        "Chon goi moi:\n1. PERSONAL\n2. FAMILY"
    );

    if (planInput === null) {
        console.log("Da huy thao tac.");
        return;
    }

    let newPlanTier;

    switch (planInput.trim()) {
        case "1":
            newPlanTier = "PERSONAL";
            break;

        case "2":
            newPlanTier = "FAMILY";
            break;

        default:
            console.log("Goi dich vu khong hop le.");
            return;
    }

    subscription.planTier = newPlanTier;
    subscription.deviceLimit = getDeviceLimit(newPlanTier);

    console.log("Cap nhat goi dich vu thanh cong!");
    console.log("Goi moi: " + subscription.planTier);
    console.log("Gioi han thiet bi: " + subscription.deviceLimit);
}

// Huy thue bao
function deleteSubscription() {
    console.log("\n===== HUY THUE BAO =====");

    const subscriptionId = prompt("Nhap ma thue bao can huy:");

    if (subscriptionId === null || subscriptionId.trim() === "") {
        console.log("Ma thue bao khong duoc de trong.");
        return;
    }

    const index = findSubscriptionIndex(subscriptionId);

    if (index === -1) {
        console.log("Khong tim thay thue bao.");
        return;
    }

    const subscription = subscriptions[index];

    const confirmed = confirm(
        "Ban co chac chan muon huy thue bao " +
        subscription.subscriptionId +
        " cua " + subscription.customerName + "?"
    );

    if (!confirmed) {
        console.log("Da huy thao tac xoa.");
        return;
    }

    subscriptions.splice(index, 1);

    console.log("Huy thue bao thanh cong: " + subscriptionId.trim().toUpperCase());
}

// Hien thi menu quan tri
function displayMenu() {
    console.log("\n======================================");
    console.log("   RIKKEISTREAM - QUAN LY THUE BAO");
    console.log("======================================");
    console.log("1. Them thue bao moi");
    console.log("2. Hien thi danh sach thue bao");
    console.log("3. Cap nhat goi dich vu");
    console.log("4. Huy thue bao");
    console.log("5. Thoat chuong trinh");
    console.log("======================================");
}

// Ham main dieu phoi chuong trinh
function main() {
    let menuChoice;

    do {
        displayMenu();

        const input = prompt("Nhap lua chon (1-5):");

        if (input === null) {
            menuChoice = "5";
        } else {
            menuChoice = input.trim();
        }

        switch (menuChoice) {
            case "1":
                addSubscription();
                break;

            case "2":
                listSubscriptions();
                break;

            case "3":
                updateSubscription();
                break;

            case "4":
                deleteSubscription();
                break;

            case "5":
                console.log("Da thoat chuong trinh RikkeiStream.");
                break;

            default:
                console.log("Lua chon khong hop le. Vui long nhap 1-5.");
        }
    } while (menuChoice !== "5");
}

// Khoi dong ung dung
main();
