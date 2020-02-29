module.exports.index = function (req, res) {
    res.render('user/index', {user: req.user});
};
