const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    idv:{type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   image:{
    type: DataTypes.STRING,
    allowNull: false,
   },
   description:{
    type: DataTypes.STRING,
    allowNull: false,
   },
   releaseDate:{
    type: DataTypes.DATEONLY,
    allowNull: false,
   },
   rating:{
    type: DataTypes.DECIMAL,
    allowNull: false,
   },
   platforms:{
    type: DataTypes.DECIMAL,
    allowNull: false,
   }
  },
  {timestamps: false}
  );
};
