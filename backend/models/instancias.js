const DataTypes = require("sequelize");
const { sequelize } = require("../config/mysql");

const Instancia = sequelize.define(
    "emparejamiento",
    {
        id_owner: {
            type: DataTypes.INTEGER,
        },
        nombre: {
            type: DataTypes.STRING,
        },
        nombre_publico: {
            type: DataTypes.STRING,
        },
        orden: {
            type: DataTypes.INTEGER,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = Instancia;