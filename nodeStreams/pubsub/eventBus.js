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
function publish(eventType, data){
    subscribers[eventType].forEach(cb => cb(data));
}

module.exports = {
    subscribe,
    publish
}