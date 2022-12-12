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
// better to have a possibility for many args of data => array
function publish(eventType, ...params){
    subscribers[eventType].forEach(cb => cb.apply(null, params)); //or cb(...params)
}

module.exports = {
    subscribe,
    publish
}