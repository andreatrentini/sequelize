const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('dati-sequelize', 'utente', 'cisco', {
    host: 'sql-progetto-sequelize',
    dialect: 'mysql'
});

var model = {
    Student: sequelize.define('Student', {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
            // allowNull defaults to true
        },
        class: {
            type: DataTypes.STRING,
            allowNull: false
            // allowNull defaults to true
        },
    }, {
        // Other model options go here
    }),
    Grade: sequelize.define('Grade', {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false
        },
        argument: {
            type: DataTypes.STRING,
            allowNull: false
            // allowNull defaults to true
        },
        grade: {
            type: DataTypes.DOUBLE,
            allowNull: false
            // allowNull defaults to true
        },
    }, {
        // Other model options go here
    })
}

model.Student.hasMany(model.Grade);
model.Grade.belongsTo(model.Student);

module.exports = {
    sequelize,
    model
}
