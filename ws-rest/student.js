const express = require('express');
const { model } = require('./model.js');

const router = express.Router();

router.get('/', (req, res) => {
    model.Student.findAll()
        .then((students) => {  
            res.status(200).send(students);
        })
        .catch((error) => {
            res.status(500).send(error);
        })
});

router.get('/:id', (req, res) => {
    model.Student.findByPk(req.params.id)
        .then((student) => {
            res.status(200).send(student);
        })
        .catch((error) => {
            es.status(500).send(error);
        })
});

router.delete('/:id', (req, res) => {
    model.Student.destroy({
        where: {
            id: req.params.id
        }
    })
        .then((student) => {
            res.status(200).send('Student deleted.');
        })
        .catch((error) => {
            res.status(500).send(error);
        })
});

router.post('/', (req, res) => {
    model.Student.create(req.body)
        .then((student) => {
            res.status(200).send(student);
        })
        .catch((error) => {
            res.status(500).send(error);
        })
});

router.put('/:id', (req, res) => {
    model.Student.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then((student) => {
        res.status(200).send(student);
    })
    .catch((error) => {
        res.status(500).send(error);
    })
})

module.exports = router;