exports.modelValidator = (Model) => async (req, res, next) => {
    try {
        await Model.validate(req.body);

        next();
    } catch (error) {
        console.log(error);
        res.status(400).send(Object.values(error)[0]);
    }
};

// Higher order function ""(model) => returns" "async await function""
// we have higher order functin (Model) => async (req, res, next)
// thus, in this function we can acces Model, because higher order functions are based on closures,
// namely, after '=>': async(res, res, next) is the returned function and it has access to what is before '=>': (Model)