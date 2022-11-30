const { Router } = require('express');
const router = Router();
const { dbGenres , dbPlatforms,stToObj, videogamesAPI} = require('./controllers');
const {Genres, Videogame, Platforms, videogamegenres}=require('../db');
require("dotenv").config(); 
const webplat=process.env.WEB_PLATFORMS+process.env.API_TOKEN;
let arrayResultsV = [];
let arrayResultsVwQ=[];
/** GET /genres:  */
router.get('/genres', async(req, res) => {
    try {
        await dbGenres();
        let genres = await Genres.findAll();
        genres.length ? 
            res.json(genres) :
            res.send("No se encuentran generos");
    } catch(error) {
        console.log(error);
    }
});
/** GET /platforms: */
router.get('/platforms', async(req, res) => {
    try { 
        for (i=0;i<6;i++){ 
            let webplat1;
            if(i===0){webplat1 = webplat;}
            else{webplat1 = webplat+'&page='+ i }
            if(i!==1){await dbPlatforms(webplat1);
                      console.log(webplat1)}
        } 
        await dbPlatforms();
        let platforms = await Platforms.findAll();
        platforms.length ? 
            res.json(platforms) :
            res.send("No se encuentran plataformas");
    } catch(error) {
        console.log(error);
    }
});

/** GET /videogames:             */
/**GET  /videogames?name="...":  */
router.get('/videogames', async(req, res) => {
    let gamegenres;
    let idmaxV = 0;
    if(req.query.name){
        const name = req.query.name.slice(1).slice(0, -1);
        arrayResultsVwQ = arrayResultsV.filter(game => game.name.toLowerCase().includes(name.toLowerCase()))
        arrayResultsVwQ.length>15?arrayResultsVwQ=arrayResultsVwQ.slice(0,15):arrayResultsVwQ;
        res.json({count:arrayResultsVwQ.length,
            next:null,
            previous:null,
             results:arrayResultsVwQ});
        } 
else  {    
     try { 
        /**              */
       if(arrayResultsV.length===0)
       { let result1L = 0;
        for(let i=0;i<6;i++){
            let webplat1;
            if(i===0){webplat1 = webplat;}
            else{webplat1 = webplat+'&page='+ i } 
            if(i!==1){
             const result1 = await videogamesAPI(webplat1);
             arrayResultsV =  arrayResultsV.concat(await result1)
            result1L =  result1L + await result1.length;
             console.log( arrayResultsV.length);
                          
        }} }
        /**/
         arrayResultsV.forEach(element => element.id>idmaxV? idmaxV=element.id:null)
          
        /** */
        let videogames = await Videogame.findAll();
        if(videogames.length) {let output=[]; 
            for(let i=0;i<videogames.length;i++){let arrGen =[];
                let arrPlat=videogames[i].platforms.split(',');
                 gamegenres = await videogamegenres.findAll({  where: {
                    videogameId:videogames[i].id,
                  }});
                  for(let j =0; j<gamegenres.length;j++){
                    if(gamegenres[j].videogameId===videogames[i].id){
                    arrGen.push(gamegenres[j].genreId);}
                  }
                               
             output[i]={ id:videogames[i].id+idmaxV,
                         name:videogames[i].name,
                         rating:videogames[i].rating,
                         background_image:videogames[i].image,
                         platforms: await stToObj(arrPlat,Platforms,'platform'),
                         genres: await stToObj(arrGen,Genres,'genres')
                          }   
            }
             if(arrayResultsV.length-gamegenres.length===100){}
            else if (arrayResultsV.length-gamegenres.length<100){  arrayResultsV=arrayResultsV.concat( output)}
            res.json({count:arrayResultsV.length,
                                   next:null,
                                   previous:null,
                                   results:arrayResultsV}) }
         } catch(error) {
        console.log(error);
    } }
});

/**GET /videogame/:{idVideogame}  */
router.get('/videogames/:id', async(req, res) => {
    try {
        const id=req.params.id;
        let videogameDet=[];
        arrayResultsV.forEach(element => element.id == id? videogameDet.push(element):null )
        videogameDet.length? 
            res.status(200).json(videogameDet[0]):
            res.status(404).send("No se encuentran videogames o el id no es un numero"); 
    
} catch(error) {
        console.log(error);
    }
});
module.exports = router;