const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Sequelize = require('sequelize');
const { sequelize, model } = require('./model.js');
const  studentRouter = require('./student.js');
const  gradeRouter = require('./grade.js');

const service = express();

service.use(cors());
service.use(bodyParser.json());
service.use(bodyParser.urlencoded({ extended: false }));

service.get('', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

service.get('/test-connection/:mode', (req, res) => {
    let mode = req.params.mode;
    switch (mode) {
        case '1':
            (async () => {
                try {
                    await sequelize.authenticate();
                    res.status(200).send('Connection has been established successfully.')
                } catch (error) {
                    res.status(500).send(error);
                }
            })();
            break;
        case '2':
            sequelize.authenticate()
                .then(() => {
                    res.status(200).send('Connection has been established successfully.')
                })
                .catch((error) => {
                    res.status(500).send(error);
                })
            break;
        default:
            break;
    }
});

service.get('/init-db/:mode', (req, res) => {
    let mode = req.params.mode;
    switch (mode) {
        case '0':
            sequelize.sync({ force: true })
                .then(() => {
                    res.status(200).send('Database & tables created!')
                })
                .catch((error) => {
                    res.status(500).send(error);
                })
            break;
        case '1':
            sequelize.sync({ force: true })
                .then(() => {
                    res.status(200).send('Database & tables created!')
                })
                .catch((error) => {
                    res.status(500).send(error);
                })            
            break;
        case '2':
            sequelize.sync({ alter: true })
                .then(() => {
                    res.status(200).send('Database & tables created!')
                })
                .catch((error) => {
                    res.status(500).send(error);
                })
            break;    
        default:
            break;
    }
});

service.use('/student', studentRouter);
service.use('/grade', gradeRouter);

const server = service.listen(3000, () => {
    console.log('Server in ascolto sulla porta 3000...');
})

