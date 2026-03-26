let fac= function(n){
    if(n==0 || n==1){
        return 1;
    }
    else{
        return n*fac(n-1);
    }
}

// Import the module
const prompt = require('prompt-sync')();

let a = Number(prompt("Enter a no. :"));
console.log(fac(a));