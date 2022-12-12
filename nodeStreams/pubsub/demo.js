const eventBus = require('./eventBus');

// first, we use the initial functionality of subscribe -> register events
// second, we store subscribe in a function expression to make use of functionality after return in subscribe definition
// then, we execute subscribes and one publish, result is according to initial subscribe functionality
// BUT, we execute the function expression storing the secondary subscribe functionlaity below return which filters out the callback specified in this case the first one with two names so only the second callback with one name persists
// then, the effects of the filter take place and the event say-hello's first callback is deactivated

// subscribe events into a closure object ready to be emitted
let firstSayHelloUnsubsrcibe = eventBus.subscribe('say-hello', (name, secondName) => console.log('event say-hello executed! - ' + name + ' ' + secondName));
eventBus.subscribe('say-hello', (name, secondName) => console.log('event say-hello executed! Second time - ' + name + ' ' + secondName));
eventBus.subscribe('say-bye', (name) => console.log('event say-bye executed! - ' + name));

// publish/emit the data subscribed to the closure object
eventBus.publish('say-hello', 'Gosho', 'Ivan')

firstSayHelloUnsubsrcibe();

eventBus.publish('say-hello', 'Pesho')
eventBus.publish('say-bye', 'Pesho')

// not only emitting but also data is passed as an arg to make emit dynamic

// because first publish is with Pesho as only argument while app expects name and secondName