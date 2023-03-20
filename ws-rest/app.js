const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Sequelize = require('sequelize');
const { defineModel } = require('./model.js');

const service = express();

service.use(cors());
service.use(bodyParser.json());
service.use(bodyParser.urlencoded({ extended: false }));

const sequelize = new Sequelize('dati-sequelize', 'utente', 'cisco', {
    host: 'sql-progetto-sequelize',
    dialect: 'mysql'
});

const { Student, Grade } = defineModel(sequelize);

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
            // sync()
            console.log(Student, Grade);
            res.status(200).send('Test mode.')
            break;
        case '1':
            // sync(force)
            break;
        case '2':
            // sync(alter)
            break;
    
        default:
            break;
    }
})

const server = service.listen(3000, () => {
    console.log('Server in ascolto sulla porta 3000...');
})

