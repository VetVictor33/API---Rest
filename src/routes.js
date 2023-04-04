const express = require('express');
const { getAllClasses, getClassById, patchClass } = require('./controllers/classes.controllers');
const { getTeachersAllClasses, postNewClass, getAllTeachers, getTeacherById } = require('./controllers/teachers.controllers');
const routes = express();


routes.get('/', (req, res) => res.json('I AM COMPLEEETE'));
routes.get('/classes', getAllClasses);
routes.get('/classes/:classeId', getClassById);
routes.patch('/classes/:classeId', patchClass);

routes.get('/teachers', getAllTeachers);
routes.get('/teachers/:teachersId', getTeacherById)
routes.get('/teachers/:teachersId/classes', getTeachersAllClasses);
routes.post('/teachers/:teachersId/classes', postNewClass);


module.exports = routes;