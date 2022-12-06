import React , { useEffect } from 'react'
import { useDispatch , connect } from "react-redux";
import { movepage, order  } from "../../redux/actions";

export  function Pagination({pagination,videogames,movepage,order}) {
    const dispatch = useDispatch();
    const pageNumbers = [];
    let maxPage = Math.ceil(videogames.count/15);
    if(maxPage>1){
    for(let i = 1; i <= maxPage ; i++) {
        pageNumbers.push(i);
        };}
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
          dispatch(order(videogames.results.sort(function(a,b){return a.rating-b.rating})))
            }
        if(typeorder==='desc1'){
          dispatch(order(videogames.results.sort(function(b,a){return a.rating - b.rating})))
            }}
            else{return alert('No hay juegos para ordenar')}
    
              };

    function back(){
        if(pagination.idPageNow >1) 
        {dispatch(movepage({idPageNow:--pagination.idPageNow}));}
                   };

    function forward(){
        if(pagination.idPageNow <maxPage) 
        {dispatch(movepage({idPageNow:++pagination.idPageNow}));}};
  return (
    <div>
         <ul className="logo">
            <button className="pages" key="a"
                        onClick={() => back()}>   ATRAS </button>
             
                 {pageNumbers.map(number =>
                <button className={pagination.idPageNow===number? 'on':'off'} key={number}
                        onClick={() => {dispatch(movepage({idPageNow:number}));}}
                        value={number} 
                > {number} </button>
                   )} 
                  
                   <button className="pages" key="b"
                        onClick={() => forward()}>ADELANTE </button>
     
   </ul>
   <ul> <button className="pages"  key="c" onClick={() => order1('asc0')}>Asc. por Nombre</button>
     <button className="logo" key="d" onClick={() => order1('desc0')}>Desc. por Nombre </button>
     <button className="order" key="e" onClick={() => order1('asc1')}>Asc. por Rating </button> 
     <button className="order" key="f" onClick={() => order1('desc1')}>Desc por Rating </button>      
     </ul>
  </div>
  )
}

const mapStateToProps = (state) => {
    return {
        videogames: state.videogames,
        pagination: state.pagination
    }; };

  function mapDispatchToProps(dispatch) {
    return {
       movepage: (number) => dispatch(movepage(number)),
       order: (cb) => dispatch(order(cb))
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Pagination);


