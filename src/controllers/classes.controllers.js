const { findClassById, findAllClasses, updateClass, removeClass } = require("../database/repository");


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

const patchClass = (req, res) => {
    const { classeId } = req.params;
    const { name, description } = req.body;
    const classe = findClassById(classeId);

    if (!classe) {
        return res.status(404).json({ message: 'There is no class with that id' })
    }
    if (!name || !description) {
        return res.status(400).json({ message: 'To update the class you need to informa new name and description' })
    }

    const updatedClass = { id: +classeId, name, description };

    updateClass(classeId, updatedClass);

    return res.status(204).send()
}

const deleteClass = (req, res) => {
    const { classeId } = req.params;

    if (!findClassById(+classeId)) {
        return res.status(404).json({ message: 'There is no such class' })
    }

    removeClass(+classeId);
    return res.status(204).send();
}

module.exports = {
    getAllClasses,
    getClassById,
    patchClass,
    deleteClass
}