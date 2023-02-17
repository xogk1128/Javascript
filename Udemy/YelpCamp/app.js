if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./Utils/ExpressError');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

const mongoSanitize = require('express-mongo-sanitize');


const userRoutes = require('./routes/users');
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');
const MongoDBStore = require('connect-mongo');


//const db_url = process.env.DB_URL;
const db_url = 'mongodb://127.0.0.1:27017/yelp-camp';
mongoose.set("strictQuery", false);

mongoose.connect(db_url, {
    useNewUrlParser : true,
    useUnifiedTopology : true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=>{
    console.log("Databasee connected");
});

const app = express();

app.engine('ejs', ejsMate);
// view 폴더 템플릿, ejs 사용
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// req.body 파싱하기
app.use(express.urlencoded({extended:true}));
// http status
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(mongoSanitize({replaceWith: '_'}));

const sessionConfig = {
    store :  MongoDBStore.create({ 
        mongoUrl: db_url,
        secret : 'thisshouldbeabettersecret!',
        touchAfter : 24 * 60 * 60
    }),
    name : 'session',
    secret : 'thisshouldbeabettersecret!',
    resave : false,
    saveUninitialized : true,
    cookie : {
        httpOnly : true,
        // secure : true,
        expires : Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge : 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// 라우트 설정
app.use('/', userRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);



app.get('/', (req, res)=>{
    res.render('home');
});

app.all('*', (req, res, next)=>{
    next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
    const {statusCode = 500, message = 'Something went wrong'} = err;
    if(!err.message) err.message = 'Oh no, Something went Wrong!';
    res.status(statusCode).render('error',{err});
});

app.listen(3000, ()=>{
    console.log('Serving on port 3000');
});  