let a = true;
let b = false; 
let c = true;
console.log(a||b);
console.log(a && b);
console.log(a && b);

function getName(name){
    return name;
}
console.log(a && getName("Hamza"));
console.log(b && getName("Hamza"));
console.log(a||b);
console.log(a||c)
console.log(a || getName("Hamza"));
console.log(b || getName("Hamza"));