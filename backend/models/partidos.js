const DataTypes = require("sequelize");
const { sequelize } = require("../config/mysql");

const Partido = sequelize.define(
    "partidos",
    {
        torneo_id: {
            type: DataTypes.INTEGER,
        },
        llave_id: {
            type: DataTypes.INTEGER,
        },
        equipo_uno_id: {
            type: DataTypes.INTEGER,
        },
        equipo_dos_id: {
            type: DataTypes.INTEGER,
        },
        goles_equipo_uno: {
            type: DataTypes.INTEGER,
        },
        goles_equipo_dos: {
            type: DataTypes.INTEGER,
        },
        fecha: {
            type: DataTypes.DATE,
        },
        activo: {
            type: DataTypes.INTEGER,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = Partido;