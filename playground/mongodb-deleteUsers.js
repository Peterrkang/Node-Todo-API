const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect(
  "mongodb://localhost:27017/TodoApp",
  (err, client) => {
    if (err) return console.log(`Unable to connect to MongoDB server`);
    console.log(`Connected to MongoDB server`);

    const db = client.db("TodoApp");

    // db.collection("Users")
    //   .deleteMany({ name: "peter" })
    //   .then(res => console.log(res));

    db.collection("Users")
      .deleteOne({ _id: new ObjectID("5b5fd658d1974cbfb8b4f676") })
      .then(res => console.log(res));
  }
);
