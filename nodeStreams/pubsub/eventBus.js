const subscribers = {};

// {
//     callPeshoEvent: [Array with functions/modules/ executed on callPeshoEvent]
// }

// addEventListener
function subscribe(eventType, callback){
    if(!subscribers[eventType]){
        subscribers[eventType] = [];
    }
    subscribers[eventType].push(callback);
}

// emit
function publish(eventType){
    subscribers[eventType].forEach(cb => cb());
}

module.exports = {
    subscribe,
    publish
}