
import {  GET_ALL_VIDEOGAMES,  GET_VIDEOGAME_DETAIL,GET_GENRES,
          CREATE_VIDEOGAME, MOVE_PAGE, POST_CREATE_VIDEOGAME,
          GET_PLATFORMS, ORDER_VIDEOGAMES,  GET_SEARCH_VIDEOGAME
  } from "../actions";

const initialState = {
videogames: [],
videogameDetail: {},
genres: [], //generos
platforms:[], //plataformas
pagination:{idPageNow:1},
newVideogame:{}
};

const rootReducer = (state = initialState, action) => {
switch (
action.type
) {
case GET_ALL_VIDEOGAMES:
return { ...state,
  videogames: action.payload, //TOMAR VIDEOGAMES  
};
case ORDER_VIDEOGAMES:
return { ...state,
  videogames: action.payload, //Orderna los videogames 
};
case GET_SEARCH_VIDEOGAME:
  return {
    ...state,
    videogames: action.payload,
  };
case GET_VIDEOGAME_DETAIL:
return {
  ...state,
  videogameDetail: action.payload, //DETALLE DE PLATAFORMA
};
case GET_GENRES:
return { ...state,
  genres: action.payload, // GENEROS  
};
case GET_PLATFORMS:
return { ...state,
  platforms: action.payload, // PLATFORMS
};
case CREATE_VIDEOGAME:
return {
  ...state,
  videogames: state.videogames.concat(action.payload), 
};
case MOVE_PAGE:
return { ...state,
  pagination: action.payload, //solo actualizo esta prop}  
};
case POST_CREATE_VIDEOGAME:
return { ...state,
  newVideogame: action.payload, //solo actualizo esta prop}  
};
default:
return state;
}
};
export default rootReducer;