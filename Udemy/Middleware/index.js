const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('tiny'));

// 사용자 미들웨어 만들기
app.use((req, res, next)=>{
    // GET을 제외한 요청을 보내면 GET으로 바꿈
    // req.method = 'GET';
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
});

app.use('/dogs', (req,res,next)=>{
    console.log('');
    next();
})

const verifyPassword = ((req,res,next)=>{
    const { password } = req.query;
    if(password === 'chickennugget'){
        next();
    }
    // res.send('SORRY YOU NEED A PASSWORD!!');
    throw new Error('Password required!');
})

// app.use((req, res, next)=>{
//     console.log('THIS IS MY FIRST MIDDLEWARE!!!');
//     next();
// });

// app.use((req, res, next)=>{
//     console.log('THIS IS MY SECOND MIDDLEWARE!!!');
//     next();
// });

app.get('/', (req,res)=>{
    console.log(`Request Time : ${req.requestTime}`);
    res.send('Home Page!');
});

app.get('/dogs', (req,res)=>{
    console.log(`Request Time : ${req.requestTime}`);
    res.send('WOOF WOOF!');
});

app.get('/secret', verifyPassword, (req,res)=>{
    res.send('MY SECRET IS : Somtimes i wear headphones in public so i dont to talk anyone');
})

app.use((req,res)=>{
    res.status(404).res.send('NOT FOUND!');
});

app.use((err, req, res, next) =>{
    console.log("************************");
    console.log("**********ERROR**********");
    console.log("************************");
})

app.listen(3000, ()=>{
    console.log('App is running on Port 3000');
});