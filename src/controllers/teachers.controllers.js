const { findTeacherById, findAllTeachers } = require("../database/repository");

const checkTeachrsdMiddleware = (req, res, next) => {
    const { teachersId } = req.params
    if (!findTeacherById(+teachersId)) {
        return res.status(404).json({ message: "There is no such teacher" })
    }
    return next()
}

const getAllTeachers = (req, res) => {
    const teachers = findAllTeachers();
    res.status(200).json(teachers);
}

const getTeacherById = (req, res) => {
    const { teachersId } = req.params
    const teacher = findTeacherById(+teachersId);
    return res.status(200).json(teacher);
}

module.exports = {
    checkTeachrsdMiddleware,
    getAllTeachers,
    getTeacherById,
}