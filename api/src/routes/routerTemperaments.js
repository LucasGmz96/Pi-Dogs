const { Router } = require('express');
const {getTemperaments} = require('../controler/controlerTemperaments')

const routerTemperaments = Router();






routerTemperaments.get('/', async (req, res) => {

const temperament = await getTemperaments()

res.status(200).json(temperament);



})








module.exports = routerTemperaments;