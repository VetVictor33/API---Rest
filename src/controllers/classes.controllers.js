const { findClassById, findAllClasses, updateClass, removeClass, updateClassNameOrDescription } = require("../database/repository");


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
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).json({ message: 'To update the class you need to informa new name and description' })
    }

    const updatedClass = { id: +classeId, name, description };

    updateClass(classeId, updatedClass);

    return res.status(204).send()
}

const patchClass = (req, res) => {
    const { classeId } = req.params;
    const { name, description } = req.body;
    if (!name && !description || name && description) {
        return res.status(400).json({ message: 'You need to inform at at least one and only one: name or description' })
    }
    updateClassNameOrDescription(classeId, name, description);
    res.status(204).send();
}

const deleteClass = (req, res) => {
    const { classeId } = req.params;
    removeClass(+classeId);
    return res.status(204).send();
}

module.exports = {
    getAllClasses,
    getClassById,
    putClass,
    patchClass,
    deleteClass,
    checkClassIdMiddleware
}