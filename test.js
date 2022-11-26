const webplat='https://api.rawg.io/api/games?key=993b1bf8cf3043dd94991ee0c7aff288'
const platformsApi = async () => {
     await fetch(webplat)
    .then((response) => response.json())
    .then((json) =>  json.results.map(arrayGames=>
     /**Leo resultados de Games */  {let a=[]; if(arrayGames.platforms.lenght) 
                                    {let a=0;
                                    arrayGames.platforms.map((platforms)=>{ /*console.log(platforms.platform.id + ' '+platforms.platform.name)*/
                                    a.push({idp:platforms,
                                             name:platforms.platform.name})})
                                   return a;} else{
                                    for (const i in arrayGames.platforms) {
                                        a.push({idp: arrayGames.platforms[i].platform.id, name:arrayGames.platforms[i].platform.name})
                                       // console.log({idp: arrayGames.platforms[i].platform.id, name:arrayGames.platforms[i].platform.name});
                                      }
                                      
                                   return a;
                                   //console.log(typeof(arrayGames)+' '+Object.keys(arrayGames.platforms))
                                }}                                  ))
                               // .then(salida =>{console.log('salida[0<i<20][0<j<salida[0].length].idp'+' '+salida[0].length )
                               //                    console.log(salida[0][1].idp+' '+salida[0][1].name)})   
                                .then(result => {let b=[];let i=0;let j=0;
                                                 for(i=0;i<20;i++){
                                                    for(j=0;j<result[i].length;j++){
                                                                                   {b.push({idp:result[i][j].idp,
                                                                                            name:result[i][j].name})}
                                                     }} 
                                                return b;
                                                 })
                                .then(salida=>console.log(salida))    
                                    .catch(error => console.error('Error:', error))
                    
    
    };
   
    const test = platformsApi();
console.log(test);