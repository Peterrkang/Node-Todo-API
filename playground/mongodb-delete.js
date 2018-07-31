const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect(
  "mongodb://localhost:27017/TodoApp",
  (err, client) => {
    if (err) return console.log(`Unable to connect to MongoDB Serer`, err);

    console.log(`Connected to MongoDB server`);

    const db = client.db("TodoApp");

    //deleteMany
    // db.collection("Todos")
    //   .deleteMany({ text: "Eat Lunch" })
    //   .then(res => {
    //     console.log(res);
    //   });

    //deleteOne
    // db.collection("Todos")
    //   .deleteOne({ text: "Eat Lunch" })
    //   .then(res => console.log(res));

    //findOneandDelete
    // db.collection("Todos")
    //   .findOneAndDelete({ completed: false })
    //   .then(res => {
    //     console.log(res);
    //   });

    // client.close();
  }
);
