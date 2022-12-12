const events = require('events');
let eventEmitter = new events.EventEmitter();

const subscribers = {};


// function subscribe(eventType, callback){
//     if(!subscribers[eventType]){
//         subscribers[eventType] = [];
//     }
//     subscribers[eventType].push(callback);
//     return () => {
//         subscribers[eventType] = subscribers[eventType].filter(x => x != callback) //compare functions by virtue of functions being stored as reference 
//     }
// }

eventEmitter.on('click', (a, b) => {
    console.log('A click has been detected!');
    console.log(a + ' ' + b); //outputs 'Hello world'
})



// function publish(eventType, ...params){
//     subscribers[eventType].forEach(cb => cb.apply(null, params)); //or cb(...params)
// }

eventEmitter.emit('click', 'Hello', 'world');

module.exports = {
    subscribe,
    publish
}

