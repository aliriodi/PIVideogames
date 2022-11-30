const { Router } = require('express');
const router = Router();
const { Videogame, videogamegenres}=require('../db');

router.post('/videogames', async(req, res) =>{
    
    const { idv,  name , image, description,  releaseDate, 
        rating,  platforms,genres } = req.body;
        try {
            const videogame = await Videogame.create({
              name,
              idv,
              image,
              description, 
              releaseDate, 
              rating, 
              platforms
              
            });
            
            
     }catch(error) {
                console.log(error);
            }

try{const Idvideogame = await Videogame.findAll(
    { where:{name} }
  ); 
  
  let Id= Idvideogame[0].dataValues.id;
  console.log(Id)
  
  let arrvideogamegen =  genres.split(',').map(element => objeto ={videogameId:Id,
                                                            genreId:element
                                                                  })
   console.log(arrvideogamegen)                                                               
const videogamegen = await videogamegenres.bulkCreate(arrvideogamegen);
res.json("VideoGame creado"); 
}catch(error) {
    console.log(error);
}

        });
module.exports = router;