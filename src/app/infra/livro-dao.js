class ListaDao {
    constructor(db) {
        this._db = db;
    }

    list() {
        return new Promise((resolve, reject) =>
            this._db.all('SELECT * FROM livros', 
                function (erro, resultados) {
                    if (erro) reject(erro);
                    else resolve(resultados);
                }
            )
        );
    }

}

module.exports = ListaDao;