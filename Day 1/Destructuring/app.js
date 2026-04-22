const id = 1 ;
const productName="Product Apple Watch";
const rating = 5;
const product={
    id:id,
    productName:productName,
    rating:rating,
}
const product1={
    id,
    productName,
    rating,
}
console.log(product);
console.log(product1);

const product3={
    description:"Product 2 description",
    id,
    productName,
    rating
}
const getProductThreeDescription = product3.description;
console.log(getProductThreeDescription);

const {description}=product3;


const arr = [1,2,3];
let  firstValue = arr[0];
let secondValue = arr[1];
console.log(firstValue);
console.log(secondValue);
const [arr1,arr2,arr3,arr4]=arr;
console.log(arr1);
console.log(arr2);
console.log(arr3);
console.log(arr4);