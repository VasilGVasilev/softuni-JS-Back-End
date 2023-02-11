let subs = {
    x: 5
}

function changeFive (n) {
    subs.x = n;
    return () => subs.x = 9;
}



let change = changeFive(6);

// changeFive is called/executed (part above return) and stored in let change, simultaneoulsy
    // subs.x is set to n which is 6
    // part after return is executable when function expression is called
console.log(subs.x);
    
// later when let change is called on its own -> the code after return is executed, which updated subs.x to 9
change();    
console.log(subs.x);


