
"use strict";

// Du lieu ve may bay ban dau
const tickets = [
    {
        pnr: "VN001",
        passengerName: "Nguyen Van An",
        flightCode: "VN210",
        destination: "Ha Noi",
        seat: "12A",
        ticketClass: "ECONOMY",
        baggageWeight: 25,
        status: "BOOKED",
        baggageFee: 0
    },
    {
        pnr: "VN002",
        passengerName: "Tran Thi Binh",
        flightCode: "VN315",
        destination: "Da Nang",
        seat: "03B",
        ticketClass: "BUSINESS",
        baggageWeight: 20,
        status: "BOOKED",
        baggageFee: 0
    },
    {
        pnr: "VN003",
        passengerName: "Le Minh Cuong",
        flightCode: "VN450",
        destination: "Ho Chi Minh",
        seat: "18C",
        ticketClass: "ECONOMY",
        baggageWeight: 15,
        status: "BOOKED",
        baggageFee: 0
    }
];

// Quy dinh hanh ly
const ECONOMY_LIMIT = 20;
const BUSINESS_LIMIT = 30;
const EXCESS_FEE_PER_KG = 50000;

// Tim ve theo ma PNR
function findTicketByPnr(pnr) {
    for (let i = 0; i < tickets.length; i++) {
        if (tickets[i].pnr === pnr.trim().toUpperCase()) {
            return tickets[i];
        }
    }

    return null;
}

// Tim ve theo ten hanh khach
function findTicketByName(name) {
    const searchName = name.trim().toLowerCase();

    for (let i = 0; i < tickets.length; i++) {
        if (tickets[i].passengerName.toLowerCase().includes(searchName)) {
            return tickets[i];
        }
    }

    return null;
}

// Xac dinh han muc hanh ly mien cuoc
function getBaggageLimit(ticketClass) {
    if (ticketClass === "ECONOMY") {
        return ECONOMY_LIMIT;
    }

    if (ticketClass === "BUSINESS") {
        return BUSINESS_LIMIT;
    }

    return -1;
}

// Tinh phi hanh ly qua can
function calculateExcessBaggageFee(weight, ticketClass) {
    const baggageLimit = getBaggageLimit(ticketClass);

    if (weight < 0 || baggageLimit === -1) {
        return -1;
    }

    if (weight <= baggageLimit) {
        return 0;
    }

    return (weight - baggageLimit) * EXCESS_FEE_PER_KG;
}

// Hien thi danh sach ve
function listTickets() {
    console.log("\n========== DANH SACH VE MAY BAY ==========");

    if (tickets.length === 0) {
        console.log("Khong co ve may bay nao.");
        return;
    }

    console.table(
        tickets.map(function(ticket) {
            return {
                PNR: ticket.pnr,
                "Hanh khach": ticket.passengerName,
                "Chuyen bay": ticket.flightCode,
                "Diem den": ticket.destination,
                "Ghe": ticket.seat,
                "Hang ve": ticket.ticketClass,
                "Hanh ly (kg)": ticket.baggageWeight,
                "Phi hanh ly": ticket.baggageFee.toLocaleString("vi-VN") + " VND",
                "Trang thai": ticket.status
            };
        })
    );
}

// In the len may bay
function displayBoardingPass(ticket) {
    console.log("\n========================================");
    console.log("             BOARDING PASS");
    console.log("========================================");
    console.log("Ma dat cho (PNR): " + ticket.pnr);
    console.log("Hanh khach      : " + ticket.passengerName);
    console.log("Chuyen bay      : " + ticket.flightCode);
    console.log("Diem den        : " + ticket.destination);
    console.log("So ghe          : " + ticket.seat);
    console.log("Hang ve         : " + ticket.ticketClass);
    console.log("Hanh ly         : " + ticket.baggageWeight + " kg");
    console.log("Phi qua can     : " +
        ticket.baggageFee.toLocaleString("vi-VN") + " VND");
    console.log("Trang thai      : " + ticket.status);
    console.log("========================================");
}

