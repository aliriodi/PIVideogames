const { Router } = require('express');
const router = Router();
const { dbGenres , dbPlatforms,stToObj, videogamesAPI, gameDetail, stToArr} = require('./controllers');
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
            if(i!==1){await dbPlatforms(webplat1);}
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
                        
        }} }
        /**/
         arrayResultsV.forEach(element => element.id>idmaxV? idmaxV=element.id:null)
        /** */
        let videogames = await Videogame.findAll();
        if(videogames.length) { 
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
                         platforms: await stToArr(arrPlat,Platforms,'platform'),
                         genres: await stToArr(arrGen,Genres,'genres'),
                         from:"APIDB"
                          }   
            }}
             if(arrayResultsV.length-output.length===100){}
            else if (arrayResultsV.length-output.length<100){  arrayResultsV=arrayResultsV.concat( output)}
            let hash = {};
            arrayResultsV = arrayResultsV.filter(o => hash[o.name] ? false : hash[o.name] = true);
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
        let result2={}
        const id=req.params.id;
        let videogameDetObj={};
        let videogameDet=[];
        let platforms = '';  
                
        if(arrayResultsV.filter(videogame =>  videogame.id==id&&videogame.from=='APIDB').length)
       {
        result2=arrayResultsV.filter(videogame => videogame.id==id)[0];
        const description = await Videogame.findAll({  where: {
            name:result2.name,
          }});
          result2.description = description[0].description;
          result2.released = description[0].releaseDate;
        }
     else {webid ="https://api.rawg.io/api/games/"+id+"?key="+process.env.API_TOKEN;
         result2 =  await gameDetail(id)}  
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