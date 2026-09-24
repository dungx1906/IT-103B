const bookingId = "GRB-84920";
const customerName = "Tran Thi Mai"
const distanceInKM = 4;
const isHeavyRain = true;

const baseFare = 12000;
const extraFarePerKm = 4500;
let totalFare = 0;

if (distanceInKM < 0){
    console.log("Quang duong khong hop le");
}else{
    if(distanceInKM <= 2){
        totalFare = baseFare;
    }else{
        totalFare = baseFare + (distanceInKM - 2) * extraFarePerKm;
    }
}

if(isHeavyRain){
    totalFare = totalFare * 1.2;
}

console.log("Ma di chuyen:",bookingId);
console.log("Khach hang:",customerName);
console.log("Quang duong:",distanceInKM);
console.log("Tong cuoc di chuyen:",totalFare);