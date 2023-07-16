Setup Mongoose DB :
[see papazov at 1:45:00](https://softuni.bg/trainings/resources/video/72281/video-30-may-2022-ivaylo-papazov-js-back-end-may-2022/3712)


constructor for schema vs factory function for model:
The factory function pattern is similar to constructors, but instead of using new to create an object, factory functions simply set up and return the new object when you call the function.


Horizontal scaling 

As mentioned above, sharding is horizontal scaling by spreading data across multiple nodes. 
Each node contains a subset of the overall data. This is especially effective for increasing 
throughput for use cases that involve significant amounts of write operations, as each operation 
only affects one of the nodes and the partition of data it is managing.

While sharding happens automatically in MongoDB Atlas, it is still up to us to configure 
the shard key, which is used by MongoDB for partitioning the data in a non-overlapping 
fashion across shards. This can be done automatically through either ranged or hashed sharding, 
or customized using zoned sharding.

Over time, datasets typically do not grow uniformly, and various shards will grow at faster rates 
than others. As your workloads evolve and data sets grow, there will be a need to rebalance data 
to ensure an even distribution of load across the cluster. This uneven distribution of data is 
addressed through shard balancing. 
In MongoDB, this is handled automatically by the sharded cluster balancer.

1:49:00 - accessing libraries from CDN 

1:40:00 - mongoose automatically looks for the plural, lowercased version of your model name.

1:05:00 - virtual vs method
In Mongoose, a virtual is a field that is not persisted in the database, 
but rather it is computed on the fly when requested. 
They are useful for defining properties that are derived from existing fields, 
or for defining properties that do not need to be stored in the database.

On the other hand, a method is a function that can be called on a Mongoose document instance. 
It is similar to a virtual, but it can also be used to define functions that 
can be called on the document instance.

    Here is an example to illustrate the difference:

    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const userSchema = new Schema({
    name: String,
    email: String,
    password: String
    });

    // Define a virtual
    userSchema.virtual('greeting').get(function() {
    return `Hello, my name is ${this.name}`;
    });

    // Define a method
    userSchema.methods.sayHi = function() {
    return `Hi, my name is ${this.name}`;
    };

    const User = mongoose.model('User', userSchema);

    const user = new User({
    name: 'John',
    email: 'john@example.com',
    password: '123456'
    });

    // Use the virtual
    console.log(user.greeting); // "Hello, my name is John"

    // Use the method
    console.log(user.sayHi()); // "Hi, my name is John"

Why use one over then other

You would use a virtual over a method when you want to define a field that is not persisted in the database, 
but rather computed on the fly when requested. This can be useful for defining properties that are derived 
from existing fields, or for defining properties that do not need to be stored in the database.

You would use a method when you want to define a function that can be called on a Mongoose document instance. 
This can be useful for defining helper functions that can be called on the document instance, or for defining 
functions that perform some action on the document.

It's also worth noting that you can use both virtuals and methods on a single schema, depending on your needs. 
For example, you might define a virtual to compute a derived field, and then define a method to perform an action on that field.