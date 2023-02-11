const subscribers = {};

// {
//     callPeshoEvent: [Array with functions/modules/ executed on callPeshoEvent]
// }

// addEventListener
// subscribe becomes a higher-order function 
// => manipulate data via code above to return
// => after that return another function with different functionlaity
// subscribe() has dual funcionality -> initial that sets some conditions and secondary whose functionality is separate 

function subscribe(eventType, callback){
    if(!subscribers[eventType]){
        subscribers[eventType] = [];
    }
    subscribers[eventType].push(callback);
    return () => {
        subscribers[eventType] = subscribers[eventType].filter(x => x != callback) //compare functions by virtue of functions being stored as reference 
    }
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

