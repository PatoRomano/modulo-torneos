const DataTypes = require("sequelize");
const { sequelize } = require("../config/mysql");

const Equipo = sequelize.define(
    "equipos",
    {
        nombre: {
            type: DataTypes.STRING,
        },
        deporte_id: {
            type: DataTypes.INTEGER,
        },
        torneo_id: {
            type: DataTypes.INTEGER,
        },
        activo: {
            type: DataTypes.INTEGER
        },
    },
    {
        timestamps: true,
    }
);

module.exports = Equipo;