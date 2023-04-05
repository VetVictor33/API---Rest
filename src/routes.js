const express = require('express');
const { getAllClasses, getClassById, putClass, deleteClass, patchClassName, patchClassDescription, checkClassIdMiddleware, getAllTeachersClasses, postNewClass, patchClassTeachers } = require('./controllers/classes.controllers');
const { getAllTeachers, getTeacherById, checkTeachrsdMiddleware } = require('./controllers/teachers.controllers');
const routes = express();


routes.get('/', (req, res) => res.json('I AM COMPLEEETE'));
routes.get('/classes', getAllClasses);
routes.get('/classes/:classeId', checkClassIdMiddleware, getClassById);
routes.put('/classes/:classeId', checkClassIdMiddleware, putClass);
routes.patch('/classes/:classeId/name', checkClassIdMiddleware, patchClassName);
routes.patch('/classes/:classeId/description', checkClassIdMiddleware, patchClassDescription);
routes.patch('/classes/:classeId/teachers', checkClassIdMiddleware, patchClassTeachers);
routes.delete('/classes/:classeId', checkClassIdMiddleware, deleteClass);

routes.get('/teachers', getAllTeachers);
routes.get('/teachers/:teachersId', checkTeachrsdMiddleware, getTeacherById)
routes.get('/teachers/:teachersId/classes', checkTeachrsdMiddleware, getAllTeachersClasses);
routes.post('/teachers/:teachersId/classes', checkTeachrsdMiddleware, postNewClass);


module.exports = routes;