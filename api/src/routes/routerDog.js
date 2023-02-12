const { Router } = require('express');
const { getAll, getName, getById, createDog } = require('../controler/controlerDogs.js');

const routerDog = Router();

routerDog.get("/", async (req,res) => {
    try{
        const {name} = req.query;
        
        
        if(name){
            const getNameDog = await getName(name)
            res.status(200).json(await getNameDog);
        }else{
            const getDogAll= await getAll();
            res.status(200).json(getDogAll);
    }
        
    }catch (err) {
        res.status(400).send(err.message);
    }
  });
  
  
  
  routerDog.get("/:idRaza", async (req,res) => {

    const {idRaza} = req.params;

    try {
        const getId = await getById(idRaza);
        res.status(200).json(getId);
        
    } catch (error) {
        res.status(400).send("no se encontraron datos");
        
    }})


    routerDog.post("/", async (req,res) => {
        const {name, temperament, weight, height, life_span} = req.body;
        
        
        try {
            const newDog = await createDog(name, temperament, weight, height, life_span);

            res.status(201).json(newDog);
            
        } catch (error) {
            res.status(400).send(error.message);

        }

        


        


    })
 



module.exports = routerDog