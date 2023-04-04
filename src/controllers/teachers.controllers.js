const { findCurrentClassId, findTeacherById, pushNewClass, findAllClasses, findAllTeachers } = require("../database/repository");

const getAllTeachers = (req, res) => {
    const teachers = findAllTeachers();
    res.status(200).json(teachers);
}

const getTeacherById = (req, res) => {
    const { teachersId } = req.params
    const teacher = findTeacherById(+teachersId);
    if (!teacher) {
        return res.status(404).json({ message: "There is no such teacher" })
    }
    return res.status(200).json(teacher)
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

    pushNewClass(newClass);
    return res.status(201).send()
}

module.exports = {
    getAllTeachers,
    getTeacherById,
    getTeachersAllClasses,
    postNewClass,
}