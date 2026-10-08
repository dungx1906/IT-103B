// Danh sách thiết bị Smart Home
const devices = [
    {
        id: "DEV_001",
        name: "Smart TV",
        room: "Phong khach",
        isActive: true,
        powerWatts: 120
    },
    {
        id: "DEV_002",
        name: "Den ngu",
        room: "Phong ngu",
        isActive: false,
        powerWatts: 20
    },
    {
        id: "DEV_003",
        name: "Dieu hoa",
        room: "Phong ngu",
        isActive: true,
        powerWatts: 1000
    }
];

// Validator: kiểm tra dữ liệu thiết bị
const validateDevice = (device) => {
    if (!device.name || device.name.trim() === "") {
        return false;
    }

    if (!device.room || device.room.trim() === "") {
        return false;
    }

    if (typeof device.powerWatts !== "number" || device.powerWatts <= 0) {
        return false;
    }

    return true;
};

// Tự sinh mã DEV_xxx
const generateDeviceId = (list) => {
    const nextNumber = list.length + 1;
    return "DEV_" + String(nextNumber).padStart(3, "0");
};

// CREATE: thêm thiết bị mới
const createDevice = (list, newDev) => {
    if (!validateDevice(newDev)) {
        return false;
    }

    const device = {
        id: generateDeviceId(list),
        name: newDev.name,
        room: newDev.room,
        isActive: newDev.isActive ?? false,
        powerWatts: newDev.powerWatts
    };

    list.push(device);

    return true;
};

// READ: đọc thiết bị theo phòng
const readDevicesByRoom = (list, roomName) => {
    return list.filter((device) => {
        return device.room === roomName;
    });
};

// UPDATE: cập nhật thiết bị
const updateDevice = (list, id, updateData) => {
    const targetDevice = list.find((device) => {
        return device.id === id;
    });

    if (targetDevice === undefined) {
        return false;
    }

    // Dùng !== undefined để không bỏ qua false hoặc 0
    if (updateData.name !== undefined) {
        targetDevice.name = updateData.name;
    }

    if (updateData.room !== undefined) {
        targetDevice.room = updateData.room;
    }

    if (updateData.isActive !== undefined) {
        targetDevice.isActive = updateData.isActive;
    }

    if (updateData.powerWatts !== undefined) {
        if (updateData.powerWatts > 0) {
            targetDevice.powerWatts = updateData.powerWatts;
        }
    }

    return true;
};

// DELETE: xóa thiết bị
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


// ===============================
// KIỂM THỬ CRUD
// ===============================

console.log("===== DANH SACH BAN DAU =====");
console.log(devices);


// CREATE
console.log("===== CREATE =====");

const newDevice = {
    name: "May loc khong khi",
    room: "Phong khach",
    isActive: true,
    powerWatts: 80
};

console.log("Ket qua them:", createDevice(devices, newDevice));
console.log(devices);


// READ
console.log("===== READ THEO PHONG =====");

const livingRoomDevices = readDevicesByRoom(devices, "Phong khach");

console.log("Thiet bi phong khach:");
console.log(livingRoomDevices);


// UPDATE
console.log("===== UPDATE =====");

console.log(
    "Cap nhat DEV_002:",
    updateDevice(devices, "DEV_002", {
        isActive: true,
        powerWatts: 0
    })
);

console.log("DEV_002 sau khi update:");
console.log(devices[1]);


// Kiểm tra trường hợp ID không tồn tại
console.log(
    "Update ID khong ton tai:",
    updateDevice(devices, "DEV_999", {
        isActive: true
    })
);


// DELETE
console.log("===== DELETE =====");

console.log(
    "Xoa DEV_003:",
    deleteDevice(devices, "DEV_003")
);

console.log("Danh sach sau khi xoa:");
console.log(devices);


// Kiểm tra xóa ID không tồn tại
console.log(
    "Xoa ID khong ton tai:",
    deleteDevice(devices, "DEV_999")
);