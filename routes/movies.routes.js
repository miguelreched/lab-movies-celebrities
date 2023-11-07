// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const Movie = require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model")
const router = require("express").Router();

// all your routes here

router.get("/", async (req, res, next)=>{
    try{
        const response = await Movie.find()
    res.render("movies/movies.hbs", {
        newMovie: response
    })
    }
    catch(err){

    }
})

// .GET "/movies/create" 
router.get("/create", async(req, res, next)=>{
    try{
    const response = await Celebrity.find()
    res.render("movies/new-movie.hbs",{
        allCelebrities: response
    })
    }
    catch(err){
        next(err)
    }
})
//POST "/movies/create" 
router.post("/create",(req, res, next)=>{
    
     Movie.create({
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast

    })
    .then(()=>{
        res.redirect("/movies")
    })
    
    .catch((err)=>{
        next(err)
    })
})

// .GET "/movies/:id"
router.get("/:id", async(req,res,next)=>{
    try{
      const response = await Movie.findById(req.params.id).populate("cast")
      res.render("movies/movie-details.hbs", {
        specificMovie : response
      })
    }
    catch(err){
        next(err)
    }

})
//. POST "/movies/:id/delete"
router.post("/:id/delete", (req,res,next)=>{
    Movie.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.redirect("/movies")
    })
    .catch((err)=>{
        next(err)
    })
})

// .GET "/movies/:id/edit"
router.get("/:id/edit", (req,res,next)=>{
    Movie.findById(req.params.id)
    Celebrity.find()
    res.render("movies/edit-movie.hbs", {
        allCelebrities, editMovie

    })
})

// NO ME DA PARA MÁS LA CABEZA. NO SE POR QUÉ MOTIVO NO ME SALE NI EL BOTON UPDAT, CREO QUE ES FALLO DE LA DIRECCION, PERO ME ESTALLA LA CABEZA Y ME RINDO AQUÍ

// .POST "/movies/:id/edit"
router.post("/:id/edit", async(req, res, next)=>{   
    try{
    const response = await Movie.findByIdAndUpdate(req.params.id, {
     title: req.body.title,
     genre: req.body.genre,
     plot: req.body.plot,
     cast: req.body.cast
    })
    res.redirect(`/movies`)

    } catch(err){
        next(err)
    }
   
})

module.exports = router;