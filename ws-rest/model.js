const { Sequelize, DataTypes } = require('sequelize');

function defineModel(sequelize) {

    const Student = sequelize.define('Student', {
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
    });

    const Grade = sequelize.define('Grade', {
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
    });

    console.log(Student, Grade);

    Student.hasMany(Grade);
    Grade.belongsTo(Student);

    return {
        Student, Grade
    };
}

module.exports = { defineModel }
