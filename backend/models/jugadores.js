const DataTypes = require("sequelize");
const { sequelize } = require("../config/mysql");

const Jugador = sequelize.define(
    "jugadores",
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
        fecha_nac: {
            type: DataTypes.DATE,
        },
        equipo_id: {
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

module.exports = Jugador;