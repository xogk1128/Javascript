const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
//const { campgroundSchema, reviewSchema} = require('./schemas')
//const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./Utils/ExpressError');
const methodOverride = require('method-override');


const campgrounds = require('./routes/campgrounds');
const reviews = require('./routes/reviews');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
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
// 라우트 설정
app.use('/campgrounds', campgrounds);
app.use('/campgrounds/:id/reviews', reviews);


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