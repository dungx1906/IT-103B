const books = [
  {
    bookCode: "B01",
    title: "Lập trình JavaScript cơ bản",
    category: "Công nghệ thông tin",
    price: 150000,
    totalCopies: 5,
    availableCopies: 2,
    shelfLocation: "A01"
  },
  {
    bookCode: "B02",
    title: "Cơ sở dữ liệu MySQL",
    category: "Công nghệ thông tin",
    price: 180000,
    totalCopies: 4,
    availableCopies: 4,
    shelfLocation: "A02"
  },
  {
    bookCode: "B03",
    title: "Phân tích hệ thống",
    category: "Công nghệ thông tin",
    price: 200000,
    totalCopies: 3,
    availableCopies: 1,
    shelfLocation: "B01"
  }
];

console.log("==============================================");
console.log("       KIỂM KÊ KHO ẤN BẢN THƯ VIỆN");
console.log("==============================================");

console.log("\n--- KHO BAN ĐẦU ---");

for (let i = 0; i < books.length; i++) {
  console.log(
    books[i].bookCode + " | " +
    books[i].title + " | " +
    books[i].category + " | " +
    books[i].price + " VNĐ | " +
    books[i].totalCopies + " cuốn | " +
    books[i].availableCopies + " cuốn | " +
    books[i].shelfLocation
  );
}

// CREATE: Nhập kho sách mới
const newBook = {
  bookCode: "B04",
  title: "Lập trình Python cơ bản",
  category: "Công nghệ thông tin",
  price: 170000,
  totalCopies: 6,
  availableCopies: 6,
  shelfLocation: "B02"
};

books.push(newBook);

console.log("\n--- SAU KHI NHẬP KHO B04 ---");

for (let i = 0; i < books.length; i++) {
  console.log(
    books[i].bookCode + " | " +
    books[i].title + " | " +
    books[i].category + " | " +
    books[i].price + " VNĐ | " +
    books[i].totalCopies + " cuốn | " +
    books[i].availableCopies + " cuốn | " +
    books[i].shelfLocation
  );
}

// UPDATE: Sinh viên mượn sách B01
const borrowBookCode = "B01";

for (let i = 0; i < books.length; i++) {
  if (books[i].bookCode === borrowBookCode) {
    if (books[i].availableCopies > 0) {
      books[i].availableCopies--;

      if (books[i].availableCopies === 0) {
        console.log("\nSách B01: HẾT SÁCH TRÊN KỆ");
      } else {
        console.log(
          "\nSách B01 còn " +
          books[i].availableCopies +
          " cuốn trên kệ."
        );
      }
    } else {
      console.log("\nKhông thể mượn sách B01 vì đã hết sách trên kệ.");
    }
  }
}

console.log("\n--- SAU KHI CHO MƯỢN B01 ---");

for (let i = 0; i < books.length; i++) {
  console.log(
    books[i].bookCode + " | " +
    books[i].title + " | " +
    books[i].category + " | " +
    books[i].price + " VNĐ | " +
    books[i].totalCopies + " cuốn | " +
    books[i].availableCopies + " cuốn | " +
    books[i].shelfLocation
  );
}

// DELETE: Thanh lý sách B03
const deleteBookCode = "B03";

for (let i = 0; i < books.length; i++) {
  if (books[i].bookCode === deleteBookCode) {
    books.splice(i, 1);
    console.log("\nĐã thanh lý sách B03.");
    break;
  }
}

console.log("\n--- SAU KHI THANH LÝ B03 ---");

for (let i = 0; i < books.length; i++) {
  console.log(
    books[i].bookCode + " | " +
    books[i].title + " | " +
    books[i].category + " | " +
    books[i].price + " VNĐ | " +
    books[i].totalCopies + " cuốn | " +
    books[i].availableCopies + " cuốn | " +
    books[i].shelfLocation
  );
}

// READ: Kiểm kê tổng số lượng và tổng giá trị tài sản
let totalBookCopies = 0;
let totalInventoryValue = 0;

for (let i = 0; i < books.length; i++) {
  totalBookCopies += books[i].totalCopies;
  totalInventoryValue += books[i].totalCopies * books[i].price;
}

console.log("\n==============================================");
console.log("              KẾT QUẢ KIỂM KÊ");
console.log("==============================================");
console.log("Tổng số lượng sách:", totalBookCopies, "cuốn");
console.log("Tổng giá trị tài sản:", totalInventoryValue, "VNĐ");
console.log("==============================================");