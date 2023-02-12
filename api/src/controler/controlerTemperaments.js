const axios = require('axios');
const { API_KEY } = process.env;
const {Dog, Temperamento} = require("../db");



const urlApi = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

const getTemperamentos = async () => {


}

const addTemperaments = async (temperament) =>{
    const result = await axios.get(urlApi)
    let data = []
    result.data.forEach( e => {
        

        if (e.temperament) {
            const temp = e.temperament.split(",")
              for (let i = 0; i < temp.length; i++){
            data.push(temp[i].trim()) 
        }} 
    })
    const newTemp = new Set(data)

  newTemp.forEach(async (e) => {
    await Temperamento.create({name: e})
    })
    

   


}
            


module.exports = {
    getTemperamentos,
    addTemperaments,
}
