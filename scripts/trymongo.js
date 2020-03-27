const { MongoClient } = require('mongodb')

const url = "mongodb://localhost/issuetracker"

function testWithCallbacks(callback) {
    console.log('\n--- testWithCallbacks ---');
    const client= new MongoClient(url, {useNewUrlParser: true})
    client.connect(function(err, client){
        if (err) {
            callback(err)
            return
        }
        console.log("connected to mongo")
        const db = client.db()
        const collection = db.collection('employees')
        const employee = { id: 1, name: 'A. Callback', age: 23 }
        collection.insertOne(employee, function(err, result) {
            if (err) {
                client.close()
                callback(err)
                return
            }
            console.log('Result of insert:\n', result.insertedId)
            collection.find({ _id: result.insertedId})
                .toArray(function(err, docs) {
                    if (err) {
                        client.close()
                        callback(err)
                        return
                    }
                    console.log('Result of find:\n', docs)
                    client.close()
                    callback(err)
            });
        });
    });
}
testWithCallbacks(function(err) {
    if (err) {
        console.log(err);
    }
});

