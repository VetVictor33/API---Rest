const database = require("../database");
const { findTeacherById, findClassById, findAllClasses, findCurrentClassId, findAllTeachers } = require("../database/repository");


const getAllClasses = (req, res) => {
    const classes = findAllClasses();
    return res.status(200).json(classes)
}

const getClassById = (req, res) => {
    const { classeId } = req.params
    const classe = findClassById(+classeId);
    if (!classe) {
        return res.status(404).json({ message: "There is no such class" })
    }
    return res.status(200).json(classe)
}

const postNewClass = (req, res) => {
    const { teachersId } = req.params;
    const { name, description } = req.body;
    const teacher = findTeacherById(+teachersId);

    if (!name || !description) {
        return res.status(400).json({ message: 'Class need to have at least a name and description' })
    }
    if (!teacher) {
        return res.status(404).json({ message: 'There is not such teacher' })
    }

    const newClassId = findCurrentClassId();

    const newClass = { id: newClassId, name, description, teachers: [+teachersId] };
    database.classes.push(newClass);

    return res.status(201).send()
}

const getTeachersAllClasses = (req, res) => {
    const { teachersId } = req.params;
    const teacher = findTeacherById(+teachersId);
    if (!teacher) {
        return res.status(404).json({ message: 'There is not such teacher' })
    }

    const teachersClasses = findAllClasses().filter(classe => classe.teachers.indexOf(+teachersId) !== -1);

    if (!teachersClasses) {
        return res.status(404).json({ message: 'Nenhuma aula encontrada com este professor' });
    }

    const teachersName = findTeacherById(+teachersId).name
    return res.status(200).json({ teachersName, teachersClasses })
}

module.exports = {
    getAllClasses,
    getClassById,
    getTeachersAllClasses,
    postNewClass
}