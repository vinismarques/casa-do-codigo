class ListaDao {
    constructor(db) {
        this._db = db;
    }

    list(callback) {
        this._db.all('SELECT * FROM livros', 
            function (erro, resultados) {
                callback (erro, resultados)
            }
        )
    }

}

module.exports = ListaDao;