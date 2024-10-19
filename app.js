const express = require('express');
const app = express();
const studentRouter = require('./routers/studentRouter');

app.use(express.json());
app.use((req, res, next)=>{
    console.log("I am middleware 1!");
    next();
});

app.use((req, res, next)=>{
    console.log("I am middleware 2!");
    next();
});


app.use('/api/students', studentRouter);

app.get('/', (req, res, next)=>{
    res.send("Root");
    console.log("Another root response");
    //next();
})


app.get('/', (request, response)=>{
    console.log("I am get request middleware");
    response.send("hello from express js!");
});





const port = 3000;

app.listen(port, ()=>{
    console.log(`Listen on port port ${port}....`);
})