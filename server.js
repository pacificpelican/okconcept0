const express = require("express");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3011;
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

function postDataWildcard(
  db,
  table,
  tuple,
  objval,
  objkey = "description",
  newVal = "__"
) {
  console.log("trying to replace prop " + objkey);
  console.log("from " + objval + " to " + newVal);
  let collectionName = table;

  MongoClient.connect(mongoAddress, function(err, db) {
    // Get the documents collection
    let collection = db.collection(`${collectionName}`);
    let record = collection;

    collection.updateOne(
      { [objkey]: objval },
      { $set: { [objkey]: newVal } },
      function(err, result) {
        // assert.equal(err, null);
        // assert.equal(1, result.result.n);
        console.log("Updated the document");
        console.log(result);
      }
    );

    // if (
    //   typeof record[`${objkey}`] !== "undefined" &&
    //   record[`${objkeyg}`] !== null
    // ) {
    //   console.log("0 levels deep in object; key: " + objkey);
    //   //  record[`${objkeyString}`] = newVal;
    //   collection.updateOne(
    //     { [objkey]: objval },
    //     { $set: { [objkey]: newVal } },
    //     function(err, result) {
    //       // assert.equal(err, null);
    //       // assert.equal(1, result.result.n);
    //       console.log("Updated the document");
    //       console.log(result);
    //     }
    //   );
    // } else {
    //   console.log(
    //     "object is more than 1 level deep in object: currently only updates top level properties"
    //   );
    //   console.log(record);

    //   Object.keys(record).forEach(function(item) {
    //     console.log(item); // key
    //     console.log(record[item]); // value
    //   });
    // }
  });
}

function deleteDataWildcard(
  db,
  table,
  tuple,
  objval,
  objkey = "description",
  newVal = "__"
) {
  //  the last 3 parameters can be null
  console.log(table, tuple);
  let collectionName = table;
  console.log("to delete: " + tuple);
  console.log("from " + table);
  MongoClient.connect(mongoAddress, function(err, db) {
    let collection = db.collection(`${collectionName}`);
    console.log(collection);
    collection.deleteOne({ locator: parseInt(tuple) }, function(err, result) {
      console.log("Updated the document - deleted");
    });
  });
  console.log("record removed (💣🤷)");
}

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
        .find({ locator: { $eq: parseInt(req.params.tuple) } })
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
            "result of query for: " + req.params.db + " | " + req.params.obj
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
      console.log("data that should have been added " + req.params.newdata);
    }
  );

  server.post(
    "/api/1/updatedata/db/:db/object/:obj/objprop/:objprop/objkey/:objkey/newval/:newval/tuple/:tuple",
    (req, res) => {
      console.log("running update POST route");
      console.log("obj: " + req.params.obj);

      postDataWildcard(
        req.params.db,
        req.params.obj,
        req.params.tuple,
        req.params.objprop,
        req.params.objkey,
        req.params.newval
      );
      res.send(Object.assign({}, { Response: "ok - POST update" }));
    }
  );

  server.post(
    "/api/1/deletedata/db/:db/object/:obj/tuple/:tuple",
    (req, res) => {
      console.log("running (simple) delete POST route");
      console.log("obj: " + req.params.obj);

      deleteDataWildcard(
        req.params.db,
        req.params.obj,
        req.params.tuple,
        null,
        null,
        null
      ); //  the last 3 parameters can be null
      res.send(Object.assign({}, { Response: "ok - POST update (remove)" }));
    }
  );

  server.post(
    "/api/1/saveobjectdatashallow/db/:db/obj/:obj/newdata/:newdata",
    (req, res) => {
      MongoClient.connect(mongoAddress, function(err, db) {
        if (err) {
          console.log(err);
          throw err;
        } else {
          console.log("about to add tuple");
          console.log(req.params.newdata);
          let serverObject = JSON.parse(req.params.newdata);
          //  serverObject = JSON.parse(serverObject);
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
