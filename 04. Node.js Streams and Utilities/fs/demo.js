const fs = require('fs');


// better async rather then sync version
fs.readFile('./text.txt', {encoding: 'utf-8'}, (err, data) =>{
    // err checking is node standard
    if(err){
        console.log(err);
        return;
    }
    console.log(data);
})

// end is first due to fs.readFile being async
console.log('end');