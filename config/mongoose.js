const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://raj:04jxFnDAdZh4uc29@cluster0.coznxd0.mongodb.net/?retryWrites=true&w=majority');

//accuire the connectiontion
const db = mongoose.connection;


//error
db.on('error', console.error.bind(console, 'error in connecting to db'));

//up and runnning
db.once('open', function() {
    console.log("successfully connected to the databasef");
});