const { findClassById, findAllClasses, updateClass, removeClass, updateClassNameOrDescriptionOrTeachers, pushNewClass, findTeacherById, findCurrentClassId, findAllTeachersClass } = require("../database/repository");


const checkClassIdMiddleware = (req, res, next) => {
    const { classeId } = req.params
    const classe = findClassById(+classeId);
    if (!classe) {
        return res.status(404).json({ message: "There is no such class" })
    }
    return next()
}

const getAllClasses = (req, res) => {
    const classes = findAllClasses();
    return res.status(200).json(classes)
}

const getClassById = (req, res) => {
    const { classeId } = req.params
    const classe = findClassById(+classeId);
    return res.status(200).json(classe)
}

const putClass = (req, res) => {
    const { classeId } = req.params;
    const { name, description, teachers_ids } = req.body;
    if (!name || !description || !teachers_ids) {
        return res.status(400).json({ message: 'To update the class you need to informa new name, description and new teachers_ids array' })
    }
    const validation = validadeTeachersIdArray(teachers_ids);
    if (!validation[0]) {
        return res.status(validation[1]).json(validation[2])
    }

    const updatedClass = { id: +classeId, name, description, teachers_ids };

    updateClass(classeId, updatedClass);

    return res.status(204).send()
}

const patchClassName = (req, res) => {
    const { classeId } = req.params;
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Please, choose a new name for this class!' })
    }
    updateClassNameOrDescriptionOrTeachers(classeId, name);
    res.status(204).send();
}
const patchClassDescription = (req, res) => {
    const { classeId } = req.params;
    const { description } = req.body;
    if (!description) {
        return res.status(400).json({ message: 'Please, choose a new description for this class!' })
    }
    updateClassNameOrDescriptionOrTeachers(classeId, undefined, description);
    res.status(204).send();
}
const patchClassTeachers = (req, res) => {
    const { classeId } = req.params;
    const { teachers_ids } = req.body;
    const validation = validadeTeachersIdArray(teachers_ids);
    if (!validation[0]) {
        return res.status(validation[1]).json(validation[2]);
    }
    updateClassNameOrDescriptionOrTeachers(classeId, undefined, undefined, teachers_ids);
    return res.status(204).send();
}

const deleteClass = (req, res) => {
    const { classeId } = req.params;
    removeClass(+classeId);
    return res.status(204).send();
}

const getAllTeachersClasses = (req, res) => {
    const { teachersId } = req.params;
    const teachersClasses = findAllTeachersClass(teachersId)

    const teachersName = findTeacherById(+teachersId).name
    if (teachersClasses.length === 0) {
        return res.status(404).json({ message: `Nenhuma aula encontrada com ${teachersName}` });
    }

    return res.status(200).json({ teachersName, teachersClasses })
}

const postNewClass = (req, res) => {
    const { teachersId } = req.params;
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ message: 'Class need to have at least a name and description' })
    }

    const newClassId = findCurrentClassId();

    const newClass = { id: newClassId, name, description, teachers_ids: [+teachersId] };

    pushNewClass(newClass);
    return res.status(201).send()
}

function validadeTeachersIdArray(teachers_ids) {
    if (!teachers_ids || !Array.isArray(teachers_ids)) {
        return [false, 400, { message: 'Please, you need to fill new teachers_ids and it needs to be an Array!' }]
    }
    for (const teacher_id of teachers_ids) {
        if (!findTeacherById(+teacher_id) || isNaN(+teacher_id)) {
            return [false, 404, { message: `There is no teacher with id ${teacher_id}` }]
        }
    }
    return [true]
}

module.exports = {
    getAllClasses,
    getClassById,
    putClass,
    patchClassName,
    patchClassDescription,
    patchClassTeachers,
    deleteClass,
    checkClassIdMiddleware,
    getAllTeachersClasses,
    postNewClass,
}