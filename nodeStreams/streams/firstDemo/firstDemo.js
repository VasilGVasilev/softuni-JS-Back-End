const fs = require('fs');

const readStream = fs.createReadStream('./text.txt', {encoding: 'utf-8'}); //options arg -> encoding so that you dont get the default buffer <Buffer 20 69 6d 70 65 72 64 69 65 74 20 64 75 69 20 61 63 63 75 6d 73 61 6e 20 73 69 74 2e 20 50 72 65 74 69 75 6d 20 76 75 6c 70 75 74 61 74 65 20 73 61 70 ... 21102 more bytes>
// the moment data is read, an event is emitted

// which here is caught with .on('data', cb)
readStream.on('data', (chunk) => {
    console.log(chunk);
})

// .on() is part of the main stream module
// it is also part of the events module

// createReadStream creates a readbale stream 
// .on() is an event listener that listens for events emiited by the readable stream
//  it listens for a data event, which in fact is emitted whenever,
// a chunk of data is availableto be read from the stream

// In the context of readable streams in Node.js, the data event is emitted whenever
// a chunk of data is available to be read from the stream:
// - When a stream is READING data from a file on the file system
// - When data is being WRITTEN to a stream and then read back out.