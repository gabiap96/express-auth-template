const User = require('./../../models/user');

const newUser = new User({
   email: "test@gmail.com",
   password: "test123"
});

newUser.save(function (user, err) {
    if(err) throw err;
    console.log('user saved: ', user);
});
