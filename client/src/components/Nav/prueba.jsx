 // {videogames.results.map((videogame) => {videogame.genres.map((genreA)=> genreA.name=='Action' ?videogamesR.push(videogame):false)})}
      // {videogames.results.map(videogame=> !videogame.hasOwnProperty('from')? console.log('1.api ext'): null )}
      // {videogames.results.map(videogame=> videogame.hasOwnProperty('from')? console.log('2.Api BD'): null )}

function filtro(array){
    if(array.length===0){videogamesL=videogames.results}
    else{for(let i=0;i<array.length;i++){
      if(i===0 && videogamesL.length>0){videogames.results.map((videogame) => {videogame.genres.map((genreA)=> genreA.name=='Action' ?videogamesL.push(videogame):false)})}
      else if(videogamesL.length>0){
        let videoaux=[];
        videogamesL.map((videogame) => {videogame.genres.map((genreA)=> genreA.name=='Action' ?videoaux.push(videogame):false)});
        videogamesL=videoaux }
       
        else{alert('Por favor, Elimine uno de los filtros, No hay videojugeos que mostrar')}
    }}}
  
    {console.log(videogamesL)}

    {/* {errors.name} {errors.releaseDate}
 {errors.platforms} {errors.description}
 {errors.rating}
 {errors.platforms}
 {errors.genres} */}
 {/* {console.log((errors.name? true:false && }
               errors.releaseDate? true:false &&
               errors.platforms? true:false &&
               errors.description? true:false &&
               errors.rating? true:false &&
 errors.genres? true:false) )*/}
 { console.log(input.description.length)} 

    {/* <form key='1'>  <li className="2">Filtros
               {genres.sort(function(a,b){return a.name.localeCompare(b.name,'en',{numeric:true})}).map(p => {
                return  <>  <input type='checkbox' id={p.id}  data-count={p.id} key={p.name+'0'} value={p.id}/>
                       <label key={p.name+'1'} htmlFor={p.id}>{p.name}</label></>})}
                <button  type='submit'>Aplicar Filtro</button>
                <button type='submit'>Reset Filtro</button>
                </li>
</form> */}

{/* <select name='Filtros'>
             {genres.sort(function(a,b){return a.name.localeCompare(b.name,'en',{numeric:true})}).map(p => {
                return  <option data-count={p.id} key={p.name} value={p.id}>{p.name}</option>
             })}
</select> */}


{/* <form key='1'>   */}
<fieldset> <legend>Filtros</legend>
{genres.sort(function(a,b){return a.name.localeCompare(b.name,'en',{numeric:true})}).map(p => {
 return    <div  className="form-row"><input type='checkbox' id={p.id} key={p.name+'0'} value={p.id}/>
        <label key={p.name+'1'} htmlFor={p.id}>{p.name}</label></div>})}
 <button  type='submit'>Aplicar Filtro</button>
 <button type='submit'>Reset Filtro</button>
 </fieldset> 
 
{/* </form> */}


function setupIndeterminate() { var pickInterest = document.querySelectorAll("[name=pickInterest"), 
parentInterest = document.getElementById("pickInterests");
 for (var index = 0; index < pickInterest.length; index++)
  { var cb = pickInterest[index]; cb.addEventListener("change", 
  function (evt) { var checked = 0;
   for (var j = 0; j < pickInterest.length; j++)
   { if (pickInterest[j].checked) { checked++; } }
    switch (checked) { 
      case 0: parentInterest.checked = false; 
      parentInterest.indeterminate = false; break; 
      case 1: parentInterest.checked = false; 
      parentInterest.indeterminate = true; break; 
      default: parentInterest.checked = true; 
      parentInterest.indeterminate = false; break; }
     }); }}


     /** */
     var expanded = false;
               
      function showCheckboxes() {
        var checkboxes = document.getElementById("checkboxes");
        if (!expanded) {
          checkboxes.style.display = "block";
          expanded = true;
        } else {
          checkboxes.style.display = "none";
          expanded = false;
        }
      }
  
     <form>
     <div className="multiselect">
       <div className="selectBox" onClick={()=>showCheckboxes()}>
         <select>
           <option>Filtros</option>
         </select>
         <div className="overSelect"></div>
       </div>
       <div id="checkboxes">
   
         {genres.sort(function(a,b){return a.name.localeCompare(b.name,'en',{numeric:true})}).map(p => {
    return  <label key={p.name+'1'} htmlFor={p.id}>
            <input type="checkbox" id={p.name} />{p.name}</label>})}
   
         <label htmlFor="one">
           <input type="checkbox" id="one" />Datos API-BD</label>
         <label htmlFor="two">
           <input type="checkbox" id="two" />Datos API-Ext</label>
         
       
       </div>
     </div>
   </form> 
   /*
   .multiselect {
    width: 150px;
  }
  
  .selectBox {
    position: relative;
  }
  
  .selectBox select {
    width: 50%;
    font-weight: bold;
  }
  
  .overSelect {
    position:absolute ;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  
  #checkboxes {
    display: none;
    border: 1px #dadada solid;
  }
  
  #checkboxes label {
    display: block;
  }
  
  #checkboxes label:hover {
    background-color: #1e90ff;
  }*/