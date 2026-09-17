const value1 = "150000";
const value2 = "3.75";
const value3 = "";
const value4 = "100k";
const value5 = null;
const value6 = undefined;

const number1 = Number(value1);
const number2 = Number(value2);
const number3 = Number(value3);
const number4 = Number(value4);
const number5 = Number(value5);
const number6 = Number(value6);

const plus1 = +value1;
const plus2 = +value2;
const plus3 = +value3;
const plus4 = +value4;
const plus5 = +value5;
const plus6 = +value6;


console.log(`
====================== KẾT QUẢ KIỂM NGHIỆM ======================
Giá trị     |   Number()    |   +value
-----------------------------------------------------------------
"150000"    |   ${number1}  |   ${plus1}
"3.75"      |   ${number2}  |   ${plus2}
""          |   ${number3}  |   ${plus3}
"100k"      |   ${number4}  |   ${plus4}
null        |   ${number5}  |   ${plus5}
undefined   |   ${number6}  |   ${plus6}
=================================================================
`)

console.log("Kiểu dư liệu của number1:", typeof number1);
console.log("Kiểu dữ liệu của plus1:", typeof plus1);