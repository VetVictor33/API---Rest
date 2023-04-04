const database = {
    teachers: [
        { id: 1, name: 'Ruli' },
        { id: 2, name: 'Elias' },
        { id: 3, name: 'Dani' },
        { id: 4, name: 'Guido' }
    ],
    classes: [
        { id: 1, name: 'Introdução ao HTML e CSS', description: 'Primeiros passos no FrontEnd', teachers_id: [1, 3] },
        { id: 2, name: 'Introdução ao JavaScript', description: 'Primeiros passos no BackEnd', teachers_id: [2, 4] },
        { id: 3, name: 'Introdução ao React', description: 'Entendendo os componentes', teachers_id: [1, 3] },
        { id: 4, name: 'Introdução ao Express.js', description: 'Instanciando o Express', teachers_id: [2, 4] }
    ]
}

module.exports = database