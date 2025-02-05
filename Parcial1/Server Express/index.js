const express = require('express'); // Import express   
const app = express(); // Initialize express    
const port = 3000; // Port where server will run

app.use('/',(req,res,next)=>{
    console.log("Peticion al servidor");
    next();
}, (req,res,next)=>{
    console.log("2da funcion middleware");
    next();
});

//middleware incorporado en express
app.use(express.json());
app.use(express.text());

app.get('/', (req, res) => { // Define a route
    res.sendFile(__dirname + '/index.html'); // Send HTML file
    }); 

app.post('/', (req, res) => {
    console.log(req.body);
    res.send('Hello world');
})

app.use((req,res,next)=>{
    res.status(404);
    res.send('Error 404');
});

app.listen(port, () => { // Start server
    console.log(`Server running at http://localhost:${port}`); // Log message
    });