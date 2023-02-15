// differentiate between Model and services error

// list of all mongoose errors and return first of them
function getFirstMongooseError(error){
    // for better mapping of values: 0 - username error, 1 - email error, 2 - pass error;
    // const errors = Object.keys(error.errors).map(key => error.errors[key].message);
    const firstError = Object.values(error.errors)[0].message;

    return firstError;
}

// differentiate between Model and services error
// Hierarchy of Errors:
// - JS Error (global.Error)
// - MongooseError (MongooseError extends global.Error)
// - ValidationError (ValidationError extends MongooseError)


// Validation
exports.getErrorMessage = (error) => {
    switch(error.name){
        case 'Error':
            return error.message;
        case 'ValidationError':
            return getFirstMongooseError(error);
        default:
            return error.message;
    }
}