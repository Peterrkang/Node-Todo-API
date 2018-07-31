// const MongoClient = require("mongodb").MongoClient;
const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect(
  "mongodb://localhost:27017/TodoApp",
  (err, client) => {
    if (err) return console.log(`Unable to connect to MongoDB Serer`, err);

    console.log(`Connected to MongoDB server`);

    //client has to still access db
    // const db = client.db("TodoApp");
    //insert to Todos collection
    // db.collection("Todos").insertOne(
    //   {
    //     text: `Something to do`,
    //     completed: false
    //   },
    //   (err, res) => {
    //     if (err) return console.log(`Unable to insert todo`, err);

    //     console.log(JSON.stringify(res.ops, undefined, 2));
    //   }
    // );

    // db.collection("Users").insertOne(
    //   {
    //     name: "peter",
    //     age: 25,
    //     location: "Thousand Oaks, CA"
    //   },
    //   (err, res) => {
    //     if (err) return console.log(`Unable to insert User`, err);
    //     console.log(JSON.stringify(res.ops, undefined, 2));
    //   }
    // );

    client.close();
  }
);
