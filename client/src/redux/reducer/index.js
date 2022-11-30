// Importa las action types acá
import {  GET_ALL_DOGS, GET_DOG_DETAIL, CREATE_DOG,
    DELETE_PRODUCT, MOVE_PAGE, POST_CREATE_TEMP 
  } from "../actions";

const initialState = {
dogs: [],
dogDetail: {},
dogTemR: [], //Lectura de temperamentos
dogTempW:[], //Escritura de temperamentos
dogsOAsc: [], //Perros ordenados ascendente
dogsODesc:[], //Perros ordenados descendente

//Parametros paginacion iniciales
pagination:{idPageInit:1,
        idPageMax:22,
        idPageTo:1,
        idPageNow:1,
        idPagei:[1,2,3,4,22],
        iddirect:'',
         } 
};

const rootReducer = (state = initialState, action) => {
switch (
action.type
) {
case GET_ALL_DOGS:
return { ...state,
  dogs: action.payload, //solo actualizo esta prop}  
};
case GET_DOG_DETAIL:
return {
  ...state,
  dogDetail: action.payload, //solo actualizo esta prop
}
case CREATE_DOG:
return {
  ...state,
  dog: state.products.concat(action.payload), //solo actualizo esta prop
};
case DELETE_PRODUCT:
return {
  ...state,
  products: state.products.filter(({ id }) => id !== action.payload),
};
case MOVE_PAGE:
return { ...state,
  pagination: action.payload, //solo actualizo esta prop}  
};
case POST_CREATE_TEMP:
return { ...state,
  dogs: action.payload, //solo actualizo esta prop}  
};
default:
return state;
}
};
export default rootReducer;