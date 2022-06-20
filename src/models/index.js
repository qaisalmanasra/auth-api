'use strict';

require('dotenv').config();

const {Sequelize,DataTypes} = require('sequelize');
const foodModel = require('./food-model');
const clothesModel = require('./clothes-model');
const userModel = require('../auth/models/users-model');
const Collection = require('./data-collection');

const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

let sequelizeOptions =
    process.env.NODE_ENV === "production" ?
    {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            },
            native: true
        }
    } : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

const orderTable = foodModel(sequelize, DataTypes);
const booksTable = clothesModel(sequelize, DataTypes);
const userTable = userModel(sequelize, DataTypes);

const orderCollection = new Collection(orderTable);
const booksCollection = new Collection(booksTable);

module.exports = {
    db: sequelize,
    book:booksCollection,
    order:orderCollection,
    users:userTable,
}