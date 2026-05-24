// Very important because:

// MongoDB returns objects
// APIs return JSON objects
// React props/state are objects


// Store data in key value form . . . .



// let data = {
//     "key": "value",
//     "name": "Adarsh",
//     "age": 20,
//     "city": "Prayagraj"
// };

// for (let key of Object.keys(data)) {
//     console.log(key + ": " + data[key]);
// }


let user = {
    name: "Adarsh Pandey",
    age: 23,
};

console.log(user.name);
console.log(user["age"]);
