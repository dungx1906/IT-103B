
"use strict";

// Danh sach ho so hanh khach
const passengers = [
    {
        pnrCode: "VN001",
        passengerName: "Nguyen Van An",
        idNumber: "079123456789",
        flightNumber: "VN210",
        seatNumber: "",
        isCheckedIn: false
    },
    {
        pnrCode: "VN002",
        passengerName: "Tran Thi Binh",
        idNumber: "B12345678",
        flightNumber: "VN210",
        seatNumber: "",
        isCheckedIn: false
    }
];

// Danh sach ghe ngoi
const availableSeats = [
    "12A", "12B", "12C",
    "13A", "13B", "13C",
    "14A", "14B", "14C"
];

// Kiem tra CCCD hoac ho chieu
function validateIdNumber(idNumber) {
    const cccdPattern = /^[0-9]{12}$/;
    const passportPattern = /^[A-Za-z][0-9]{7,8}$/;

    return cccdPattern.test(idNumber) ||
        passportPattern.test(idNumber);
}

// Tim hanh khach theo ma PNR
function findPassengerByPnr(pnrCode) {
    for (let i = 0; i < passengers.length; i++) {
        if (
            passengers[i].pnrCode ===
            pnrCode.trim().toUpperCase()
        ) {
            return passengers[i];
        }
    }

    return null;
}

// Kiem tra ma PNR da ton tai hay chua
function isPnrExists(pnrCode) {
    return findPassengerByPnr(pnrCode) !== null;
}

// Kiem tra trung so ghe tren cung chuyen bay
function isSeatOccupied(flightNumber, seatNumber) {
    for (let i = 0; i < passengers.length; i++) {
        if (
            passengers[i].flightNumber === flightNumber &&
            passengers[i].seatNumber === seatNumber &&
            passengers[i].isCheckedIn
        ) {
            return true;
        }
    }

    return false;
}

// Cap ghe con trong cho hanh khach
function assignSeat(passenger) {
    for (let i = 0; i < availableSeats.length; i++) {
        const seat = availableSeats[i];

        if (!isSeatOccupied(passenger.flightNumber, seat)) {
            passenger.seatNumber = seat;
            return seat;
        }
    }

    return null;
}

// Tiep nhan ho so hanh khach moi
function addPassenger() {
    console.log("\n===== TIEP NHAN HO SO MOI =====");

    const pnrCode = prompt("Nhap ma PNR:");
    if (pnrCode === null || pnrCode.trim() === "") {
        console.log("Ma PNR khong duoc de trong.");
        return;
    }

    const normalizedPnr = pnrCode.trim().toUpperCase();

    if (!/^[A-Z0-9]{3,10}$/.test(normalizedPnr)) {
        console.log("Ma PNR phai gom 3-10 ky tu chu hoac so.");
        return;
    }

    if (isPnrExists(normalizedPnr)) {
        console.log("Ma PNR da ton tai.");
        return;
    }

    const passengerName = prompt("Nhap ho va ten hanh khach:");
    if (passengerName === null || passengerName.trim() === "") {
        console.log("Ho ten khong duoc de trong.");
        return;
    }

    const idNumber = prompt("Nhap CCCD hoac so ho chieu:");
    if (idNumber === null || !validateIdNumber(idNumber.trim())) {
        console.log("Giay to khong hop le.");
        console.log("CCCD: 12 chu so.");
        console.log("Ho chieu: 1 chu cai va 7-8 chu so.");
        return;
    }

    const flightNumber = prompt("Nhap so hieu chuyen bay:");
    if (
        flightNumber === null ||
        !/^[A-Za-z0-9]{2,10}$/.test(flightNumber.trim())
    ) {
        console.log("So hieu chuyen bay khong hop le.");
        return;
    }

    passengers.push({
        pnrCode: normalizedPnr,
        passengerName: passengerName.trim(),
        idNumber: idNumber.trim().toUpperCase(),
        flightNumber: flightNumber.trim().toUpperCase(),
        seatNumber: "",
        isCheckedIn: false
    });

    console.log("Da tiep nhan ho so hanh khach thanh cong.");
}

// Hien thi danh sach hanh khach
function displayPassengers() {
    console.log("\n===== DANH SACH HANH KHACH =====");

    if (passengers.length === 0) {
        console.log("Danh sach hanh khach dang trong.");
        return;
    }

    console.table(
        passengers.map(function(passenger) {
            return {
                PNR: passenger.pnrCode,
                "Ho va ten": passenger.passengerName,
                "Giay to": passenger.idNumber,
                "Chuyen bay": passenger.flightNumber,
                "So ghe": passenger.seatNumber || "Chua cap",
                "Check-in": passenger.isCheckedIn
                    ? "DA CHECK-IN"
                    : "CHUA CHECK-IN"
            };
        })
    );
}

