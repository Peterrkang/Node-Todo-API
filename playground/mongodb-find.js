const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect(
  "mongodb://localhost:27017/TodoApp",
  (err, client) => {
    if (err) return console.log(`Unable to connect to MongoDB Serer`, err);

    console.log(`Connected to MongoDB server`);

    const db = client.db("TodoApp");

    db.collection("Users")
      .find({ name: "peter" })
      .toArray()
      .then(
        docs => {
          console.log(JSON.stringify(docs, undefined, 2));
        },
        err => {
          if (err) console.log(`Unable to fetch user`);
        }
      );

    // db.collection("Todos")
    //   .find()
    //   .count()
    //   .then(
    //     count => {
    //       console.log(`Todos count: ${count} `);
    //     },
    //     err => {
    //       console.log(`unable to fetch todos`, err);
    //     }
    //   );

    // db.collection("Todos")
    //   .find({
    //     _id: new ObjectID("5b5ea9afa3e2651788f537e1")
    //   })
    //   .toArray()
    //   .then(
    //     docs => {
    //       console.log("Todos");
    //       console.log(JSON.stringify(docs, undefined, 2));
    //     },
    //     err => {
    //       console.log(`unable to fetch todos`, err);
    //     }
    //   );

    // client.close();
  }
);
