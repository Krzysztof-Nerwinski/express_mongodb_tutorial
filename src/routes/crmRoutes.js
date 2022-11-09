const routes = (app) => {
    app.route('/')

        .get((req, res) => {
            res.send(`This is a get method`)
        })

        .post((req, res) => {
            res.send('This is a post method')
        })

        .put((req, res) => {
            res.send('This is a put method')
        })

        .delete((req, res) => {
            res.send('This is a delete method')
        })
};

module.exports = routes;
