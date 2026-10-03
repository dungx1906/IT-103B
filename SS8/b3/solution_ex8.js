const portIds = [
    "S01",
    "S02",
    "S03",
    "S04",
    "S05",
    "S06"
];

const portStatuses = [
    "AVAILABLE",
    "CHARGING",
    "ERROR",
    "AVAILABLE",
    "CHARGING",
    "AVAILABLE"
];

const portPowersKw = [
    250,
    150,
    60,
    250,
    60,
    150
];

// ==========================================
// 1. CẬP NHẬT TRẠNG THÁI S01
// ==========================================

const s01Index = portIds.indexOf("S01");

if (s01Index !== -1) {
    portStatuses[s01Index] = "CHARGING";
}

// ==========================================
// 2. CẬP NHẬT TRẠNG THÁI S03
// ==========================================

const s03Index = portIds.indexOf("S03");

if (s03Index !== -1) {
    portStatuses[s03Index] = "AVAILABLE";
}

// ==========================================
// 3. THỐNG KÊ TRỤ AVAILABLE
// ==========================================

let availableCount = 0;

let highestPower = 0;
let highestPowerPort = "";

for (let i = 0; i < portIds.length; i++) {

    if (portStatuses[i] === "AVAILABLE") {
        availableCount++;

        if (portPowersKw[i] > highestPower) {
            highestPower = portPowersKw[i];
            highestPowerPort = portIds[i];
        }
    }
}

// ==========================================
// 4. XUẤT BÁO CÁO
// ==========================================

console.log("==============================================");
console.log("       BÁO CÁO TRẠNG THÁI TRẠM SẠC");
console.log("==============================================");

for (let i = 0; i < portIds.length; i++) {
    console.log(
        `Trụ ${portIds[i]} | Trạng thái: ${portStatuses[i]} | Công suất: ${portPowersKw[i]} kW`
    );
}

console.log("----------------------------------------------");
console.log(`Tổng số trụ AVAILABLE: ${availableCount}`);
console.log(
    `Trụ AVAILABLE có công suất cao nhất: ${highestPowerPort} - ${highestPower} kW`
);
console.log("==============================================");

