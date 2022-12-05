import React,  { useEffect } from 'react';
import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux'; 
import {getAllVideogames ,getGenres ,getPlatforms} from '../../redux/actions'
import "./Landing.css"

export default function Landing() {
  const dispatch = useDispatch();
  useEffect (() => { 
  dispatch(getGenres()); // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dispatch]);
  useEffect (() => { dispatch(getAllVideogames()); // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dispatch]);
  useEffect (() => { dispatch(getPlatforms()); // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dispatch]);
  
   return (
    <div className="landing">
        <span className="title">Bienvenidos a mi proyecto de VIDEOGAMES</span>
        <span className="subtitle">Para mas detalles entrar al Home</span>
        <Link to = "/home">
                <button className="btn">Home</button>
        </Link>
                        
    </div>
  )
}
