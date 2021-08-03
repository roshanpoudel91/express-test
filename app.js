/*
1) use "npm i -D nodemon" for constantly listening to server in development mode. Add following json inside script in package.json 
                                                                                        "start":"node app",
                                                                                        "dev":"nodemon app"
    RUN 'npm run dev' so that it will constantly listen.                                                                                    
2) use "npm init" to initialize the package.
3) use require('path') to get path of the current directory and join with the path of the file inside directory
4) If you have to use static path for folder "app.use(express.static(path.join(__dirname,'public')))"
5) Use "app.get('/api/',(req,res)=> res.json(members))"
6) Use model to get data from another file.
7) Use app.use(middleware name) for initiliaze middleware. use "next" in function and call inside it.
8) Use 'moment' package to play with date
9) Use ':id' to get id in routes and get as 'req.params.id' inside function.
10) Use 'app.json()' to return json data. app.send() to return normal data.
11) Use 'Object.filter()' to filter data
12) Use 'Object.some()' to find some value inside array, if found return true otherwise false
13) Use 'res.status(400).json({msg:'not found'}) to return error.
14) Make folder 'routes/api/:name of resource'. use router = express.Router() instead of app.
       app.use(':main path of resoure', require('path of external file'))

15) Use middlware "express.json()" to parse json
16) Use middleware "express.urlendcodeded" to parse url encoded   
17) Use express-handlebars package for template rendering on server.  
*/


const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const app = express();



const logger = require('./middleware/logger');

// init middleware
// app.use(logger);
app.get('/',(req, res) => res.render('index'));
// handlebars middleware
app.engine('handlebars',exphbs({defaultLayout: 'main'}));
app.set('view engine','handlebars');

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/members',require('./routes/api/members'));

//home page route

// app.get('/', (req, res) => {
//     // res.send('<h1>Hello world!df</h1>'); 

//      res.sendFile(path.join(__dirname,'public','index.html'));
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));