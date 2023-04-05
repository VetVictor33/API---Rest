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
function updateClassNameOrDescriptionOrTeachers(classeId, newName, newDescription, newTeachers) {
    const index = classeId - 1;
    if (newName) {
        database.classes[index].name = newName;
    } else if (newDescription) {
        database.classes[index].description = newDescription;
    } else if (newTeachers) {
        const teachersIds = [];
        newTeachers.forEach(teachers => teachersIds.push(+teachers));
        database.classes[index].teachers_ids = teachersIds;
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

function findAllTeachersClass(teachersId) {
    const classes = findAllClasses();
    const teachersClasses = classes.filter(classe => classe.teachers_ids.indexOf(+teachersId) !== -1);
    return teachersClasses
}

module.exports = {
    findAllClasses,
    findClassById,
    findCurrentClassId,
    updateClass,
    updateClassNameOrDescriptionOrTeachers,
    removeClass,
    pushNewClass,
    findAllTeachers,
    findTeacherById,
    findAllTeachersClass
}