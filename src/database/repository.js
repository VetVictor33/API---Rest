const database = require(".");

function findAllClasses() {
    return database.classes;
}

function findClassById(id) {
    return database.classes.find(classe => classe.id === +id);
}

function findCurrentClassId() {
    return database.classes.length + 1
}

function updateClass(classId, updatedClass) {
    const index = classId - 1;
    database.classes[index] = updatedClass;
}

function pushNewClass(newClass) {
    database.classes.push(newClass)
}

function findAllTeachers() {
    return database.teachers
}

function findTeacherById(id) {
    return database.teachers.find((teacher) => teacher.id === +id);
}

module.exports = {
    findAllClasses,
    findClassById,
    findCurrentClassId,
    updateClass,
    pushNewClass,
    findAllTeachers,
    findTeacherById,
}