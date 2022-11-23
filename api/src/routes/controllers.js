const { Genres } = require('../db');
require("dotenv").config();
const web=process.env.WEB_GENRES+process.env.API_TOKEN;
 
const genresApi = async () => {
    const apiUrl = await fetch(web)
    .then((response) => response.json())
    .then(json => json.results.map(genres=>
                                   {return {idg:genres.id,
                                            name:genres.name,}}));
    // const apiInfo = await apiUrl.data.results.map( (genres) => {
    //     return { s
    //          };
    //         name: genre
    // });
    return apiUrl;
};

//Chequeo si esta los genres en la BD.
const dbGenres = async () => {
    //Consulta a la base de datos.
    let genres = await Genres.findAll();
    if(genres.length === 0) { 
        //Los traigo de la api.
        const arrGenres = await genresApi();
        //https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#creating-in-bulk
        await Genres.bulkCreate(arrGenres,{ignoreDuplicates: true});
    } 
};

module.exports = { dbGenres };