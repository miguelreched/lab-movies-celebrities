// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
// .GET "/movies/create" 
router.get("/create", async(req, res, next)=>{
    try{
    const response = await Movie.find()
    res.render("movies/new-movie.hbs", {
        newMovie: response
    })
    }
    catch(err){
        next(err)
    }
})

router.post("/create", async(req, res, next)=>{
    try{
    await Movie.create(req.body)
    res.redirect("/movies")
    }
    catch(err){
        next(err)
    }
})

module.exports = router;