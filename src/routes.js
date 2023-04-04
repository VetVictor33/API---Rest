const express = require('express');
const { getAllClasses, getClassById, putClass, deleteClass, patchClass, checkClassIdMiddleware, getAllTeachersClasses, postNewClass } = require('./controllers/classes.controllers');
const { getAllTeachers, getTeacherById, checkTeachrsdMiddleware } = require('./controllers/teachers.controllers');
const routes = express();


routes.get('/', (req, res) => res.json('I AM COMPLEEETE'));
routes.get('/classes', getAllClasses);
routes.get('/classes/:classeId', checkClassIdMiddleware, getClassById);
routes.put('/classes/:classeId', checkClassIdMiddleware, putClass);
routes.patch('/classes/:classeId/name', checkClassIdMiddleware, patchClass);
routes.patch('/classes/:classeId/description', checkClassIdMiddleware, patchClass);
routes.delete('/classes/:classeId', checkClassIdMiddleware, deleteClass);

routes.get('/teachers', getAllTeachers);
routes.get('/teachers/:teachersId', checkTeachrsdMiddleware, getTeacherById)
routes.get('/teachers/:teachersId/classes', checkTeachrsdMiddleware, getAllTeachersClasses);
routes.post('/teachers/:teachersId/classes', checkTeachrsdMiddleware, postNewClass);


module.exports = routes;