const { Router } = require('express');
const { getApi, getById } = require('../controler/controlerDogs.js');
const routerDog = require('./routerDog');
const routerTemperaments = require('./routerTemperaments');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
router.use('/dogs', routerDog);
router.use('/temperaments', routerTemperaments);


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);







module.exports = router;
