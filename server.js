const express = require("express");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

let mongoUrl;
let locatorScale = parseInt(1000000000);

let mongoName;

if (typeof process.env.MONGODB_URL === "undefined") {
  mongoUrl = "mongodb://localhost:27017/"; //  dev database server
  mongoName = "okconceptdevdb";
} else {
  mongoUrl = process.env.MONGODB_URL; //  production database server
  mongoName = "";
}

const mongoAddress = mongoUrl + mongoName;

const users_collection = "redwooddevcollection";
let subscriptions_collection = "okconceptdevcollection";

var MongoClient = require("mongodb").MongoClient;

MongoClient.connect(mongoAddress, function(err, db) {
  if (err) {
    console.log(err);
    throw err;
  }
  db.collection(subscriptions_collection)
    .find()
    .toArray(function(err, result) {
      if (err) {
        console.log(err);
      }
    });
});

let _id;

app.prepare().then(() => {
  const server = express();

  server.get("/a", (req, res) => {
    return app.render(req, res, "/a", req.query);
  });

  server.get("/b", (req, res) => {
    return app.render(req, res, "/b", req.query);
  });

  server.get("/posts/:id", (req, res) => {
    return app.render(req, res, "/posts", { id: req.params.id });
  });

  var apiDataDB1 = [{ data: "default" }];

  server.get("/api/1/getdbdata/db/:db/object/:obj/tuple/:tuple", function(
    req,
    res
  ) {
    MongoClient.connect(mongoAddress, function(err, db) {
      if (err) {
        console.log(err);
        throw err;
      }
      console.log("looking up data for tuple " + req.params.tuple);
      db.collection(req.params.obj)
        .find({ tuple: { $eq: req.params.tuple } })
        .toArray(function(err, result) {
          console.log(
            "result of query for: " +
              req.params.db +
              " | " +
              req.params.obj +
              " | " +
              req.params.tuple
          );
          console.log(result);
          res.send(result);
        });
    });
  });

  server.get("/api/1/getdbdata/db/:db/object/:obj", (req, res) => {
    MongoClient.connect(mongoAddress, function(err, db) {
      if (err) {
        console.log(err);
        throw err;
      }
      console.log("looking up data for table " + req.params.obj);
      db.collection(req.params.obj)
        .find()
        .toArray(function(err, result) {
          console.log(
            "result of query for: " +
              req.params.db +
              " | " +
              req.params.obj
          );
          console.log(result);
          res.send(result);
        });
    });
  });

  server.post(
    "/api/1/saveobjectdata/db/:db/obj/:obj/newdata/:newdata",
    (req, res) => {
      MongoClient.connect(mongoAddress, function(err, db) {
        if (err) {
          console.log(err);
          throw err;
        } else {
          console.log("about to add tuple");
          console.log(req.params.newdata);
          let serverObject = JSON.parse(req.params.newdata);
          serverObject = JSON.parse(serverObject);
          console.log(serverObject);

          let dbObject = Object.assign(serverObject, {
            locator: Math.floor(Math.random() * locatorScale + 1),
            created_at_time: Date.now()
          });

          console.log("tuple to save");
          console.log(dbObject);
          db.collection(req.params.obj).insertOne(dbObject);
        }
      });
      //console.error(err);
      console.log("data that should have been added " + req.params.newdata);
    }
  );

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
