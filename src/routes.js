const express = require('express');
const { getAllClasses, postNewClass, getClassById, getTeachersAllClasses } = require('./controllers/classes.controllers');
const routes = express();


routes.get('/', (req, res) => res.json('I AM COMPLEEETE'));
routes.get('/classes', getAllClasses);
routes.get('/classes/:classeId', getClassById);
routes.get('/teachers/:teachersId/classes', getTeachersAllClasses)
routes.post('/teachers/:teachersId/classes', postNewClass);


module.exports = routes;