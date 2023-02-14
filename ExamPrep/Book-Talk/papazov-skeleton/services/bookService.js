const Book = require('../models/Book')

exports.create = (ownerId, bookData) => Book.create({...bookData, owner: ownerId}); //destructuring to add owner to the Model

// dont forget to .lean() if not here in service so that templating engine works
exports.getAll = () => Book.find({}).lean();

// exports.search = async (name, paymentMethod) => {
//     let book = await this.getAll();
//     // in-memory filtration
//     if (name) {
//         book = book.filter(x => x.name.toLowerCase() == name);
//     }

//     if (paymentMethod) {
//         book = book.filter(x => x.paymentMethod == paymentMethod);
//     }
//     return book
// }

exports.getOne = (bookId) => Book.findById(bookId).lean()

// easier but two requests!
// exports.buy = async (userId, bookId) => {
//     const book = await Book.findById(bookId);
//     // TODO: check if user has already bought the book
//     book.buyers.push(userId);
//     return book.save();

// }


// expert
// exports.buy = async (userId, bookid) => {
//     Book.findByIdAndUpdate(bookid, {$push:{buyers:userId}}) //20:35 mongoDB way
// }

// findByIdAndUpdate is smart and updates only edited info
exports.edit = (bookId, bookData) => Book.findByIdAndUpdate(bookId, bookData, {runValidators:true}) //va;idation works on edit view too

exports.delete = (bookId) => Book.findByIdAndDelete(bookId)
