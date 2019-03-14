const db = require('../../config/database');
const LivroDao = require('../infra/livro-dao');

module.exports = (app) => {
    app.get('/', function (req, resp) {
        resp.send(`Bem vindo à Casa do Código!`);
    });

    app.get('/livros', function (req, resp) {

        const livroDao = new LivroDao(db);

        livroDao.list((erro, resultados) => { // callback que será executado quando completar a busca no banco

            resp.marko(
                require('../views/livros/lista/lista.marko'),
                {
                    livros: resultados
                }
            );
        });
    });

    app.get('/*', function (req, resp) {
        resp.status(404).send(`Sorry, can't get that`);
    });

};