// ERROR c is undefined, cannot call due to c encapsualted in a()
    // function a(){
    //     function c(){
    //         console.log('Hello');
    //     }
    //     return c()
    // }
    // function b(){
    //     c()
    // }

    // b()


// SOLUTION
    // function a(){
    //     function c(){
    //         console.log('Hello');
    //     }
    //     return c()
    // }
    // function b(){
    //     a()
    // }

    // b()

    
    // prints 5, interestingly without the need to set y inside "= () =>"
    // let y = 5;
    
    // const b = () => console.log(y)
    
    // b(y)
    //  OR
    
    // let y = 5;
    
    // function b(){
        //     console.log(y);
        // }
        
        // b(y)
        
        
        // let y = 5;
        
        
        // function b(y) {
            //     function m(){
                //         console.log('heloo');
                //     }
                // } 
                
                // b(y)

// INITIAL PROBLEM regarding higher order functions -> model validator 

    // let y = 5;

    // const b = (y) => () => {
    //     y+=1;
    //     console.log(y);
    // }
    // b(y)

// it works only if you doubly execute b, namely, b(y)()

    // let y = 5;

    // const b = (y) => () => {
    //     y+=1;
    //     console.log(y); // y can take its initial value from whatever outer function
    // }
    // b(y)()

// model example of Papazov, in fact, does that

// FIRST EXECUTION in accessoryController 
// router.post('/create', modelValidator(Accessory), async (req, res) => {

    
//     router.post('/create', modelValidator(Accessory), async (req, res) => { //HERE
//         await accessoryService.create(req.body);
        
//         res.redirect('/');
//     });
    
// SECOND EXECUTION in modelValidatorMiddleware
// next()

// exports.modelValidator = (Model) => async (req, res, next) => {
//     try {
//         await Model.validate(req.body);

//         next(); //<--------------HERE
//     } catch (error) {
//         console.log(error);
//         res.status(400).send(Object.values(error)[0]);
//     }
// };
