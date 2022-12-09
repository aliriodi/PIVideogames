//import e from 'express';
import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {postCreateVideogame, getGenres,getAllVideogames,getPlatforms} from '../../redux/actions';
import  stl from './CreateV.css';

export default function CreateV() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [input,setInput] = useState({
        name: '',
        description: '',
        releaseDate: '',
        rating:'',
        platforms:'' ,
        genres: ''
    })
    let [errors,setErrors] =  useState({name:true,
                                          description:true,
                                          releaseDate:true,
                                          rating:true,
                                          platforms:true,
                                          genres:true})
                                      
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

      
function validate(input) {
    //let errors = {}
    input.name.length<4?errors.name = 'Nombre de juego requerido al menos 4 caracteres':errors.name=false;
    
    input.description.length<10?
    errors.description = 'Descripcion es requerida al menos 10 caracteres':errors.description=false;

    (!input.rating || input.rating<0 || input.rating >5)?
     errors.rating = 'Rating debe ser un numero entre 0-5':errors.rating=false;
    input.platforms.length===0?
    errors.platforms = 'Al menos una Plataforma es requerida':errors.platforms=false;
    input.genres.length===0?
    errors.genres = 'Al menos un Genero es requerido': errors.genres=false;
    !input.releaseDate?
    errors.releaseDate = 'Fecha es requerida':errors.releaseDate=false;
   
     return errors 
}

 let allgenres = useSelector((state) => state.genres)  
 const allplatforms = useSelector((state) => state.platforms)
    allgenres = allgenres.filter(p => p !== 'All')

    function handleOnChange(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value
            })
        setErrors(validate ({
            ...input,[e.target.name]:e.target.value
        }))
     }
     
     function handlePlatforms(e) {
          setInput({
          ...input,
          platforms: input.platforms.length>0?input.platforms.concat(','+e.target.value):e.target.value
        })
     } 

     function handleGenres(e) {
        setInput({
          ...input,
          genres: input.genres.length>0? input.genres +','+e.target.value:e.target.value
        })
     } 
    
      function  handleSubmit(e) {
         e.preventDefault()
         if (!input.name) {return alert('Name is required')}
         if (!/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(input.releaseDate)) 
            {return alert('Wrong released date format. Should be YYYY-MM-DD OR YYYY-M-D')}
         if (!input.rating) {return alert('Rating is required')}
         if (!/^(?:[1-9]\d{0,2}(?:,\d{3})*|0)(?:\.\d+)?$/.test(input.rating)) 
            {return alert('Wrong format for Rating. Should be a number between 0-5')
         }
         if (input.platforms.length===0) {return alert('Platform is required')}
         console.log(input)
         setInput(
            {...input,
                genres:input.genres.split(',').sort().filter(
                    (id, index, self) => 
                    (self.indexOf(id) === index)).join(','),
                platforms:input.platforms.split(',').sort().filter(
                    (id, index, self) => 
                    (self.indexOf(id) === index)).join(','),
              })
         dispatch(postCreateVideogame(input))
       
         alert(`Videogame ${input.name} has been added`)
         setInput({
            name: '',
            description: '',
            releaseDate: '',
            rating:'',
            platforms:'',
            genres: ''
                 })
         history.push('/home')
      }

    return (
        <>
        <nav >
     <div className="logo2"></div>
   
      <ul className="navList2">
      <li className="navLi2"><Link to='/home'>HOME </Link></li>
      <li className="navLi2"><Link to='/home/create'>CREAR VIDEOGAME </Link> </li>

      <li className="navLi2">
   
        </li>
      </ul>
      </nav>
        <div  className={stl.avgwrapper}>
        <h1 className={stl.h1}>Agrega tu Videogame</h1>
            <form className={stl.formarea} onSubmit={handleSubmit}>
           
            <div className={stl.detailsarea}>
                    <label>Nombre:</label>
                    <input onChange={handleOnChange} onBlur={handleOnChange} 
                        type='text' name='name' value={input.name}/>
                    {errors.name && ( <p className={stl.error}> {errors.name} </p> )}

                <div className={stl.msgarea}>
                    <label>Descripcion:</label>
                    <textarea onChange={handleOnChange} onBlur={handleOnChange} onFocus={handleOnChange}
                    type='text' name='description' value={input.description} />
                    {errors.description && ( <p className={stl.error}> {errors.description} </p> )}
                </div>
               
                    <label>Fecha de lanzamiento:</label>
                    <input onChange={handleOnChange}  onBlur={handleOnChange} onFocus={handleOnChange}
                           type='date' name='releaseDate' value={input.releaseDate} 
                             placeholder='YYYY-MM-DD'/>
                     { errors.releaseDate}
                    <label>Indice de Rating:</label>
                    <input onChange={handleOnChange} onBlur={handleOnChange} onFocus={handleOnChange}
                        type='text' name='rating' value={input.rating} placeholder='ex 4.3'/>
                    {errors.rating && ( <p className={stl.error}> {errors.rating} </p> )}     

                    <label>Plataformas Soportadas:</label>   
                    <select onChange={handlePlatforms}  onBlur={handleOnChange} onFocus={handleOnChange}>
                         <option key='Plataformas' value={0}>==Plataformas==</option>
                        {allplatforms.sort().map(p => {
                           return  <option key={p.name} value={p.id}>{p.name}</option>
                        })}
                    </select>
                    <ul  className='ul'><li>{input.platforms}</li></ul>
                    {errors.platforms && ( <p className={stl.error}> {errors.platforms} </p> )}

                    <label>Generos asociados:</label>
                    <select onChange={handleGenres}  onBlur={handleOnChange} onFocus={handleOnChange}> 
                    <option key='Generos' value={0}>==Generos==</option>
                        {allgenres.sort().map(p => {
                            return <option key={p.name} value={p.id}>{p.name}</option>
                        })}
                    </select>   
                     <ul ><li>{input.genres}</li></ul> 
                     {errors.genres && ( <p className={stl.error}> {errors.genres} </p> )}
 
                     <button     disabled={errors.name?true:false ||
                                       errors.releaseDate?true:false ||
                                       errors.platforms?true:false ||
                                       errors.description?true:false ||
                                       errors.rating?true:false||
                                       errors.platforms?true:false||
                                       errors.genres?true:false
                                       } className={stl.bot} type='submit'>Add Game</button> 
                    </div>
            </form>
        </div>
        <div/>
        </>
    )
}