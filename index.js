const express=require('express');       
const cookieParser = require('cookie-parser');
var expressLayouts = require('express-ejs-layouts');   
const port = 8003;


const db=require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoDBStore = require('connect-mongodb-session')(session);
// const MongoStore = require('connect-mongo')(session);

const passportGoogle=require('./config/passport-google-oauth2-strategy')

const app= express();
app.use(express.static('assets'));



app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());





// setup view engin
app.set('view engine', 'ejs');
app.set('views', './views');


app.use(session({
    name: 'issueTracker',
    secret:'#skey',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoDBStore({
        mongooseConnection: db,
        autoRemove: 'disable'
    },
    function(err){
        console.log(err || 'connect - mongodb setup ok');
    }
    )
}));


app.use(passport.initialize());
app.use(passport.session());
// app.use(expressLayouts);

app.use(passport.setAuthenticatedUser)

// extract style and script from subpages to layout
// app.set('layout extractStyles', true);
// app.set('layout extractScripts', true);
app.use('/', require('./routes'));

app.listen(port, function(err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port} `);
})