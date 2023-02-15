const axios = require('axios');
const { API_KEY } = process.env;
const {Temperamento} = require("../db");



const urlApi = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

const getTemperaments = async () => {

  const registros = await Temperamento.findAll();

    if (registros.length > 0) {

          return registros.map(e => e.name);
    }else {
            const result = await axios.get(urlApi);
          let valores = []

          result.data.forEach( e => {
            if (e.temperament) {
              e.temperament.split(',').forEach(e => {
                valores.push(e.trim());
              });
            }})
      }



      const newTemp = new Set(data)

  newTemp.forEach(async (e) => {
    await Temperamento.create({name: e})
          
})
          
const tempFilter = await Temperamento.findAll();
return tempFilter.map(e => e.name);

}














/*
 const result = await axios.get(urlApi)
    let valores = []
    result.data.forEach( e => {
        

        if (e.temperament) {
            const temp = e.temperament.split(",")
              for (let i = 0; i < temp.length; i++){
            valores.push(temp[i].trim()) 
        }} 
    })
    const newTemp = new Set(data)

  newTemp.forEach(async (e) => {
    await Temperamento.create({name: e})
    })
    */






            


module.exports = {
  getTemperaments
}
