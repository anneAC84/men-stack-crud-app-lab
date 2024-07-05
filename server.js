//imports
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const ejs = require('ejs')
const Films = require('./models/films.js')

//constants
const app = express()

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))

//routes

// Define routes here:
app.get('/', (req, res) => {
    res.render('index.ejs');
  });
  
  //films/new
  app.get('/films/new', (req, res) => {
    res.render('films/new.ejs');
});



// POST /films
app.post('/films', async (req, res) => {

   const createFilms = await Films.create(req.body);
    console.log(createFilms);
    res.redirect("/films/new");
  });

  // GET /films
  app.get("/films", async (req, res) => {
    const allFilms = await Films.find();
    res.render("films/index.ejs", { films: allFilms });
  });
  
  
  
  


  
//server connections
const connect = async () =>{
    try {
        //MongoDB connection
        //Express server connection
        await mongoose.connect(process.env.MONGODB_URI)
    app.listen(process.env.PORT, () => {
  console.log(`Server up and running on port${process.env.PORT}`)
})
    } catch (error) {
        console.log(error)
    }
}
console.log(process.env.PORT)
console.log(process.env.MONGODB_URI)

connect()