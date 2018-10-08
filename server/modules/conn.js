var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;
var ObjectId = mongodb.ObjectID;

var url = "mongodb://localhost:27017/";

module.exports = function(callback){
    MongoClient.connect(url, function(err, database) {
        console.log("数据库成功!");
        callback(database, ObjectId);
    });
}