const express = require('express');
const { model } = require('./model.js');

const router = express.Router();

router.get('/', (req, res) => {
    model.Grade.findAll()
        .then((grades) => {  
            res.status(200).send(grades);
        })
        .catch((error) => {
            res.status(500).send(error);
        })
});

router.get('/:id', (req, res) => {
    model.Grade.findByPk(req.params.id)
        .then((grade) => {
            res.status(200).send(grade);
        })
        .catch((error) => {
            es.status(500).send(error);
        })
});

router.delete('/:id', (req, res) => {
    model.Grade.destroy({
        where: {
            id: req.params.id
        }
    })
        .then((grade) => {
            res.status(200).send('Grade deleted.');
        })
        .catch((error) => {
            res.status(500).send(error);
        })
});

router.post('/:id', (req, res) => {
    model.Grade.create({...req.body, StudentId: req.params.id})
        .then((grade) => {
            res.status(200).send(grade);
        })
        .catch((error) => {
            res.status(500).send(error);
        })
});

router.put('/:id', (req, res) => {
    model.Grade.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then((grade) => {
        res.status(200).send(grade);
    })
    .catch((error) => {
        res.status(500).send(error);
    })
})

module.exports = router;