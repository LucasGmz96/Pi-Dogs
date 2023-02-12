const { Router } = require('express');
const {getTemplate, addTemperaments} = require('../controler/controlerTemperaments')

const routerTemperaments = Router();

routerTemperaments.get('/', (req, res) => {
    res.render('temperaments');
});


routerTemperaments.post('/', async (req, res) => {

const temperament = await addTemperaments()

res.status(200).json(temperament);



})








module.exports = routerTemperaments;