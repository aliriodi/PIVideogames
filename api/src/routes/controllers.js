const { Genres, Platforms } = require('../db');

require("dotenv").config();
const webgen=process.env.WEB_GENRES+process.env.API_TOKEN;
//const webplat=process.env.WEB_PLATFORMS+process.env.API_TOKEN;

/**Para videogames */
const videogamesAPI = async(web) => {
    const apiUrl = await fetch(web)
    .then((response)=> response.json())
    .then (json =>  json.results);
    return apiUrl;
};

/* Para Genres Generos*/
const genresApi = async () => {
    const apiUrl = await fetch(webgen)
    .then((response) => response.json())
    .then(json => json.results.map(genres=>
                                   {return {name:genres.name}}));

    return apiUrl;
};

//Chequeo si esta los genres en la BD.
const dbGenres = async () => {
    let genres = await Genres.findAll();
    if(genres.length === 0) { 
       const arrGenres = await genresApi(); 
       await Genres.bulkCreate(arrGenres,{ignoreDuplicates: true});
    } 
};

/**Para Platforms Plataformas */

const platformsApi = async (webplat) => {
    const apiUrl = await fetch(webplat)
    .then((response) => response.json())
    .then((json) =>  json.results.map(arrayGames=>
                                       {let a=[];  console.log(arrayGames.platforms.length)
                                          for (const i in arrayGames.platforms) {
                                          a.push({idp: arrayGames.platforms[i].platform.id, name:arrayGames.platforms[i].platform.name})
                                                                                }
                                        return a; }                                  
                                        ))
                                   .then(result => {let i=0;let j=0;let b=[];
                                                    for(i=0;i<result.length;i++){
                                                       for(j=0;j<result[i].length;j++){
                                                       {b.push({idp:result[i][j].idp,
                                                        name:result[i][j].name})}
                                                        }} 
                                                         let hash = {};
                                                         b = b.filter(o => hash[o.idp] ? false : hash[o.idp] = true);
                                                   return b;
                                                    })
                                                    .catch(error => console.error('Error:', error))
                          
    return apiUrl;
};

//Chequeo si esta los platforms en la BD.
const dbPlatforms = async (webplat1) => {
    //Consulta a la base de datos para ver si tabla esta vacia.
   let platforms = await Platforms.findAll();
    if(platforms.length === 0) { 
        //Los traigo de la api.
                   
        const arrPlatforms = await platformsApi(webplat1); 
        //https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#creating-in-bulk
        await Platforms.bulkCreate(arrPlatforms);
       
    } 
};

/**Transformacion String to Object Double */
const stToObj = async (arrayTransf, Model,objectMain)=>{
    let objectOut = {};
       if(objectMain==='platform'){
                for(let j=0;j<arrayTransf.length;j++){
                    let namep = await Model.findAll(
                        {  where: {
                            id:arrayTransf[j],
                          }})
                          objectOut[j]={[objectMain]:{id:arrayTransf[j],
                                                 name:namep[0].name}}
                }
            }
           else if(objectMain==='genres')  {
              for(let j=0;j<arrayTransf.length;j++){
                let namep = await Model.findAll(
                    {  where: {
                        id:arrayTransf[j],
                      }})
                      objectOut[j]={id:arrayTransf[j],
                                    name:namep[0].name}
            }
            }
            else{objectOut={};}
                return objectOut;
};
/**Transformacion String to Array Double */
const stToArr = async (arrayTransf, Model,ArrMain)=>{
    let ArrOut = [];
       if(ArrMain==='platform'){
                for(let j=0;j<arrayTransf.length;j++){
                    let namep = await Model.findAll(
                        {  where: {
                            id:arrayTransf[j],
                          }})
                          ArrOut[j]={[ArrMain]:{id:arrayTransf[j],
                                                 name:namep[0].name}}
                }
            }
           else if(ArrMain==='genres')  {
              for(let j=0;j<arrayTransf.length;j++){
                let namep = await Model.findAll(
                    {  where: {
                        id:arrayTransf[j],
                      }})
                      ArrOut[j]={id:arrayTransf[j],
                                    name:namep[0].name}
            }
            }
            else{ArrOut=[];}
                return ArrOut;
};
/*Para Id */
const gameDetail = async (id) => {
    const apiUrl = await fetch("https://api.rawg.io/api/games/"+id+"?key="+process.env.API_TOKEN)
    .then((response) => response.json())
    .then(json => json);
   return apiUrl;
};
module.exports = { dbGenres , dbPlatforms,stToObj, videogamesAPI, gameDetail, stToArr};