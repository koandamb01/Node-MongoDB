const Controllers = require('../controllers/controllers');

module.exports = (app) => {

    // Routes
    app.get('/', (req, res) => {
        Controllers.index(req, res);
    });

    app.get('/mongooses/new', (req, res) => {
        res.render('new');
    });

    app.get('/mongooses/:id', (req, res) => {
        Controllers.show_mongoose(req, res);
    });

    app.get('/mongooses/edit/:id', (req, res) => {
        Controllers.edit_mongoose(req, res);
    });


    //  add new mongoose to the database
    app.post('/mongooses', (req, res) => {
        Controllers.process_new_mongoose(req, res);
    });


    // Delete a mongoose
    app.post('/mongooses/destroy/:id', (req, res) => {
        Controllers.delete_mongoose(req, res);
    });


    // Update mongoose information
    app.post('/mongooses/:id', (req, res) => {
        Controllers.update_mongoose(req, res);
    });

}
