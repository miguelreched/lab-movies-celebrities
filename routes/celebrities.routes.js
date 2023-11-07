const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
// .GET "/celebrities/create => mostrar formulario para crear celebridades
router.get("/create", async (req, res, next)=>{
    try{
        const response = await Celebrity.find()
        res.render("celebrities/new-celebrity.hbs", {
            allCelebrities: response

        })
    }
    catch(err){
        next(err)
    }
    
})
// .POST "/celebrities/create => recibir lo datos y crear celebridades
router.post("/create", async (req, res, next)=>{
    const {name, occupation, catchPhrase} = req.body

    try{
        await Celebrity.create({name, occupation, catchPhrase})
        res.redirect("/celebrities")
    }
    catch(err){
        next(err)
    }
})

// .GET "/celebrities" => mostrar lista celebrities creadas
router.get("/celebrities", async (req, res, next)=>{
    try{
        const response = await Celebrity.find()
        res.render("celebrities.hbs",{
            listCelebrities: response
        })
    }
    catch(err){
        next(err)
    }
})


module.exports = router;