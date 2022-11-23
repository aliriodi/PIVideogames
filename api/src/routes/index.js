const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const get = require('./get')
//const post = require('./post')

// const getvideogames = require('./getvideogames.js');
// const getvideogamesid = require('./getvideogamesid.js');
// const postvideogames = require('./postvideogames.js');
// const getgenres = require('./getgenres.js');
// const postgenres = require('./postgenres.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/', get);
//router.use('/', post);

// router.get('/videogames', getvideogames);
// /*GET /videogames?name="...":
//     Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
//     Si no existe ningún videojuego mostrar un mensaje adecuado*/
// router.get('/videogames/:id', getvideogamesid);
// router.get('/genres', getgenres);
// router.post('/videogames', postvideogames);
// router.post('/genres', postgenres);

module.exports = router;
