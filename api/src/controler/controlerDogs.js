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
const getDb = async () => {
    const bdData = await Dog.findAll({
        atributes: ['image', 'name', 'weight'],
        include: {
            model: Temperamento,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    })
    const data = bdData.map(e =>{
       return {
        image: e.image,
        name: e.name,
        temperament: e.temperamentos.map(e => e.name).join(', '),
        weight: e.weight,
        
       }
      })


   return data
      
        

   

    
  
    
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
            weight: dog.weight.metric,
            height: dog.height.metric,
            life_span: dog.life_span,
            temperament: dog.temperament
        }

    }else{
            const dogDb = await Dog.findOne({
                where:{
                    ID: id
                },     
                include:{
                    model: Temperamento,
                    attributes: ["name"],
                    through: {
                        attributes: []
                    }
                }
            })
            
         
                    
            return {
                image: dogDb.image,
                name: dogDb.name,
                weight: dogDb.weight,
                height: dogDb.height,
                life_span: dogDb.life_span,
                temperament:dogDb.temperamentos.map(e => e.name).join(', '),
            }
    }
}


const createDog = async (name, temperament, weight, height, life_span) =>{

    const dog = await Dog.create({name, weight, height, life_span})

    await dog.addTemperamento(temperament)
    
    console.log(dog)


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