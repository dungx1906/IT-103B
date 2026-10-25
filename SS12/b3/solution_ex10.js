
"use strict";

// =====================================
// 1. DU LIEU BAN DAU
// =====================================

const subscriptions = [
    {
        subscriptionId: "SUB_001",
        customerName: "Nguyen Van An",
        planTier: "PERSONAL",
        deviceLimit: 1
    },
    {
        subscriptionId: "SUB_002",
        customerName: "Tran Thi Mai",
        planTier: "FAMILY",
        deviceLimit: 5
    }
];

// =====================================
// 2. CAC HAM CHUC NANG DOC LAP
// =====================================

// Chuc nang 1: Hien thi danh sach thue bao
function listSubscriptions() {
    console.log("\n===== DANH SACH THUE BAO =====");

    if (subscriptions.length === 0) {
        console.log("Danh sach dang trong.");
        return;
    }

    console.table(subscriptions);
}

// Chuc nang 2: Them thue bao
function addSubscription() {
    console.log("\n===== THEM THUE BAO =====");

    const customerName = prompt("Nhap ten khach hang:");

    if (customerName === null || customerName.trim() === "") {
        console.log("Ten khach hang khong hop le.");
        return;
    }

    const planChoice = prompt(
        "Chon goi dich vu:\n1. PERSONAL\n2. FAMILY"
    );

    if (planChoice === null) {
        console.log("Da huy thao tac.");
        return;
    }

    let planTier;
    let deviceLimit;

    switch (planChoice.trim()) {
        case "1":
            planTier = "PERSONAL";
            deviceLimit = 1;
            break;

        case "2":
            planTier = "FAMILY";
            deviceLimit = 5;
            break;

        default:
            console.log("Goi dich vu khong hop le.");
            return;
    }

    const subscriptionId = "SUB_" +
        String(subscriptions.length + 1).padStart(3, "0");

    subscriptions.push({
        subscriptionId: subscriptionId,
        customerName: customerName.trim(),
        planTier: planTier,
        deviceLimit: deviceLimit
    });

    console.log("Them thue bao thanh cong!");
}

// Chuc nang 3: Cap nhat goi dich vu
function updateSubscription() {
    console.log("\n===== CAP NHAT THUE BAO =====");

    const subscriptionId = prompt("Nhap ma thue bao:");

    if (subscriptionId === null || subscriptionId.trim() === "") {
        console.log("Ma thue bao khong hop le.");
        return;
    }

    let foundSubscription = null;

    for (let i = 0; i < subscriptions.length; i++) {
        if (
            subscriptions[i].subscriptionId ===
            subscriptionId.trim().toUpperCase()
        ) {
            foundSubscription = subscriptions[i];
            break;
        }
    }

    if (foundSubscription === null) {
        console.log("Khong tim thay thue bao.");
        return;
    }

    const planChoice = prompt(
        "Chon goi moi:\n1. PERSONAL\n2. FAMILY"
    );

    if (planChoice === null) {
        console.log("Da huy thao tac.");
        return;
    }

    switch (planChoice.trim()) {
        case "1":
            foundSubscription.planTier = "PERSONAL";
            foundSubscription.deviceLimit = 1;
            break;

        case "2":
            foundSubscription.planTier = "FAMILY";
            foundSubscription.deviceLimit = 5;
            break;

        default:
            console.log("Goi dich vu khong hop le.");
            return;
    }

    console.log("Cap nhat thue bao thanh cong!");
}

// Chuc nang 4: Xoa thue bao
function deleteSubscription() {
    console.log("\n===== XOA THUE BAO =====");

    const subscriptionId = prompt("Nhap ma thue bao can xoa:");

    if (subscriptionId === null || subscriptionId.trim() === "") {
        console.log("Ma thue bao khong hop le.");
        return;
    }

    let foundIndex = -1;

    for (let i = 0; i < subscriptions.length; i++) {
        if (
            subscriptions[i].subscriptionId ===
            subscriptionId.trim().toUpperCase()
        ) {
            foundIndex = i;
            break;
        }
    }

    if (foundIndex === -1) {
        console.log("Khong tim thay thue bao.");
        return;
    }

    subscriptions.splice(foundIndex, 1);

    console.log("Xoa thue bao thanh cong!");
}

// Chuc nang 5: Thong ke so luong thue bao
function countSubscriptions() {
    console.log("\n===== THONG KE =====");
    console.log("Tong so thue bao: " + subscriptions.length);

    let personalCount = 0;
    let familyCount = 0;

    for (let i = 0; i < subscriptions.length; i++) {
        if (subscriptions[i].planTier === "PERSONAL") {
            personalCount++;
        } else if (subscriptions[i].planTier === "FAMILY") {
            familyCount++;
        }
    }

    console.log("Goi PERSONAL: " + personalCount);
    console.log("Goi FAMILY: " + familyCount);
}

// =====================================
// 3. MENU NGAN GON - MODULAR ARCHITECTURE
// =====================================

function displayMenu() {
    console.log("\n================================");
    console.log("   QUAN LY THUE BAO CLOUD");
    console.log("================================");
    console.log("1. Hien thi danh sach");
    console.log("2. Them thue bao");
    console.log("3. Cap nhat thue bao");
    console.log("4. Xoa thue bao");
    console.log("5. Thong ke");
    console.log("6. Thoat");
    console.log("================================");
}

// Ham main chi dieu phoi luong chuong trinh
function main() {
    let menuChoice;

    do {
        displayMenu();

        const input = prompt("Nhap lua chon (1-6):");

        if (input === null) {
            menuChoice = "6";
        } else {
            menuChoice = input.trim();
        }

        switch (menuChoice) {
            case "1":
                listSubscriptions();
                break;

            case "2":
                addSubscription();
                break;

            case "3":
                updateSubscription();
                break;

            case "4":
                deleteSubscription();
                break;

            case "5":
                countSubscriptions();
                break;

            case "6":
                console.log("Da thoat chuong trinh.");
                break;

            default:
                console.log("Lua chon khong hop le.");
        }
    } while (menuChoice !== "6");
}

// =====================================
// 4. KHOI CHAY CHUONG TRINH
// =====================================

main();
