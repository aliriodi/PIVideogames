export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const GET_VIDEOGAME_DETAIL = "GET_VIDEOGAME_DETAIL";
export const GET_GENRES = "GET_GENRES";
export const GET_PLATFORMS="GET_PLATFORMS";
export const CREATE_VIDEOGAME = "CREATE_VIDEOGAME";
export const MOVE_PAGE = "MOVE_PAGE";
export const POST_CREATE_VIDEOGAME="POST_CREATE_VIDEOGAME";
export const ORDER_VIDEOGAMES="ORDER_VIDEOGAMES";
export const GET_SEARCH_VIDEOGAME="GET_SEARCH_VIDEOGAME";

export const getAllVideogames = () => {
  return async function (dispatch) {
    return fetch("http://localhost:3001/videogames")
    .then((response) => response.json())
    .then((json) =>  dispatch({type: GET_ALL_VIDEOGAMES,payload: json}))
  };
};

export const getvideogameDetail = (ID) => {
  return async (dispatch) => {
    return   fetch("http://localhost:3001/videogames/"+ID)
    .then((response) => response.json())
    .then((json) => {dispatch({type: GET_VIDEOGAME_DETAIL,payload: json});
    });
  };
};

export const getGenres = () => {
  return async function (dispatch) {
    return fetch("http://localhost:3001/genres")
    .then((response) => response.json())
    .then((json) =>  dispatch({type: GET_GENRES,payload: json}))
  };
};

export const getPlatforms = () => {
  return async function (dispatch) {
    return fetch("http://localhost:3001/platforms")
    .then((response) => response.json())
    .then((json) =>  dispatch({type: GET_PLATFORMS,payload: json}))
  };
};

export const movepage = (pageNow) => {
  return {
  type: MOVE_PAGE,
  payload: pageNow, 
};
};

export const CreateVideogame =  (values) => {
    return {
    type: CREATE_VIDEOGAME,
    payload: values,
  };
};

export const order = (videogames) => {
  const videogamesOut = {count:videogames.length,
                         next:null,
                         previous:null,
                         results:videogames}
                        
  return {
    type: ORDER_VIDEOGAMES,
    payload: videogamesOut
  };
}

export const postCreateVideogame = (videogame) => {
  return async function (dispatch) {
    return fetch("http://localhost:3001/videogames",
                 {method: 'POST',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify(videogame)})
      .then((response) => response.json())
      .then((json) => { dispatch({type: POST_CREATE_VIDEOGAME,payload: json,});
      });
  };
};
export const  searchv = (vgame)=>{
  return async function (dispatch) {
    return   fetch("http://localhost:3001/videogames?name="+'"'+vgame+'"')
    .then((response) => response.json())
    .then((json) =>  dispatch({type: GET_SEARCH_VIDEOGAME,payload: json}))
  };
};