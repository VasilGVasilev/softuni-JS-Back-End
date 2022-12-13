const fs = require('fs');

// emitters that create the stream
const readStream = fs.createReadStream('./text.txt', {encoding: 'utf-8'}); 
const writeStream = fs.createWriteStream('./copyText.txt', {encoding: 'utf-8'}); 

// listeners .on() detects the new stream
readStream.on('data', (chunk) => {
    writeStream.write(chunk)
})

readStream.on('end', () => {
    writeStream.end();
    console.log('Finished');
})

writeStream.on('finish', () => {
    console.log('File is saved');
})


// In Node.js, the createReadStream() method is used to 
// create a readable stream from a given file path. 
// The end option, when set to true, indicates that 
// the stream should be closed once all data has been 
// read from the file. This can be useful if you only 
// want to read the file once and do not need to keep 
// the stream open - to read further from the file