const eventBus = require('./eventBus');

// subscribe events into a closure object ready to be emitted
eventBus.subscribe('say-hello', (name, secondName) => console.log('event say-hello executed! - ' + name + ' ' + secondName));
eventBus.subscribe('say-hello', (name, secondName) => console.log('event say-hello executed! Second time - ' + name + ' ' + secondName));
eventBus.subscribe('say-bye', (name) => console.log('event say-bye executed! - ' + name));

// publish/emit the data subscribed to the closure object
eventBus.publish('say-hello', 'Pesho')
eventBus.publish('say-hello', 'Gosho', 'Ivan')
eventBus.publish('say-bye', 'Pesho')

// not only emitting but also data is passed as an arg to make emit dynamic

// >> 
// event say-hello executed! - Pesho undefined
// event say-hello executed! Second time - Pesho undefined  
// event say-hello executed! - Gosho Ivan
// event say-hello executed! Second time - Gosho Ivan       
// event say-bye executed! - Pesho

// because first publish is with Pesho as only argument while app expects name and secondName