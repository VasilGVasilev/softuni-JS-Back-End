const eventBus = require('./eventBus');

// subscribe events into a closure object ready to be emitted
eventBus.subscribe('say-hello', (name) => console.log('event say-hello executed! - ' + name));
eventBus.subscribe('say-hello', (name) => console.log('event say-hello executed! Second time - ' + name));
eventBus.subscribe('say-bye', (name) => console.log('event say-bye executed! - ' + name));

// publish/emit the data subscribed to the closure object
eventBus.publish('say-hello', 'Pesho')
eventBus.publish('say-hello', 'Gosho')
eventBus.publish('say-bye', 'Pesho')

// not only emitting but also data is passed as an arg to make emit dynamic

