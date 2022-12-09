import React , {useEffect} from 'react';
import { useDispatch, connect} from "react-redux";
import { useParams, Link  } from 'react-router-dom';
import { getvideogameDetail,getAllVideogames} from "../../redux/actions";


export  function VcardDetail({videogameDetail}) {
   const dispatch = useDispatch();
   const {id} = useParams();
    useEffect(() => {
      dispatch(getvideogameDetail(id));
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dispatch])
  useEffect(() => {
    dispatch(getAllVideogames());
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[dispatch])
   return (
    <div>
      <nav> <div className="logo2"></div>
       <ul className="navList2">
      <li className="navLi2"> <Link to='/home'>HOME </Link></li>
      <li className="navLi2"><Link to='/home/create'>CREAR VIDEOGAME </Link> </li> 
      </ul>
      </nav>  
           
        <h1> {videogameDetail.name}</h1>
        <img  className="imageDetail" src={videogameDetail.background_image}  alt={videogameDetail.name}/>
        <div><strong > Fecha de lanzamiento:</strong> {videogameDetail.released}</div>
        <div><strong>Rating: </strong>{videogameDetail.rating}</div>
        <div><strong>Plataformas:</strong> {videogameDetail.platforms}</div>
        <div><strong >Generos:</strong> {videogameDetail.genres}</div>
        <div><strong> Descripcion</strong></div>
        <div className='description'>
        <div  dangerouslySetInnerHTML={{__html: videogameDetail.description}} />
        </div>
       </div>
  )
}

export const mapStateToProps = (state) => {
    return { videogameDetail: state.videogameDetail
            };
  };
  export default connect(mapStateToProps, )(VcardDetail);