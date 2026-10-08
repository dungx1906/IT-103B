const findDeviceById = (devices, targetId) => {
  for (let i = 0; i < devices.length; i++) {
    if (devices[i].id === targetId) {
      return devices[i];
    }
  }

  return null;
};

const updateDevice = (devices, targetId, updatedData) => {
  const targetDevice = findDeviceById(devices, targetId);

  if (targetDevice === null) {
    return false;
  }

  if (updatedData.name !== undefined) {
    targetDevice.name = updatedData.name;
  }

  if (updatedData.isActive !== undefined) {
    targetDevice.isActive = updatedData.isActive;
  }

  if (updatedData.powerWatts !== undefined) {
    targetDevice.powerWatts = updatedData.powerWatts;
  }

  return true;
};

const devices = [
  {
    id: "D01",
    name: "Điều hòa phòng khách",
    isActive: true,
    powerWatts: 1500
  },
  {
    id: "D02",
    name: "Đèn ngủ",
    isActive: true,
    powerWatts: 100
  }
];

console.log("--- TRƯỚC KHI CẬP NHẬT ---");

for (let i = 0; i < devices.length; i++) {
  console.log(
    devices[i].id + " | " +
    devices[i].name + " | " +
    "isActive: " + devices[i].isActive + " | " +
    "powerWatts: " + devices[i].powerWatts
  );
}

// Tắt điều hòa
updateDevice(devices, "D01", {
  isActive: false
});

// Hạ công suất đèn ngủ về 0W
updateDevice(devices, "D02", {
  powerWatts: 0
});

console.log("\n--- SAU KHI CẬP NHẬT ---");

for (let i = 0; i < devices.length; i++) {
  console.log(
    devices[i].id + " | " +
    devices[i].name + " | " +
    "isActive: " + devices[i].isActive + " | " +
    "powerWatts: " + devices[i].powerWatts
  );
}