const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
});
//
// userSchema.methods.encryptPassword = function (callback) {
//     const saltRounds = 10;
//     const myPlaintextPassword = this.password;
//     bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
//         this.password = hash
//     });
// };
//
// userSchema.methods.checkPassword = function (trialPassword) {
//     bcrypt.compare(trialPassword, this.password, (err, result) => {
//         return result;
//     });
// };
//
// userSchema.pre('save', function(next) {
//     this.encryptPassword(function () {
//         next();
//     });
// });

const User = mongoose.model('User', userSchema);
module.exports = User;
