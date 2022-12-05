const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { dbGenres , dbPlatforms,stToObj, videogamesAPI, gameDetail} = require('./controllers');
const {Genres, Videogame, Platforms, videogamegenres}=require('../db');
require("dotenv").config(); 
const webplat=process.env.WEB_PLATFORMS+process.env.API_TOKEN;
let arrayResultsV = [];
let arrayResultsVwQ=[];
let output=[];
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
else if(!req.query.name) {    
     try { 
        /**              */
        console.log('paciencia')
       if(arrayResultsV.length===0)
       { let result1L = 0; 
        console.log('entre al if')
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
          console.log('linea 75')
        /** */
        let videogames = await Videogame.findAll();
         console.log('linea 78')
         console.log(videogames.length)
        if(videogames.length) { console.log('linea 79')
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
                         genres: await stToObj(arrGen,Genres,'genres'),
                         from:"APIDB"
                          }   
            }}
            console.log('linea 97')
             if(arrayResultsV.length-output.length===100){}
            else if (arrayResultsV.length-output.length<100){  arrayResultsV=arrayResultsV.concat( output)}
            res.json({count:arrayResultsV.length,
                                   next:null,
                                   previous:null,
                                   results:arrayResultsV}) 
         } catch(error) {
        console.log(error);
    } }
});

/**GET /videogame/:{idVideogame}  */
router.get('/videogames/:id', async(req, res) => {
    try {
        const id=req.params.id;
        let videogameDetObj={};
        let videogameDet=[];
        const webid ="https://api.rawg.io/api/games/"+id+"?key="+process.env.API_TOKEN;
        const result2 =  await gameDetail(id)
        let platforms = '';           
                   for(let i=0;i< result2.platforms.length;i++){
                    if(i<result2.platforms.length-1){platforms+= result2.platforms[i].platform.name+', '}
                    else{platforms+= result2.platforms[i].platform.name}
                }
        videogameDetObj.name=  await result2.name;
        videogameDetObj.background_image= await result2.background_image;
        videogameDetObj.rating =await result2.rating;
        videogameDetObj.released =await result2.released;
        videogameDetObj.genres= await result2.genres.map((object) => ' '+object.name).toString();
        videogameDetObj.platforms= platforms;
        videogameDetObj.description= await result2.description;
        videogameDet.push(videogameDetObj)
      
        videogameDet.length?
            res.status(200).json(videogameDet[0])
           :
            res.status(404).send(videogameDet[0]={name:"Videojuego no existe"}); 
    
} catch(error) {
        console.log(error);
    }
});
module.exports = router;