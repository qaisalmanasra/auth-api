'use strict';
const foodModel = (sequelize, DataTypes) => sequelize.define('MyOrders', {
    name: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    },
    price: {
        type: DataTypes.STRING,
        required: true
    },
    type: {
        type: DataTypes.ENUM('fruit', 'vegitable', 'protein'),
        required: true
    }
});

module.exports = foodModel;