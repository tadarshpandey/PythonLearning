function greet(){
    console.log("Hello...Welcome to JavaScript Functions");

}

greet();

// parameterized function

let name = "Pandit";

function greetParameterized(name){
    console.log("Hello...Welcome to JavaScript Functions " + name);
}

greetParameterized(name);

// Arrow function => very important in Javascript

const multiply = (a, b) => {
    return a * b;
};

console.log(multiply(5, 7));

// Short version of arrow function when there is only one expression
const add = (a, b) => a + b;

console.log(add(10, 15));


let square = x => x * x;

console.log(square(13));