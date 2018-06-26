var mongoose = require('mongoose');
var config = require('./config');
// mongoose.connect("mongodb://guest:guest@ds037215.mlab.com:37215/kamal", { useMongoClient: true })
    process.env.PORT ? mongoose.connect("mongodb://guest:tamtamtools123@ds217131.mlab.com:17131/uilaution", { useMongoClient: true })
        : mongoose.connect(config.dbURL, { useMongoClient: true });
    module.exports = mongoose;