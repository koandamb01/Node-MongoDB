const Collections = require('./mongo_db');
const Message = Collections.Message
const Comment = Collections.Comment

module.exports = {
    index: (req, res) => {
        Message.find({}, (err, messages) => {
            if (err) {
                console.log("error while fetching", err);
                res.redirect('/');
            } else {
                res.render('index', { msgs: messages });
            }
        });
    },

    CreateMessage: (req, res) => {
        Message.create(req.body, (err, data) => {
            if (err) {
                for (let key in err.errors) {
                    req.flash(key, err.errors[key].message);
                }
                res.redirect('/');
            }
            else {
                console.log('Successfully added a new Mongoose!')
                req.flash("success", "You have Successfully post a new message!");
                res.redirect('/');
            }
        });
    },

    CreateComment: (req, res) => {
        Comment.create(req.body, (err, data) => {
            if (err) {
                for (let key in err.errors) {
                    req.flash(key, err.errors[key].message);
                }
                res.redirect('/');
            }
            else {
                // find the message that was commented on
                Message.findOneAndUpdate({ _id: req.params.msg_id }, { $push: { comments: data } }, (err, data) => {
                    if (err) {
                        console.log("error while fetching", err);
                        res.redirect('/');
                    } else {
                        console.log('Successfully added a new Comment!')
                        req.flash("success", "You have Successfully post a new Comment!");
                        res.redirect('/');
                    }
                });
            }
        });
    }
}