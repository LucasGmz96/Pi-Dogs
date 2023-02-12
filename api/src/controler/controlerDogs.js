const axios = require('axios');
const { API_KEY } = process.env;
const {Dog, Temperamento} = require("../db");
const {Op} = require("sequelize");




const urlApi = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;


// GET /dogs:

// pedido de info a la api para ruta principal
const getApi = async() => {
    const result = await axios.get(urlApi)
    return result.data.map(e =>{
        return {
            image: e.image.url,
            name: e.name,
            temperament: e.temperament,
            weight: e.weight.metric,
    }})
}
// pedido de info a la db para ruta principal
const getDb = async() => {
    return await Dog.findAll({
        atributes: ['image', 'name', 'weight'],
        include:{
            model: Temperamento,
            atributes: ['name'],
            through: {
                atributes: []
            }}
    })
}
// concatenacion de info para ruta principal
const getAll = async() => {
    const db = await getDb()
    const api = await getApi()
    return db.concat(api)
}

// GET /dogs?name="..."

// pedido de info del nombre a la api 
const getName = async (name) => {
    
    // aca buscamos el nombre de los perros 
        const apiSearch = await axios.get(urlApi)
        
          
        const dbSearch = await Dog.findAll({
            include:{ 
                model: Temperamento,
                attributes: ['name']}});

    // aca filtramos los nombres, con el query que nos pasan
        if(name){

            const filterApi = apiSearch.data.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));

             
             
            var filterDb = dbSearch.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
            
            
            const filter = filterApi.concat(filterDb);

         
    
    // aca retornamos una respuesta con los nombres o el error 

        if(filter.length > 0){
               return filter
        }else { throw new Error('No se encontraron resultados') }
        }
    }



 








const getById = async (id) => {
    const apiSearch = await axios.get(urlApi)
    
    const dog = apiSearch.data.find(dog => dog.id == id)


    

    if (dog) {
        return {
            image: dog.image.url,
            name: dog.name,
            weight: dog.weight,
            height: dog.height,
            life_span: dog.life_span
        }

    }else{
            const dogDb = await Dog.findByPk(id)
            return {
                image: dogDb.image,
                name: dogDb.name,
                temperament: dogDb.temperament,
                weight: dogDb.weight.metric,
                height: dogDb.height.metric,
}
    }
}


const createDog = async (name, temperament, weight, height, life_span) =>{

    const dog = await Dog.create({name, weight, height, life_span})

    await dog.addTemperamento(temperament)
    
    return dog
}












module.exports = {
    getAll,
    getName,
    getById,
    createDog,
}







// propiedades que necesito : 
//  [{
    // height:{metric},
    // name,
    // temperament, 
    // image:{url}
    //