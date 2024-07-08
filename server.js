//imports
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')
const Films = require('./models/films.js')
const methodOverride = require("method-override");
const morgan = require('morgan')

//constants
const app = express()

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
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
    res.redirect("/films");
  });

  // GET /films index
  app.get("/films", async (req, res) => {
    const allFilms = await Films.find();
    res.render("films/index.ejs", { films: allFilms });
  });
  
  
  //show films
  app.get("/films/:filmsId", async (req, res) => {
    const foundFilms = await Films.findById(req.params.filmsId);
    res.render('films/show.ejs', { films: foundFilms});
});

app.delete("/films/:filmsId", async (req, res) => {
    await Films.findByIdAndDelete(req.params.filmsId)
    
    res.redirect('/films');
  });
  
  
  // GET localhost:3000/fruits/:fruitId/edit
app.get("/films/:filmsId/edit", async (req, res) => {
    const foundFilms = await Films.findById(req.params.filmsId);
     res.render('films/edit.ejs',{ 
        films: foundFilms,
  });
});
  

// server.js

app.put("/films/:filmsId", async (req, res) => {
    
    // Update the fruit in the database
    await Films.findByIdAndUpdate(req.params.filmsId, req.body);
  
    // Redirect to the fruit's show page to see the updates
    res.redirect(`/films/${req.params.filmsId}`);
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