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

export default (req, res) => {



  const { db } = req.query;


    res.status(200).json([{"response": "200"}]);

}