
"use strict";

// Bang quy dinh han muc hanh ly theo hang ve
const baggageLimits = {
    ECONOMY: 20,
    BUSINESS: 30,
    FIRST: 40
};

// Bang quy dinh phi hanh ly
const EXCESS_FEE_FIRST_5_KG = 60000;
const EXCESS_FEE_AFTER_5_KG = 80000;
const BULKY_BAGGAGE_FEE = 200000;
const PET_TRANSPORT_FEE = 500000;

// Du lieu ve va hanh ly mau
const tickets = [
    {
        pnr: "VN001",
        passengerName: "Nguyen Van An",
        flightNumber: "VN210",
        ticketClass: "ECONOMY",
        lotusMemberLevel: "TITAN",
        baggageList: [
            {
                baggageCode: "BG001",
                baggageName: "Vali",
                weight: 18,
                serviceType: "NORMAL"
            },
            {
                baggageCode: "BG002",
                baggageName: "Gay golf",
                weight: 8,
                serviceType: "BULKY"
            },
            {
                baggageCode: "BG003",
                baggageName: "Long thu cung",
                weight: 3,
                serviceType: "PET"
            }
        ]
    },
    {
        pnr: "VN002",
        passengerName: "Tran Thi Binh",
        flightNumber: "VN315",
        ticketClass: "BUSINESS",
        lotusMemberLevel: "NONE",
        baggageList: [
            {
                baggageCode: "BG004",
                baggageName: "Vali lon",
                weight: 28,
                serviceType: "NORMAL"
            }
        ]
    }
];

// Tim ve theo ma PNR
function findTicketByPnr(pnr) {
    const normalizedPnr = pnr.trim().toUpperCase();

    for (let i = 0; i < tickets.length; i++) {
        if (tickets[i].pnr === normalizedPnr) {
            return tickets[i];
        }
    }

    return null;
}

// Lay han muc hanh ly theo hang ve va hoi vien
function getFreeBaggageAllowance(ticket) {
    if (!Object.hasOwn(baggageLimits, ticket.ticketClass)) {
        return -1;
    }

    let allowance = baggageLimits[ticket.ticketClass];

    if (
        ticket.lotusMemberLevel === "TITAN" ||
        ticket.lotusMemberLevel === "GOLD" ||
        ticket.lotusMemberLevel === "PLATINUM"
    ) {
        allowance += 10;
    }

    return allowance;
}

// Tinh phi qua can theo quy tac luy tien
function calculateExcessWeightFee(excessWeight) {
    if (!Number.isFinite(excessWeight) || excessWeight < 0) {
        return -1;
    }

    if (excessWeight <= 0) {
        return 0;
    }

    if (excessWeight <= 5) {
        return excessWeight * EXCESS_FEE_FIRST_5_KG;
    }

    return (5 * EXCESS_FEE_FIRST_5_KG) +
        ((excessWeight - 5) * EXCESS_FEE_AFTER_5_KG);
}

// Tinh tong phi hanh ly va dich vu dac biet
function calculateBaggageSurcharge(ticket, baggageList) {
    if (
        ticket === null ||
        !Array.isArray(baggageList) ||
        baggageList.length === 0
    ) {
        return null;
    }

    const freeAllowance = getFreeBaggageAllowance(ticket);

    if (freeAllowance < 0) {
        return null;
    }

    let totalWeight = 0;
    let bulkyCount = 0;
    let petCount = 0;

    for (let i = 0; i < baggageList.length; i++) {
        const baggage = baggageList[i];

        if (
            baggage === null ||
            !Number.isFinite(baggage.weight) ||
            baggage.weight < 0 ||
            !["NORMAL", "BULKY", "PET"].includes(baggage.serviceType)
        ) {
            return null;
        }

        totalWeight += baggage.weight;

        if (baggage.serviceType === "BULKY") {
            bulkyCount++;
        }

        if (baggage.serviceType === "PET") {
            petCount++;
        }
    }

    const excessWeight = Math.max(0, totalWeight - freeAllowance);
    const excessWeightFee = calculateExcessWeightFee(excessWeight);
    const bulkyFee = bulkyCount * BULKY_BAGGAGE_FEE;
    const petFee = petCount * PET_TRANSPORT_FEE;

    return {
        totalWeight: totalWeight,
        freeAllowance: freeAllowance,
        excessWeight: excessWeight,
        excessWeightFee: excessWeightFee,
        bulkyCount: bulkyCount,
        bulkyFee: bulkyFee,
        petCount: petCount,
        petFee: petFee,
        totalSurcharge: excessWeightFee + bulkyFee + petFee
    };
}

// Dinh dang tien Viet Nam
function formatCurrency(amount) {
    return amount.toLocaleString("vi-VN") + " VND";
}

// Tao mot dong tren bien lai
function createReceiptLine(label, value) {
    const receiptWidth = 52;
    const valueText = String(value);
    const labelWidth = receiptWidth - valueText.length;

    return label.padEnd(labelWidth, " ") + valueText;
}

