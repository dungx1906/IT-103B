const distanceKm = 4;
const isRaining = false;

const baseFare = 12000;
const pricePerAdditionalKm = 4500;
const weatherMultiplier = 1.2;

let totalFare = 0;

if(distanceKm <= 2){
    totalFare = baseFare;
}else{
    totalFare = baseFare + (distanceKm - 2) * pricePerAdditionalKm;
}

if(isRaining){
    totalFare = totalFare + weatherMultiplier
}

console.log("Khoang cach di chuyen:",distanceKm, 'Km');
console.log("Tong cuoc phi di chuyen:",totalFare, 'VND');