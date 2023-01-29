exports.modelValidator = (Model) => async (req, res, next) => {
    try {
        await Model.validate(req.body);

        next();
    } catch (error) {
        console.log(error);
        res.status(400).send(Object.values(error)[0]);
    }
};
// How does this work -> function composition, currying
    // const curry = (a) => (b) => {a+b}

    // JS creates a closure for the returned function '(b) => {a + b}' 
    // that captures the value of 'a', thus, the returned function has
    // access to 'a'.

    // await Model.validate(req.body);
    
    // so the async function has access to Model as it is seen in: