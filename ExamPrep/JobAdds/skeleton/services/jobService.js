const User = require('../models/User')
const Job = require('../models/Job')

exports.create = (authorId, jobData) => Job.create({...jobData, author: authorId}); //destructuring to add owner to the Model

// dont forget to .lean() if not here in service so that templating engine works
exports.getAll = () => Job.find({}).lean();

// exports.getAllWished = async (userId) => {
//     const jobs = await Job.find().lean();
    // console.log(jobs.map(job => job.wishingList.toString()))
//     // const wishedJobs = jobs.map(job => job.wishingList.some(wishedjob => wishedJob.toString() == userId));
//     // console.log(wishedjobs)
//     return wishedjobs

// }

exports.getOne = (jobId) => Job.findById(jobId).lean()

exports.getAuthor = (userId) => User.findById(userId).lean()
exports.getAllCandidates = () => Job.find({}).lean();


// easier but two requests!
exports.apply = async (userId, jobId) => {
    const job = await Job.findById(jobId);
    // TODO: check if user has already bought the job
    job.usersApplied.push(userId);
    return job.save();

}


// expert
// exports.wish = async (userId, jobid) => {
//     await Job.findByIdAndUpdate(jobid, {$push:{wishingList:userId}}) //20:35 mongoDB way
// }

// findByIdAndUpdate is smart and updates only edited info
exports.edit = (jobId, jobData) => Job.findByIdAndUpdate(jobId, jobData, {runValidators: true}) //validation works on edit view too

exports.delete = (jobId) => Job.findByIdAndDelete(jobId)
