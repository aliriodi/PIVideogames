import React , {useEffect, useState} from "react";
import { useDispatch,connect} from "react-redux";
import { Link } from 'react-router-dom';
import Pagination from "../Pagination/Pagination";
import Vcard from "../Vcard/Vcard";
import { movepage,getAllVideogames,getPlatforms,getGenres, searchv } from "../../redux/actions";
import "./Nav.css";

 export  function Nav({videogames, pagination,getAllVideogames}) {
  const [searchInput, setSearchInput] = useState("");  
  const dispatch = useDispatch();
    useEffect (() => { 
        dispatch(getGenres()); 
       // eslint-disable-next-line react-hooks/exhaustive-deps
        },[dispatch]);
        useEffect (() => { 
          dispatch(getAllVideogames()); 
         // eslint-disable-next-line react-hooks/exhaustive-deps
          },[dispatch]);    

    useEffect (() => { dispatch(getPlatforms()); 
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[dispatch]);
      
        return (
        <div ><nav >
<div className="logo">NavBar</div>
   
      <ul className="navList">
      <li className="navLi"><Link to='/home'>HOME </Link></li>
      <li className="navLi">Crear Videojuegos </li>

      <li className="navLi">
      <form onSubmit={(e) => {
      e.preventDefault();
      if(!videogames.results.filter(property => property.name.toLowerCase().includes(searchInput.toLowerCase())).length)
      { alert('Videojuego no existe Intente nuevamente') }
      else{ dispatch(searchv(searchInput)) }
      }}> 
      
      <input
        type="text"
        placeholder="Videojuego..."
        value={searchInput}
        onChange={e => setSearchInput(e.target.value) } />
      <input type="submit" value="Search" />
    </form> 
        </li>
      </ul>
      </nav>
     <div className="pagination" > <Pagination /> </div> 
                     
     <div className="flex-container">
      { window.location.href==="http://localhost:3000/home" &&videogames.results && videogames.results.slice(15*(pagination.idPageNow-1),
      15*(pagination.idPageNow)).map(video=>{
        return ( <Vcard 
                    key={video.id}
                    id={video.id}
                    name={video.name}
                    image={video.background_image}
                    genres={video.genres}
                    />           
        ); }) }
         </div>
      </div>
    );
};

const mapStateToProps = (state) => {
    return {
        videogames: state.videogames,
        pagination: state.pagination,
    }; };

  function mapDispatchToProps(dispatch) {
    return {
       movepage: (number) => dispatch(movepage(number)),
       getAllVideogames: () => dispatch(getAllVideogames)
          };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Nav);