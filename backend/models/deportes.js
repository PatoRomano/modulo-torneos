const DataTypes = require("sequelize");
const { sequelize } = require("../config/mysql");

const Deporte = sequelize.define(
    "deportes",
    {
        nombre: {
            type: DataTypes.STRING,
        },
        nombre_publico: {
            type: DataTypes.STRING,
        },
        activo: {
            type: DataTypes.INTEGER,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = Deporte;