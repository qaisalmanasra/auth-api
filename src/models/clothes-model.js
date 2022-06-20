'use strict';
const clothesModel = (sequelize, DataTypes) => sequelize.define('clothes', {
    name: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        defaultValue: "----",
        required: true
    },
    size: {
        type: DataTypes.STRING,
        required: true
    }
});

module.exports = clothesModel;