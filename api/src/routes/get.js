const { Router } = require('express');
const router = Router();
const { OP } = require ('sequelize');
const { dbGenres , dbPlatforms,stToObj} = require('./controllers');
const {Genres, Videogame, Platforms}=require('../db');
require("dotenv").config(); 
const webgen=process.env.WEB_GENRES+process.env.API_TOKEN;
const webplat=process.env.WEB_PLATFORMS+process.env.API_TOKEN;
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
/** GET /platforms: */
router.get('/platforms', async(req, res) => {
    try { 
        for (i=0;i<5;i++){ 
            let webplat1;
            if(i===0){webplat1 = webplat;}
            else{webplat1 = webplat+'page'+i++ }
            await dbPlatforms(webplat1);
        } 
        await dbPlatforms();
        let platforms = await Platforms.findAll();
        platforms.length ? 
            res.status(200).json(platforms) :
            res.status(404).send("No se encuentran plataformas");
    } catch(error) {
        console.log(error);
    }
});

/** GET /videogames:  */
router.get('/videogames', async(req, res) => {
    try {
        let videogames = await Videogame.findAll();
        if(videogames.length) {let output={}; 
            for(let i=0;i<videogames.length;i++){
                let arrPlat=videogames[i].platforms.split(',');
                
                const objetoP = await stToObj(arrPlat,Platforms,'platform');
                //  let objPlat = {};

                // for(let j=0;j<arrPlat.length;j++){
                //     let namep = await Platforms.findAll(
                //         {  where: {
                //             id:arrPlat[j],
                //           }})
                //    objPlat[j]={platform:{id:arrPlat[j],
                //                          name:namep[0].name}}
                // }
               // alert(objetoP);
             output[i]={ id:videogames[i].id,
                         name:videogames[i].name,
                         rating:videogames[i].rating,
                         background_image:videogames[i].image,
                         platforms: await stToObj(arrPlat,Platforms,'platform')/*objPlat*/,
                         genres: await stToObj(arrGen,Genres,'genre')
                          }  
            }
             res.status(200).json({count:videogames.length,
                                   next:null,
                                   previous:null,
                                   results:output}) }
            res.status(404).send("No se encuentran videogames");
    } catch(error) {
        console.log(error);
    }
});
/**GET /videogames?name="...":  */

/**GET /videogame/{idVideogame}:  */
router.get('/videogames/:id', async(req, res) => {
    try {
        const id=req.params.id;
        let videogameDet = await Videogame.findAll(
        {  where: {
            idv:id,
          }}
        );
        if(videogameDet.length){ let platformFormat={};
                                 let arrplats = videogameDet[0].platforms.split(',')
            for(let i=0;i<arrplats.length;i++)
            {
                let namep = await Platforms.findAll(
                {  where: {
                    id:arrplats[i],
                  }})
         
                platformFormat[i] ={platform: 
                     {id:arrplats[i], 
                     name:namep[0].name}}}
 
             res.status(200).json({id:videogameDet[0].idv,
                                   name:videogameDet[0].name,
                                   description:'<ul><li>'+videogameDet[0].description+'</li></ul>',
                                   released:videogameDet[0].releaseDate,
                                   background_image:videogameDet[0].image,
                                   rating:videogameDet[0].rating,
                                   platforms: platformFormat  
                                    })} else{
            res.status(404).send("No se encuentran videogames"); }
    } catch(error) {
        console.log(error);
    }
});
module.exports = router;