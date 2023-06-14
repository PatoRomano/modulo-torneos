const DataTypes = require("sequelize");
const { sequelize } = require("../config/mysql");
//const Deporte = require('./deportes');

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

/* Equipo.findAll = function () {
    Equipo.belongsTo(Deporte, {
        foreignKey: 'deporte_id'
    })

    return Equipo.findAll({include: Deporte})
}; */
module.exports = Equipo;