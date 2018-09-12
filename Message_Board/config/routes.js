const Controllers = require('./controller');

module.exports = (app) => {
    // Routes
    app.get('/', (req, res) => {
        Controllers.index(req, res);
    });

    // create a new message document
    app.post('/post_message', (req, res) => {
        Controllers.CreateMessage(req, res);
    });

    // create a Comment message document
    app.post('/post_comment/:msg_id', (req, res) => {
        Controllers.CreateComment(req, res);
    });
}