// Xac thuc ho so hanh khach
function verifyPassenger(passenger) {
    console.log("\n===== XAC THUC HO SO =====");

    if (passenger === null) {
        console.log("Khong tim thay ho so hanh khach.");
        return false;
    }

    console.log("Ma PNR: " + passenger.pnrCode);
    console.log("Ho ten: " + passenger.passengerName);
    console.log("So giay to: " + passenger.idNumber);
    console.log("Chuyen bay: " + passenger.flightNumber);

    if (!validateIdNumber(passenger.idNumber)) {
        console.log("Tu choi: Giay to tuy than khong hop le.");
        return false;
    }

    if (
        passenger.pnrCode.trim() === "" ||
        passenger.passengerName.trim() === "" ||
        passenger.flightNumber.trim() === ""
    ) {
        console.log("Tu choi: Ho so thieu thong tin.");
        return false;
    }

    console.log("Ket qua: Giay to va thong tin ho so hop le.");
    return true;
}

// In the len may bay
function displayBoardingPass(passenger) {
    const border = "=".repeat(42);

    console.log("\n" + border);
    console.log("             BOARDING PASS");
    console.log(border);
    console.log("PASSENGER : " + passenger.passengerName);
    console.log("PNR CODE  : " + passenger.pnrCode);
    console.log("FLIGHT    : " + passenger.flightNumber);
    console.log("SEAT      : " + passenger.seatNumber);
    console.log("STATUS    : CHECKED IN");
    console.log(border);
    console.log("BARCODE   : *" + passenger.pnrCode + "*");
    console.log("           || ||| | || ||| | ||");
    console.log(border);
    console.log("Please proceed to the boarding gate.");
    console.log(border);
}

// Thuc hien check-in
function checkInPassenger() {
    console.log("\n===== CHECK-IN HANH KHACH =====");

    const pnrCode = prompt("Nhap ma PNR can check-in:");

    if (pnrCode === null || pnrCode.trim() === "") {
        console.log("Ma PNR khong duoc de trong.");
        return;
    }

    const passenger = findPassengerByPnr(pnrCode);

    if (!verifyPassenger(passenger)) {
        return;
    }

    if (passenger.isCheckedIn) {
        console.log("Hanh khach da check-in truoc do.");
        return;
    }

    const seat = assignSeat(passenger);

    if (seat === null) {
        console.log("Khong con ghe trong tren chuyen bay nay.");
        return;
    }

    passenger.isCheckedIn = true;

    console.log("Check-in thanh cong.");
    console.log("Da cap ghe: " + seat);

    displayBoardingPass(passenger);
}

// Tra cuu hanh khach
function searchPassenger() {
    const pnrCode = prompt("Nhap ma PNR can tra cuu:");

    if (pnrCode === null || pnrCode.trim() === "") {
        console.log("Ma PNR khong duoc de trong.");
        return;
    }

    const passenger = findPassengerByPnr(pnrCode);

    if (passenger === null) {
        console.log("Khong tim thay hanh khach.");
        return;
    }

    verifyPassenger(passenger);

    console.table({
        PNR: passenger.pnrCode,
        "Ho va ten": passenger.passengerName,
        "Giay to": passenger.idNumber,
        "Chuyen bay": passenger.flightNumber,
        "So ghe": passenger.seatNumber || "Chua cap",
        "Trang thai": passenger.isCheckedIn
            ? "DA CHECK-IN"
            : "CHUA CHECK-IN"
    });
}

// Hien thi menu chinh
function displayMenu() {
    console.log("\n======================================");
    console.log(" QUAN LY HO SO HANH KHACH SAN BAY");
    console.log("======================================");
    console.log("1. Hien thi danh sach hanh khach");
    console.log("2. Tiep nhan ho so moi");
    console.log("3. Xac thuc ho so theo PNR");
    console.log("4. Check-in va in Boarding Pass");
    console.log("5. Tra cuu hanh khach");
    console.log("6. Thoat chuong trinh");
    console.log("======================================");
}

// Ham main dieu khien chuong trinh
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
                displayPassengers();
                break;

            case "2":
                addPassenger();
                break;

            case "3": {
                const pnrCode = prompt("Nhap ma PNR can xac thuc:");

                if (pnrCode === null || pnrCode.trim() === "") {
                    console.log("Ma PNR khong duoc de trong.");
                    break;
                }

                verifyPassenger(findPassengerByPnr(pnrCode));
                break;
            }

            case "4":
                checkInPassenger();
                break;

            case "5":
                searchPassenger();
                break;

            case "6":
                console.log("Da thoat chuong trinh.");
                break;

            default:
                console.log("Lua chon khong hop le. Vui long nhap 1-6.");
        }
    } while (menuChoice !== "6");
}

// Khoi dong ung dung
main();
