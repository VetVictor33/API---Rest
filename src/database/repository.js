const database = require(".");

function findAllClasses() {
    return database.classes;
}

function findClassById(id) {
    return database.classes.find(classe => classe.id === +id);
}

function findCurrentClassId() {
    const lastElemntIndex = database.classes.slice(-1)[0].id;
    return lastElemntIndex + 1;

}

function updateClass(classeId, updatedClass) {
    const index = classeId - 1;
    database.classes[index] = updatedClass;
}
function updateClassNameOrDescription(classeId, newName, newDescription) {
    const index = classeId - 1;
    if (newName) {
        database.classes[index].name = newName;
    } else if (newDescription) {
        database.classes[index].description = newDescription;
    }
}

function removeClass(classeId) {
    const updatedDb = database.classes.filter(classe => classe.id !== +classeId);
    database.classes = updatedDb;
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
    updateClassNameOrDescription,
    removeClass,
    pushNewClass,
    findAllTeachers,
    findTeacherById,
}