// In bien lai thanh toan
function printBaggageReceipt(ticket, result) {
    const border = "=".repeat(52);

    console.log("\n" + border);
    console.log("             AIRPORT BAGGAGE RECEIPT");
    console.log(border);
    console.log(`PNR             : ${ticket.pnr}`);
    console.log(`Passenger       : ${ticket.passengerName}`);
    console.log(`Flight          : ${ticket.flightNumber}`);
    console.log(`Ticket class    : ${ticket.ticketClass}`);
    console.log(`Loyalty level   : ${ticket.lotusMemberLevel}`);
    console.log(border);

    console.log(createReceiptLine(
        "Total baggage weight:",
        result.totalWeight + " kg"
    ));

    console.log(createReceiptLine(
        "Free baggage allowance:",
        result.freeAllowance + " kg"
    ));

    console.log(createReceiptLine(
        "Excess baggage weight:",
        result.excessWeight + " kg"
    ));

    console.log(createReceiptLine(
        "Excess baggage fee:",
        formatCurrency(result.excessWeightFee)
    ));

    console.log(createReceiptLine(
        "Bulky baggage (" + result.bulkyCount + "):",
        formatCurrency(result.bulkyFee)
    ));

    console.log(createReceiptLine(
        "Pet transport (" + result.petCount + "):",
        formatCurrency(result.petFee)
    ));

    console.log(border);

    console.log(createReceiptLine(
        "TOTAL SURCHARGE:",
        formatCurrency(result.totalSurcharge)
    ));

    console.log(border);
    console.log("Thank you. Please keep this receipt.");
    console.log(border);
}

// Hien thi danh sach ve
function displayTickets() {
    console.log("\n===== DANH SACH VE VA HANH LY =====");

    console.table(
        tickets.map(function(ticket) {
            let totalWeight = 0;

            for (let i = 0; i < ticket.baggageList.length; i++) {
                totalWeight += ticket.baggageList[i].weight;
            }

            return {
                PNR: ticket.pnr,
                "Hanh khach": ticket.passengerName,
                "Chuyen bay": ticket.flightNumber,
                "Hang ve": ticket.ticketClass,
                "Hoi vien": ticket.lotusMemberLevel,
                "So kien": ticket.baggageList.length,
                "Tong kg": totalWeight
            };
        })
    );
}

// Them kien hanh ly vao ho so
function addBaggage() {
    const pnr = prompt("Nhap ma PNR:");
    
    if (pnr === null || pnr.trim() === "") {
        console.log("Ma PNR khong duoc de trong.");
        return;
    }

    const ticket = findTicketByPnr(pnr);

    if (ticket === null) {
        console.log("Khong tim thay ve.");
        return;
    }

    const baggageCode = prompt("Nhap ma kien hanh ly:");

    if (baggageCode === null || baggageCode.trim() === "") {
        console.log("Ma kien hanh ly khong hop le.");
        return;
    }

    const code = baggageCode.trim().toUpperCase();

    for (let i = 0; i < ticket.baggageList.length; i++) {
        if (ticket.baggageList[i].baggageCode === code) {
            console.log("Ma kien hanh ly da ton tai trong ve nay.");
            return;
        }
    }

    const baggageName = prompt("Nhap ten hanh ly:");

    if (baggageName === null || baggageName.trim() === "") {
        console.log("Ten hanh ly khong duoc de trong.");
        return;
    }

    const weightInput = prompt("Nhap khoi luong (kg):");

    if (weightInput === null || weightInput.trim() === "") {
        console.log("Khoi luong khong hop le.");
        return;
    }

    const weight = Number(weightInput);

    if (!Number.isFinite(weight) || weight <= 0) {
        console.log("Khoi luong phai la so lon hon 0.");
        return;
    }

    const serviceType = prompt(
        "Chon loai hanh ly:\n" +
        "1. NORMAL - Thong thuong\n" +
        "2. BULKY - Cong kenh\n" +
        "3. PET - Thu cung"
    );

    if (serviceType === null) {
        return;
    }

    let selectedType;

    switch (serviceType.trim()) {
        case "1":
            selectedType = "NORMAL";
            break;
        case "2":
            selectedType = "BULKY";
            break;
        case "3":
            selectedType = "PET";
            break;
        default:
            console.log("Loai hanh ly khong hop le.");
            return;
    }

    ticket.baggageList.push({
        baggageCode: code,
        baggageName: baggageName.trim(),
        weight: weight,
        serviceType: selectedType
    });

    console.log("Da them kien hanh ly thanh cong.");
}

// Tinh phi va in bien lai
function processBaggageBilling() {
    const pnr = prompt("Nhap ma PNR can tinh phi:");

    if (pnr === null || pnr.trim() === "") {
        console.log("Ma PNR khong duoc de trong.");
        return;
    }

    const ticket = findTicketByPnr(pnr);

    if (ticket === null) {
        console.log("Khong tim thay ve.");
        return;
    }

    const result = calculateBaggageSurcharge(
        ticket,
        ticket.baggageList
    );

    if (result === null) {
        console.log("Du lieu hanh ly khong hop le.");
        return;
    }

    printBaggageReceipt(ticket, result);
}

// Menu chinh
function main() {
    let choice;

    do {
        console.log("\n===== BAGGAGE BILLING SYSTEM =====");
        console.log("1. Xem danh sach ve va hanh ly");
        console.log("2. Them kien hanh ly");
        console.log("3. Tinh phi va in bien lai");
        console.log("4. Thoat");

        const input = prompt("Nhap lua chon (1-4):");

        if (input === null) {
            choice = "4";
        } else {
            choice = input.trim();
        }

        switch (choice) {
            case "1":
                displayTickets();
                break;

            case "2":
                addBaggage();
                break;

            case "3":
                processBaggageBilling();
                break;

            case "4":
                console.log("Da thoat chuong trinh.");
                break;

            default:
                console.log("Lua chon khong hop le.");
        }
    } while (choice !== "4");
}

// Khoi dong chuong trinh
main();
