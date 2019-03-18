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

    app.get('/livros/form', function(req, resp) {
        resp.marko(require('../views/livros/form/form.marko'), { livro: {} });
    });

    app.post('/livros', function(req, resp) {
        const livroDao = new LivroDao(db);
        livroDao.adiciona(req.body)
            .then(resp.redirect('/livros'))
            .catch((erro) => console.log(erro));
    });

    app.get('/livros/form/:id', function(req, resp) {
        const id = req.params.id;
        const livroDao = new LivroDao(db);
    
        livroDao.buscaId(id)
            .then(livro => 
                resp.marko(
                    require('../views/livros/form/form.marko'),
                    { livro: livro }
                )
            )
            .catch(erro => console.log(erro));
    });

    app.put('/livros', function (req, resp) {
        const livroDao = new LivroDao(db);

        livroDao.atualiza(req.body)
            .then(resp.redirect('/livros'))
            .catch((erro) => console.log(erro));
    });

    app.delete('/livros/:id', function(req, resp) {
        const id = req.params.id;
    
        const livroDao = new LivroDao(db);
        livroDao.remove(id)
            .then(() => resp.status(200).end())
            .catch(erro => console.log(erro));
    
    });

    app.get('/*', function (req, resp) {
        resp.status(404).send(`Sorry, can't get that`);
    });
};