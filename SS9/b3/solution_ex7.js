const rooms = [
  {
    roomId: "P101",
    roomType: "Deluxe",
    pricePerNight: 1500000,
    status: "VACANT"
  },
  {
    roomId: "P102",
    roomType: "Standard",
    pricePerNight: 1000000,
    status: "VACANT"
  },
  {
    roomId: "P103",
    roomType: "Superior",
    pricePerNight: 1200000,
    status: "VACANT"
  }
];

console.log("--- DANH SÁCH PHÒNG BAN ĐẦU ---");

for (const room of rooms) {
  console.log(
    room.roomId + " | " +
    room.roomType + " | " +
    room.pricePerNight + " VNĐ | " +
    room.status
  );
}

// CREATE: Thêm phòng P104
const newRoom = {
  roomId: "P104",
  roomType: "VIP Suite",
  pricePerNight: 3500000,
  status: "VACANT"
};

rooms.push(newRoom);

console.log("\n--- SAU KHI THÊM PHÒNG P104 ---");

for (const room of rooms) {
  console.log(
    room.roomId + " | " +
    room.roomType + " | " +
    room.pricePerNight + " VNĐ | " +
    room.status
  );
}

// READ + UPDATE: Tìm phòng P101 và cập nhật trạng thái
const updateRoomId = "P101";

for (const room of rooms) {
  if (room.roomId === updateRoomId) {
    room.status = "OCCUPIED";
  }
}

console.log("\n--- SAU KHI CHECK-IN PHÒNG P101 ---");

for (const room of rooms) {
  console.log(
    room.roomId + " | " +
    room.roomType + " | " +
    room.pricePerNight + " VNĐ | " +
    room.status
  );
}

// DELETE: Xóa phòng P103
const deleteRoomId = "P103";

for (let i = 0; i < rooms.length; i++) {
  if (rooms[i].roomId === deleteRoomId) {
    rooms.splice(i, 1);
    break;
  }
}

console.log("\n--- SAU KHI XÓA PHÒNG P103 ---");

for (const room of rooms) {
  console.log(
    room.roomId + " | " +
    room.roomType + " | " +
    room.pricePerNight + " VNĐ | " +
    room.status
  );
}