var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient
const url = "mongodb://localhost:27017/"

const resData = {
  "errCode": 0,
  "errMsg": "success",
  "errName": "",
  "success": true,
}
/* GET users listing. */
router.get('/data', function (req, routerRes, next) {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
    if (err) {
      throw err
    }
    const dbase = db.db("code_race")
    dbase.collection('personnel').find({}).toArray((err, res) => {//返回集合中所有数据
      if (err) {
        throw err
      }
      // console.log(res)
      routerRes.send(JSON.stringify({
        ...resData,
        data: res
      }));
      db.close()
    })
  })
 
});

module.exports = router;
