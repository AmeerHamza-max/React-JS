// Default Parameters
function mulofTwoNumbers(num1=1,num2 = 2){
    console.log(num1);
    return num1 * num2;
}

console.log(mulofTwoNumbers(2,3));

// Spread Opoerators
const arr = [2,4,5];
const arr2 =[11,12,13];
console.log([99,...arr,90,...arr2,10000]);



function getInfo(a,b,c,d,e){
    console.log(a,b,c,d,e);
    return "Hamza";
}
function takeinfo(a,b,...c){
    console.log(a,b,c);

}
console.log(getInfo(1,2,3,4,5));
console.log(takeinfo(1,2,3,4,5));
