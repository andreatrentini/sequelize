const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Sequelize = require('sequelize');
const defineModel = require('./model.js');


const service = express();

service.use(cors());
service.use(bodyParser.json());
service.use(bodyParser.urlencoded({ extended: false }));

const sequelize = new Sequelize('dati-sequelize', 'utente', 'cisco', {
    host: 'sql-progetto-sequelize',
    dialect: 'mysql'
});

defineModel(sequelize);

service.get('', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

service.get('/test-connection-1', (req, res) => {
    (async () => {
        try {
            await sequelize.authenticate();
            res.status(200).send('Connection has been established successfully.')
          } catch (error) {
            res.status(500).send(error);
          }
    })();
});

service.get('/test-connection-2', (req, res) => {
    sequelize.authenticate()
        .then(() => {
            res.status(200).send('Connection has been established successfully.')
        })
        .catch((error) => {
            res.status(500).send(error);
        })
})

const server = service.listen(3000, () => {
    console.log('Server in ascolto sulla porta 3000...');
})

