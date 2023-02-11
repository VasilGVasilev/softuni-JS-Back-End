// function foo(x){
//     return x * x;
// }

// function bar(y){
//     return foo(y + 2);
// }
// console.log(bar(8));
// >> 100 
// Stack calls:
// bar gives 8 as a param to its function
// 8 + 2 is given to foo as a param
// foo is executed to be 100 and returns this 100 to bar
// bar returns the 100 too
// logged 100