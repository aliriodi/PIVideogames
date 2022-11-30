//import axios from 'axios';
require("dotenv").config();
//console.log(process.env.API_TOKEN);
// Recuerden inicializar la variable de idProduct.

// Aca deben declarar las variables donde tengan el action types.
//Esten atentos a que los nombres de las variables coincidan.
export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_DOG_DETAIL = "GET_DOG_DETAIL";
export const CREATE_DOG = "CREATE_DOG";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const MOVE_PAGE = "MOVE_PAGE";
export const POST_CREATE_TEMP="POST_CREATE_TEMP";
 
// Fijarse que la sintaxis de nuestra Action creator es distinta a lo que venimos haciendo. Esto es
// debido al uso del middleware "thunk", el cual nos permite trabajar con acciones asincrónicas.
// Necesitamos hacer uso de este middleware ya que nuestras peticiones al back siempre son asincrónicas,
// por lo tanto, necesitamos ese "delay" para despachar nuestra action hasta que la data nos llegue.
// Vas a tener que usar la funcion "dispatch" recibida en la funcion interna para despachar la action que
// va a llegar a nuestro reducer.
// Acá pueden ver un poco mejor la explicación y algunos ejemplos: https://github.com/reduxjs/redux-thunk

export const getAllDogs = () => {
  return async function (dispatch) {
    // Aca debes hacer la petición a la ruta del back http://localhost:3001/products
    // Pueden hacer la peticion con fetch o axios (documentación de axios: https://axios-http.com/docs/example)
    // Aclaración: todas las peticiones al back son asíncronas.
    //+process.env.API_TOKEN

    return fetch("https://api.thedogapi.com/v1/breeds?api_key="+process.env.API_TOKEN)
    .then((response) => response.json())
   .then((json) => {
        return  {json1: json[json.length - 1].id,
             json: json}})
      .then((salida)=> fetch('http://localhost:3001/dogs')
                       .then((response) => response.json())
                       .then((json)=>{
                                     return  {json1:salida.json1,
                                       jsond1:salida.json,
                                       json2:(json[0]!==undefined)?json[json.length - 1].id:null,
                                       jsond2:(json[0]!==undefined)? json : null }})
      .then((objmaster)=> { if(objmaster.jsond2) {for(let i=0;i<objmaster.jsond2.length;i++)
                            {objmaster.jsond2[i].id +=objmaster.json1;
                              objmaster.jsond1.push(objmaster.jsond2[i])}
                            }
                          // console.log(objmaster.json1)
                          // console.log(objmaster.json2)
                          // console.log(objmaster.jsond1)
                          // console.log(objmaster.jsond2) 
                          return objmaster.jsond1
                        } ))
        //.then((json)=>console.log(json))                
                        .then((json) =>  dispatch({type: GET_ALL_DOGS,payload: json}))
                      
  };
};

export const getDogDetail = (name) => {
  return async (dispatch) => {
    // Aca debes hacer la petición a la ruta del back http://localhost:3001/products/:id
    return   fetch("https://api.thedogapi.com/v1/breeds/search?q="+name)
    /*axios({
      method: 'get',
      url: 'http://localhost:3001/dogs/'+id,
      responseType: 'json'
    })*/ 
    .then((response) => response.json())
    .then((json) => {dispatch({type: GET_DOG_DETAIL,payload: json});
    });
  };
};

// Desde el componente correspondiente ejecutamos esta action creator, pasandole por params las values que vamos a usar para

//Alirio
//observando el db.json se observan que los idProduct van desde 
// idProduct = [1,2,3,4,5] por eso inicializamos en 5 para cuando se 
//incremente el idProduct no se pise el producto

//let idProduct = 0; 
export const CreateDog =  (values) => {
  //idProduct++;
   return {
    type: CREATE_DOG,
    payload: values,
  };
};

 export const deleteProduct = (id) => {
  return {
    type: DELETE_PRODUCT,
    payload: id,
  };
};


export const movepage = (pagination) => {
  return {
  type: MOVE_PAGE,
  payload: pagination, 
};
};
export const CreateTemp = () => {
  return async function (dispatch) {

    return fetch("https://api.thedogapi.com/v1/breeds?api_key="+process.env.API_TOKEN,{})
      .then((response) => response.json())
      .then((json) => { dispatch({type: POST_CREATE_TEMP,payload: json,});
      });
  };
};