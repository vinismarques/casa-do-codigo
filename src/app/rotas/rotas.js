const db = require('../../config/database');
const LivroDao = require('../infra/livro-dao');

module.exports = (app) => {
    app.get('/', function (req, resp) {
        resp.send(`Bem vindo à Casa do Código!`);
    });

    app.get('/livros', function (req, resp) {

        const livroDao = new LivroDao(db);

        livroDao.list()
            .then((result) => {
                resp.marko(require('../views/livros/lista/lista.marko'), {livros: result});
            })
            .catch((erro) => console.log(erro));
    });

    app.get('/*', function (req, resp) {
        resp.status(404).send(`Sorry, can't get that`);
    });

};