import React  from 'react'

export default function Vcard(props) {
  return (
    <div className="card">
      
         <h4 className="flex-items">{props.name}</h4>
       <a href={`/videogames/${props.id}`}><img  className="image" src={props.image}  alt={props.name}/>  </a>
       
    <h5><strong>Generos: </strong> </h5>
    <p className="genres">{props.genres.map((object) => ' '+object.name).toString()  }</p>
    <p></p>
    </div>
  )
}
