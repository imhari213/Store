var mongoose = require('mongoose');
const url = "mongodb://localhost:27017/admin";

var _db;

module.exports = {

   connect : async function() {
    _db = await mongoose.connect(url, {
      useNewUrlParser: true
    }, (err, client) => {
      (err) ?
      console.log("error whiel connecting to DB"): console.log("connection successfull");
      return client;
    });
  },

  getDb : function() {
    return _db;
  }
};