const { DataTypes } = require('sequelize');


// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type : DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type : DataTypes.STRING,
      allowNull: false,
    },
    life_span:{
      type: DataTypes.STRING,
    },
    image:{
      type: DataTypes.TEXT,
      defaultValue: "https://img2.freepng.es/20180415/jdw/kisspng-logo-silhouette-dog-bone-dog-5ad41d4b59e7d5.7560651515238505713683.jpg"

    }
  },{timestamps: false}
  
  )
};