// Tiep nhan check-in
function checkIn(pnr) {
    const ticket = findTicketByPnr(pnr);

    if (ticket === null) {
        console.log("Khong tim thay ve voi ma PNR nay.");
        return;
    }

    if (ticket.status !== "BOOKED") {
        console.log("Ve khong the check-in. Trang thai: " + ticket.status);
        return;
    }

    const baggageInput = prompt(
        "Nhap khoi luong hanh ly ky gui (kg):"
    );

    if (baggageInput === null || baggageInput.trim() === "") {
        console.log("Da huy thao tac check-in.");
        return;
    }

    const baggageWeight = Number(baggageInput);

    if (!Number.isFinite(baggageWeight) || baggageWeight < 0) {
        console.log("Can nang khong hop le. Vui long nhap so kg khong am.");
        return;
    }

    const baggageFee = calculateExcessBaggageFee(
        baggageWeight,
        ticket.ticketClass
    );

    if (baggageFee < 0) {
        console.log("Hang ve khong hop le.");
        return;
    }

    ticket.baggageWeight = baggageWeight;
    ticket.baggageFee = baggageFee;
    ticket.status = "CHECKED_IN";

    console.log("\nCheck-in thanh cong!");
    console.log("Han muc mien cuoc: " +
        getBaggageLimit(ticket.ticketClass) + " kg");
    console.log("Khoi luong hanh ly: " + baggageWeight + " kg");
    console.log("Phi hanh ly: " +
        baggageFee.toLocaleString("vi-VN") + " VND");

    displayBoardingPass(ticket);
}

// Tra cuu ve
function searchTicket() {
    const searchType = prompt(
        "Tra cuu theo:\n1. Ma PNR\n2. Ten hanh khach\nNhap lua chon:"
    );

    if (searchType === null) {
        return;
    }

    let ticket = null;

    switch (searchType.trim()) {
        case "1": {
            const pnr = prompt("Nhap ma PNR:");

            if (pnr !== null && pnr.trim() !== "") {
                ticket = findTicketByPnr(pnr);
            }

            break;
        }

        case "2": {
            const name = prompt("Nhap ten hanh khach:");

            if (name !== null && name.trim() !== "") {
                ticket = findTicketByName(name);
            }

            break;
        }

        default:
            console.log("Lua chon tra cuu khong hop le.");
            return;
    }

    if (ticket === null) {
        console.log("Khong tim thay ve phu hop.");
    } else {
        console.log("Thong tin ve:");
        console.table(ticket);
    }
}

// Huy ve
function cancelTicket(pnr) {
    const ticket = findTicketByPnr(pnr);

    if (ticket === null) {
        console.log("Khong tim thay ve voi ma PNR nay.");
        return;
    }

    if (ticket.status === "CANCELLED") {
        console.log("Ve nay da duoc huy truoc do.");
        return;
    }

    const confirmCancel = confirm(
        "Ban co chac chan muon huy ve " + ticket.pnr +
        " cua hanh khach " + ticket.passengerName + "?"
    );

    if (!confirmCancel) {
        console.log("Da huy thao tac huy ve.");
        return;
    }

    ticket.status = "CANCELLED";

    console.log("Huy ve thanh cong: " + ticket.pnr);
}

// Hien thi menu chinh
function displayMenu() {
    console.log("\n========== QUAN LY VE MAY BAY ==========");
    console.log("1. Hien thi danh sach ve");
    console.log("2. Check-in va tinh phi hanh ly");
    console.log("3. Tra cuu ve");
    console.log("4. Huy ve");
    console.log("5. Thoat chuong trinh");
    console.log("========================================");
}

// Ham main dieu phoi chuong trinh
function main() {
    let menuChoice;

    do {
        displayMenu();

        const input = prompt(
            "Nhap lua chon cua ban (1-5):"
        );

        if (input === null) {
            menuChoice = "5";
        } else {
            menuChoice = input.trim();
        }

        switch (menuChoice) {
            case "1":
                listTickets();
                break;

            case "2": {
                const pnr = prompt("Nhap ma PNR can check-in:");

                if (pnr !== null && pnr.trim() !== "") {
                    checkIn(pnr);
                } else {
                    console.log("Ma PNR khong duoc de trong.");
                }

                break;
            }

            case "3":
                searchTicket();
                break;

            case "4": {
                const pnr = prompt("Nhap ma PNR can huy:");

                if (pnr !== null && pnr.trim() !== "") {
                    cancelTicket(pnr);
                } else {
                    console.log("Ma PNR khong duoc de trong.");
                }

                break;
            }

            case "5":
                console.log("Da thoat chuong trinh. Ket thuc ca lam viec!");
                break;

            default:
                console.log("Lua chon khong hop le. Vui long nhap tu 1 den 5.");
        }
    } while (menuChoice !== "5");
}

// Khoi chay ung dung
main();
