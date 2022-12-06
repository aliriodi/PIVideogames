const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports =   (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    idv: {
      type: DataTypes.INTEGER,
      allowNull: true,
        },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      },
   image:{
    type: DataTypes.STRING,
    defaultValue: "https://store-images.s-microsoft.com/image/apps.13669.66928923068968049.ecc88210-5e53-4f2b-b6b2-831522e31cb1.87db53aa-0cc6-47d2-be2d-25432c069f8b?q=90&w=320&h=180"
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
    type: DataTypes.STRING,
    allowNull: false,
   }
  },
  {timestamps: false}
  );
};
