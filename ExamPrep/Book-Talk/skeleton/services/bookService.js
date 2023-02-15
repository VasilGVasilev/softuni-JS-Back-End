const Book = require('../models/Book')

exports.create = (ownerId, bookData) => Book.create({...bookData, owner: ownerId}); //destructuring to add owner to the Model

// dont forget to .lean() if not here in service so that templating engine works
exports.getAll = () => Book.find({}).lean();

exports.getAllWished = async (userId) => {
    const books = await Book.find().lean();
    // console.log(books.map(book => book.wishingList.toString()))
    const wishedBooks = books.map(book => book.wishingList.some(wishedBook => wishedBook.toString() == userId));
    // console.log(wishedBooks)
    return wishedBooks

}

(userId) => Book.find({wishingList: {}});

exports.getOne = (bookId) => Book.findById(bookId).lean()

// easier but two requests!
// exports.wish = async (userId, bookId) => {
//     const book = await Book.findById(bookId);
//     // TODO: check if user has already bought the book
//     book.wishingList.push(userId);
//     return book.save();

// }


// expert
exports.wish = async (userId, bookid) => {
    await Book.findByIdAndUpdate(bookid, {$push:{wishingList:userId}}) //20:35 mongoDB way
}

// findByIdAndUpdate is smart and updates only edited info
exports.edit = (bookId, bookData) => Book.findByIdAndUpdate(bookId, bookData, {runValidators: true}) //validation works on edit view too

exports.delete = (bookId) => Book.findByIdAndDelete(bookId)
