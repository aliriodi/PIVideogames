const { Router } = require('express');
const router = Router();
const { dbGenres } = require('./controllers');
const {Genres}=require('../db');

/** GET /genres:  */
router.get('/genres', async(req, res) => {
    try {
        await dbGenres();
        let genres = await Genres.findAll();
        genres.length ? 
            res.status(200).json(genres) :
            res.status(404).send("No se encuentran generos");
    } catch(error) {
        console.log(error);
    }
});
/** GET /videogames:  */
/**GET /videogames?name="...":  */
/**GET /videogame/{idVideogame}:  */
module.exports = router;