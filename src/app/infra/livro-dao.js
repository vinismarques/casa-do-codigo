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

    adiciona(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(
                `
                    INSERT INTO livros (
                        titulo,
                        preco, 
                        descricao
                    ) values (?,?,?)
                `,
                [
                    livro.titulo,
                    livro.preco,
                    livro.descricao
                ],
                function (err) {
                    if (err) {
                        console.log(err);
                        return reject('Não foi possível adicionar o livro!');
                    }
    
                    resolve();
                } 
            );
        });
    }

    buscaId(id) {
        return new Promise((resolve, reject) =>
            this._db.get(
                `
                    SELECT * 
                    FROM livros 
                    WHERE id = '${id}'
                `, 
                function (erro, livro) {
                    if (erro) return reject(erro);
                    resolve(livro);
                }
            )
        );
    }

    atualiza(id) {
        return new Promise((resolve, reject) => {
            this._db.run(
                `
                    UPDATE livros SET 
                    preco = 'Grátisss' 
                    WHERE id = '${id}'
                `, 
                function (erro, livro) {
                    if (erro) return reject(erro);
                    resolve();
                }
            )
        });
    }

    remove(id) {
        return new Promise((resolve, reject) =>
            this._db.get(
                `
                    DELETE FROM livros 
                    WHERE id = '${id}'
                `, 
                function (erro, result) {
                    if (erro) return reject(erro);
                    resolve();
                }
            )
        );
    }

}

module.exports = ListaDao;