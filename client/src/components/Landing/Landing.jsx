import React from 'react';
import { Link } from "react-router-dom";
import "./Landing.css"

export default function Landing() {
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
