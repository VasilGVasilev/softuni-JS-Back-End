const EventEmitter = require('events');
let eventEmitter = new EventEmitter();

// subscribe
eventEmitter.on('click', (a, b) => {
    console.log('A click has been detected!');
    console.log(a + ' ' + b); //outputs 'Hello world'
})


// publish
eventEmitter.emit('click', 'Hello', 'world');

