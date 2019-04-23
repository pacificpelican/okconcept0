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

// let updateDocument = function(collectionName) {

//   MongoClient.connect(mongoAddress, function(err, db) {
//   // Get the documents collection
//   let collection = db.collection(`${collectionName}`);
//   // Update document where a is 2, set b equal to 1
//   collection.updateOne({ [objval] : objkey }
//     , { $set: { [objval] : newVal } }, function(err, result) {
//     assert.equal(err, null);
//     assert.equal(1, result.result.n);
//     console.log("Updated the document");
//     console.log(result);
//   });  
// }

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
    // Update document where a is 2, set b equal to 1
    collection.updateOne({ [objkey] : objval }
      , { $set: { [objkey] : newVal } }, function(err, result) {
      // assert.equal(err, null);
      // assert.equal(1, result.result.n);
      console.log("Updated the document");
      console.log(result);
    });  
  });
}
//   console.log(db, tuple, table);
//   console.log("collection to update: " + table);
//   let dbDirectory = __dirname + "/db/" + db + ".json";
//   console.log("loki dir: " + dbDirectory);
//   let db2 = new loki(dbDirectory);

//   db2.loadDatabase({}, () => {
//     let _collection = db2.getCollection(table);

//     if (!_collection) {
//       console.log(
//         "Collection %s does not exist. Aborting attempt to edit ",
//         table
//       );

//       throw new Error("ERROR: collection does not exist");
//     } else {
//       console.log(table + " collection exists");
//     }
//     console.log(_collection);

//     console.log(objval);
//     let objkeyString = objkey.toString();
//     let objvalString = objval.toString();

//     console.log(`${objkeyString}`);

//     let record;

//     console.log("tuple: " + tuple);

//     record = _collection.findObject({
//       locator: { $aeq: tuple },
//       [objkeyString]: { $contains: objvalString }
//     });

//     if (record === null) {
//       record = _collection.findObject({ locator: { $aeq: tuple } });
//     }

//     if (record === null) {
//       record = _collection.findObject({
//         [objkeyString]: { $contains: objvalString }
//       });
//     }

//     console.log(record);
//     console.log(newVal);

//     if (
//       typeof record[`${objkeyString}`] !== "undefined" &&
//       record[`${objkeyString}`] !== null
//     ) {
//       console.log("0 levels deep in object; key: " + objkeyString);
//       record[`${objkeyString}`] = newVal;
//     } else {
//       console.log("going 1 level deep in object");
//       console.log(record);

//       Object.keys(record).forEach(function(item) {
//         console.log(item); // key
//         console.log(record[item]); // value

//         if (
//           typeof record[item][`${objkeyString}`] !== "undefined" &&
//           record[item][`${objkeyString}`] !== null
//         ) {
//           console.log(
//             "1 levels deep in object; " + record[item][`${objkeyString}`]
//           );
//           record[item][`${objkeyString}`] = newVal;
//         } else {
//           console.log("going 2 levels deep in object");
//           console.log(record[item]);

//           Object.keys(record[item]).forEach(function(item2) {
//             console.log(item2); // key
//             console.log(record[item][item2]); // value

//             if (
//               typeof record[item][item2][`${objkeyString}`] !== "undefined" &&
//               record[item][item2][`${objkeyString}`] !== null
//             ) {
//               console.log(
//                 "2 levels deep in object;" +
//                   record[item][item2][`${objkeyString}`]
//               );
//               record[item][item2][`${objkeyString}`] = newVal;
//             } else {
//               console.log("going 3 levels deep in object");
//               console.log(record[item][item2]);

//               Object.keys(record[item][item2]).forEach(function(item3) {
//                 console.log(item3); // key
//                 console.log(record[item][item2][item3]); // value

//                 if (
//                   typeof record[item][item2][item3][`${objkeyString}`] !==
//                     "undefined" &&
//                   record[item][item2][item3][`${objkeyString}`] !== null
//                 ) {
//                   console.log(
//                     "3 levels deep in object;" +
//                       record[item][item2][item3][`${objkeyString}`]
//                   );
//                   record[item][item2][item3][`${objkeyString}`] = newVal;
//                 } else {
//                   console.log("object may require greater than 3 depth");
//                 }
//               });
//             }
//           });
//         }
//       });
//     }
//     _collection.update(record);

//     db2.saveDatabase();
//   });
// }

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

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
