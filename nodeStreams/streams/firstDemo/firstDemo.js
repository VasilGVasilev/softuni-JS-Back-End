const fs = require('fs');

const readStream = fs.createReadStream('./largeFile.txt');
// the moment data is read, an event is emitted

// which here is caught with .on('data', cb)
readStream.on('data', (chunk) => {
    console.log(chunk);
})

// createReadStream creates a readbale stream 
// .on() is an event listener that listens for events emiited by the readable stream
//  it listens for a data event, which in fact is emitted whenever,
// a chunk of data is availableto be read from the stream

// In the context of readable streams in Node.js, the data event is emitted whenever
// a chunk of data is available to be read from the stream:
// - When a stream is READING data from a file on the file system
// - When data is being WRITTEN to a stream and then read back out.