// ==========================================
// 1. FUNCTION DECLARATION
// ==========================================

// Function Declaration được hoisting.
// Có thể gọi hàm trước khi khai báo.

console.log(addNumbers(10, 20));

function addNumbers(a, b) {
    return a + b;
}


// ==========================================
// 2. FUNCTION EXPRESSION
// ==========================================

// Function Expression không được hoisting.
// Phải khai báo hàm trước khi gọi.

const multiplyNumbers = function (a, b) {
    return a * b;
};

console.log(multiplyNumbers(10, 20));


// ==========================================
// 3. ARROW FUNCTION
// ==========================================

// Arrow Function cũng phải được khai báo trước khi gọi.

const subtractNumbers = (a, b) => {
    return a - b;
};

console.log(subtractNumbers(30, 10));


// ==========================================
// 4. ARROW FUNCTION - IMPLICIT RETURN
// ==========================================

const divideNumbers = (a, b) => a / b;

console.log(divideNumbers(20, 5));


// ==========================================
// 5. SO SÁNH THIS
// ==========================================

const smartHome = {
    name: "Smart Home",

    normalFunction: function () {
        console.log("Function Expression this:", this.name);
    },

    arrowFunction: () => {
        console.log("Arrow Function this:", this.name);
    }
};

smartHome.normalFunction();
smartHome.arrowFunction();


// ==========================================
// 6. SO SÁNH ARGUMENTS
// ==========================================

function declarationArguments() {
    console.log("Function Declaration arguments:", arguments);
}

const expressionArguments = function () {
    console.log("Function Expression arguments:", arguments);
};

const arrowArguments = (...values) => {
    console.log("Arrow Function arguments thay bằng rest:", values);
};

declarationArguments(10, 20, 30);
expressionArguments(40, 50, 60);
arrowArguments(70, 80, 90);


// ==========================================
// 7. CRUD SMART HOME - DÙNG ARROW FUNCTION
// ==========================================

const devices = [
    {
        id: "DEV_001",
        name: "Smart TV",
        room: "Phong khach",
        powerWatts: 120
    },
    {
        id: "DEV_002",
        name: "Dieu hoa",
        room: "Phong ngu",
        powerWatts: 1000
    }
];

// CREATE
const createDevice = (list, newDevice) => {
    list.push(newDevice);
    return true;
};

// READ
const readDevicesByRoom = (list, roomName) => {
    return list.filter((device) => {
        return device.room === roomName;
    });
};

// UPDATE
const updateDevice = (list, id, updateData) => {
    const targetDevice = list.find((device) => {
        return device.id === id;
    });

    if (targetDevice === undefined) {
        return false;
    }

    if (updateData.name !== undefined) {
        targetDevice.name = updateData.name;
    }

    if (updateData.powerWatts !== undefined) {
        targetDevice.powerWatts = updateData.powerWatts;
    }

    return true;
};

// DELETE
const deleteDevice = (list, id) => {
    const deviceIndex = list.findIndex((device) => {
        return device.id === id;
    });

    if (deviceIndex === -1) {
        return false;
    }

    list.splice(deviceIndex, 1);

    return true;
};


// ==========================================
// 8. KIỂM THỬ
// ==========================================

console.log("===== CRUD SMART HOME =====");

createDevice(devices, {
    id: "DEV_003",
    name: "Smart Light",
    room: "Phong khach",
    powerWatts: 20
});

console.log("Sau CREATE:");
console.log(devices);

console.log("READ Phong khach:");
console.log(readDevicesByRoom(devices, "Phong khach"));

console.log(
    "UPDATE DEV_001:",
    updateDevice(devices, "DEV_001", {
        powerWatts: 150
    })
);

console.log("Sau UPDATE:");
console.log(devices);

console.log(
    "DELETE DEV_002:",
    deleteDevice(devices, "DEV_002")
);

console.log("Sau DELETE:");
console.log(devices);

console.log(
    "DELETE DEV_999:",
    deleteDevice(devices, "DEV_999")
);