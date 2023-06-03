const DataTypes = require("sequelize");
const { sequelize } = require("../config/mysql");

const Arbitro = sequelize.define(
    "arbitros",
    {
        dni: {
            type: DataTypes.STRING,
        },
        nombre: {
            type: DataTypes.STRING,
        },
        apellido: {
            type: DataTypes.STRING,
        },
        disponible: {
            type: DataTypes.INTEGER,
        },
        activo: {
            type: DataTypes.INTEGER,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = Arbitro;