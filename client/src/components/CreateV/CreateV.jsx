import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {postCreateVideogame, getGenres,getAllVideogames,getPlatforms} from '../../redux/actions';

//import getvgames from '../../actions/getvideogames'
import  stl from './CreateV.css';

function validate(input) {
    let errors = {}
    if (!input.name) {
        errors.name = 'Name is required' 
    } else if (!input.rating || input.rating<0 || input.rating >5) {
        errors.rating = 'Rating must be a nummber between 0-5'
    } else if (input.platforms.length===0) {
        errors.platform = 'Platform is required'
    }
    console.log(errors)
    return errors 
}

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
    const [errors,setErrors] =  useState({})
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
         console.log('Platforms: ',e.target.value)
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
         if (!/^(?:[1-9]\d{0,2}(?:,\d{3})*|0)(?:\.\d+)?$/.test(input.rating) || 
            input.rating <0 || input.rating >5) 
            {return alert('Wrong format for Rating. Should be a number between 0-5')
         }
         if (input.platforms.length===0) {return alert('Platform is required')}
         console.log(input)

         dispatch(postCreateVideogame(input))
       
         alert(`Videogame ${input.name} has been added`)
         setInput({
            name: '',
            description: '',
            releaseDate: '',
            rating:0,
            platforms:'',
            genres: ''
                 })
         history.push('/home')
      }

    return (
        <>
        <div  className={stl.avgwrapper}>
        <h1 className={stl.h1}>Add your own videogame</h1>
            <form className={stl.formarea} onSubmit={handleSubmit}>
           
                <div className={stl.msgarea}>
                    <label>Description:</label>
                    <textarea onChange={handleOnChange} type='text' name='description' value={input.description} />
                </div>
                <div className={stl.detailsarea}>
                    <label>Game Name:</label>
                    <input onChange={handleOnChange} onBlur={handleOnChange} 
                        type='text' name='name' value={input.name}/>
                    {errors.name && ( <p className={stl.error}> {errors.name} </p> )}

                    <label>Released date:</label>
                    <input onChange={handleOnChange} type='date' name='releaseDate' value={input.releaseDate} 
                             placeholder='YYYY-MM-DD'/>
 
                    <label>Rating:</label>
                    <input onChange={handleOnChange} onBlur={handleOnChange}
                        type='text' name='rating' value={input.rating} placeholder='ex 4.3'/>
                    {errors.rating && ( <p className={stl.error}> {errors.rating} </p> )}     

                    <label>Platforms:</label>   
                    <select onChange={handlePlatforms}  onBlur={handleOnChange}>
                        {allplatforms.sort().map(p => {
                           return  <option key={p.name} value={p.id}>{p.name}</option>
                        })}
                    </select>
                    <ul  className='ul'><li>{input.platforms}</li></ul>
                    {errors.platforms && ( <p className={stl.error}> {errors.platforms} </p> )}

                    <label>Genres:</label>
                    <select onChange={handleGenres}>
                        {allgenres.sort().map(p => {
                            return <option key={p.name} value={p.id}>{p.name}</option>
                        })}
                    </select>   
                
                    <ul ><li>{input.genres}</li></ul> 
 
                    <button  disabled={false} className={stl.bot} type='submit'>Add Game</button> 
                    <span><Link to='/home'><button className={stl.bot2}>Back To Home</button></Link> </span>
                </div>
            </form>
        </div>
        <div/>
        </>
    )
}