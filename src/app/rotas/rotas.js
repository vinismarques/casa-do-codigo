const db = require('../../config/database');
const LivroDao = require('../infra/livro-dao');

/**
 * Exporta a função responsável pelas rotas. O parâmetro app que a função recebe é a aplicação Express.
 * O custom-express.js instancia o rotas.js e passa a aplicação Express como parâmetro. 
 */
module.exports = (app) => { 
    app.get('/', function (req, resp) {
        resp.send(`Bem vindo à Casa do Código!`);
    });

    app.get('/livros', function (req, resp) {
        const livroDao = new LivroDao(db);
        livroDao.list()
            .then((livros) => {
                resp.marko(require('../views/livros/lista/lista.marko'), {livros});
            })
            .catch((erro) => console.log(erro));
    });

    app.get('/livros/form', function (req, resp) {
        resp.marko(require('../views/livros/form/form.marko'));
    });

    app.post('/livros', function(req, resp) {
        const livroDao = new LivroDao(db);
        livroDao.adiciona(req.body)
            .then(resp.redirect('/livros'))
            .catch((erro) => console.log(erro));
    });

    app.get('/livros/busca/*', function (req, resp) {
        const livroDao = new LivroDao(db);
        const idLivro = req.params[0];
        livroDao.buscaId(idLivro)
            .then((livro) => resp.send(livro))
            .catch((erro) => console.log(erro));
    })

    app.get('/livros/atualiza/gratis/*', function (req, resp) {
        const livroDao = new LivroDao(db);
        const idLivro = req.params[0];
        livroDao.atualiza(idLivro)
            .then(resp.send('Livro atualizado com sucesso'))
            .catch((erro) => console.log(erro));
    })

    app.get('/livros/remove/*', function (req, resp) {
        const livroDao = new LivroDao(db);
        const idLivro = req.params[0];
        livroDao.remove(idLivro)
            .then((livro) => resp.send(`
                Livro ${idLivro} foi removido com sucesso
            `))
            .catch((erro) => console.log(erro));
    })

    app.get('/*', function (req, resp) {
        resp.status(404).send(`Sorry, can't get that`);
    });
};