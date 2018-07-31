const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect(
  "mongodb://localhost:27017/TodoApp",
  (err, client) => {
    if (err) return console.log("Unable to connect to mongodb server");

    console.log("Connect to mongodb Server");

    const db = client.db("TodoApp");

    //findOne
    // db.collection("Todos")
    //   .findOneAndUpdate(
    //     {
    //       _id: new ObjectID("5b5fda29d1974cbfb8b4f742")
    //     },
    //     {
    //       $set: {
    //         completed: true
    //       }
    //     },
    //     { returnOriginal: false }
    //   )
    //   .then(res => console.log(res));

    db.collection("Users")
      .findOneAndUpdate(
        {
          _id: new ObjectID("5b5fd643d1974cbfb8b4f66e")
        },
        {
          $set: {
            name: "Peter"
          },
          $inc: {
            age: 1
          }
        },
        {
          returnOriginal: false
        }
      )
      .then(res => console.log(res));

    // client.close();
  }
);
