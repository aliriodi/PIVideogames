import React , {useEffect, useState} from "react";
import { useDispatch,connect} from "react-redux";
import { Link } from 'react-router-dom';
import Pagination from "../Pagination/Pagination";
import Vcard from "../Vcard/Vcard";
import { movepage,getAllVideogames,order,getGenres, searchv } from "../../redux/actions";
import "./Nav.css";


 export  function Nav({videogames,genres, pagination,getAllVideogames}) {
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
   
      (function(){ return videogames.results.length===0?
      dispatch(order([{id:'0',name:'No existe videojuego',genres:[{name:[null]}]}])) 
      :videogames.results})();
      
       /* Ordenamiento con cb*/
   function order1 (typeorder){
    if(videogames.results && videogames.results.length>1){
             if(typeorder==='asc0'){
          dispatch(order(videogames.results.sort(function(a,b){return a.name.localeCompare(b.name,'en',{numeric:true})})))
            }
         if(typeorder==='desc0'){
          dispatch(order(videogames.results.sort(function(b,a){return a.name.localeCompare(b.name,'en',{numeric:true})})))
            }
         if(typeorder==='asc1'){
          dispatch(order(videogames.results.sort(function(b,a){return a.rating-b.rating})))
            }
        if(typeorder==='desc1'){
          dispatch(order(videogames.results.sort(function(a,b){return a.rating - b.rating})))
            }}
            else{return alert('No se requiere ordenar')}
    
              };

        function filter(filter0){
         
          let videogamesR =[];
          if(filter0!=='apiExt'&&filter0!=='apiBD'){
          videogames.results.map((videogame) => {videogame.genres.map((genreA)=> genreA.name===filter0 ?videogamesR.push(videogame):false)})
          }
          else if(filter0==='apiExt'){
            videogames.results.map(videogame=> !videogame.hasOwnProperty('from')? videogamesR.push(videogame): null)   
          }
          else if (filter0==='apiBD'){
            videogames.results.map(videogame=> videogame.hasOwnProperty('from')? videogamesR.push(videogame): null)  
          }
          else {videogamesR=videogames}
          console.log(filter0)
          dispatch(movepage({idPageNow:1}));
          dispatch(order(videogamesR));
        }

     
     return (
        <div ><nav >
    <div className="logo">
    
    </div>
      <ul className="navList"> 
      <li key='li0' className="navLi">
      <select className={'stl.hpfilter'} onChange={e => {filter(e.target.value)}}>
                                <option key='nulo' value={null}>==Filtros Genres== </option>
                    {genres.sort(function(a,b){return a.name.localeCompare(b.name,'en',{numeric:true})}).map(e => {
                         return <option key={e.name} value={e.name} >{e.name}</option>
                    })}      
                  </select>
      </li>
       <li key='li1' className="navLi">
       <select className={'navLi'} onChange={e => {filter(e.target.value)}}>
                                <option key='API' value={null}>==Filtros API== </option>
                                <option key='APIEXT' value={'apiExt'}> API EXT </option>
                                <option key='APIBD' value={'apiBD'}> API LOCAL </option> 
                  </select>
      </li> 
      
      <li key='li2' className="navLi"><Link to='/home'>HOME </Link></li>
      <li key='li3' className="navLi"><Link to='/home/create'>CREAR VIDEOGAME </Link> </li>
      <li key='li4' className="navLi">
      <form key='f0' onSubmit={(e) => {
      e.preventDefault();
      dispatch(movepage({idPageNow:1})); dispatch(searchv(searchInput)) 
      }}> 
      
      <input
        type="text"
        placeholder="VideoGame..."
        value={searchInput}
        onChange={e => setSearchInput(e.target.value) } />
      <input type="submit" value="Search" />
      
    </form> 
        </li>
      </ul>
       </nav>
       <div className="pagination2">
        <ul className="navList">
        <li  className="navLi">
      <select className={'navLi'} onChange={e => {order1(e.target.value)}}>
                                <option key='order1' value={null}>==Ordenamiento== </option>
                                <option key='asc0' value={'asc0'}> Asc. Nombre </option>
                                <option key='desc0' value={'desc0'}> Desc. Nombre </option> 
                                <option key='asc1' value={'asc1'}> Asc. Rating </option>
                                <option key='desc1' value={'desc1'}> Desc. Rating </option> 
                  </select>
     </li>
         <li className="navLi"><button className= {'reset'} 
        onClick={()=>dispatch(getAllVideogames())}>
          Reset
          </button></li>
         <li className="navLi"><Pagination /> </li>
       </ul>
         
          </div>
          
     <div className="flex-container">
     
      
      {videogames.results &&  videogames.results.slice(15*(pagination.idPageNow-1),
      15*(pagination.idPageNow)).map(video=>{
                return ( <Vcard 
                    key={video.name}
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
        genres: state.genres
    }; };

  function mapDispatchToProps(dispatch) {
    return {
       movepage: (number) => dispatch(movepage(number)),
       getAllVideogames: () => dispatch(getAllVideogames),
       getGenres: () => dispatch(getGenres)
          };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Nav);