const DataTypes = require("sequelize");
const { sequelize } = require("../config/mysql");

const Partido = sequelize.define(
    "partidos",
    {
        nombre: {
            type: DataTypes.STRING,
        },
        deporte_id: {
            type: DataTypes.INTEGER,
        },
        arbitro_id: {
            type: DataTypes.INTEGER,
        },
        ganador_id: {
            type: DataTypes.INTEGER,
        },
        instancia_id: {
            type: DataTypes.INTEGER,
        },
        terminado: {
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

module.exports = Partido;