const personArray = [
    {
        name:'Person 005',
        age:35,
        country:'USA'
    },
     {
        name:'Person 1',
        age:30,
        country:'USA'
    },
    {
        name:'Person 2',
        age:40,
        country:'Russia'
    },
    {
        name:'Person 3',
        age:50,
        country:'Pakistan'
    },
]

let getAllNames = personArray.map((arr,index)=>{
    return `${arr.name} and age is ${arr.age}`;
})

console.log(getAllNames);



// Find method 
// return only one object first match 
let getPersonFromUSA= personArray.find((singlePerson,index)=>{
    return singlePerson.country = 'USA';
})
console.log(getPersonFromUSA);



// filter method 
// return all matching objects
let getAllPersonsFromUSA= personArray.filter((singlePerson,index)=>{
    return singlePerson.country='USA';
})
console.log(getAllPersonsFromUSA);



// Some method

let checkSome = personArray.some(singlePerson=>{
    return singlePerson.age > 40;
})
console.log(checkSome);

//Every 

let checkEvery = personArray.every(singlePerson=>{
    return singlePerson.age > 40;
})
console.log(checkEvery);