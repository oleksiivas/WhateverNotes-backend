const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({
            email
        })
        .then(user => {
            if (!user) {
                const err = new Error('Invalid username/password')
                return res.status(401).send({
                    error: err
                })
            }
            bcrypt.compare(password, user.password)
                .then(match => {
                    if (!match) {
                        const err = new Error('Invalid username/password')
                        return res.status(401).send({
                            error: err
                        })
                    }
                    return res.status(200).send({
                        message: "login succesful"
                    })
                })
        })
}

//not sure if it is correct the postSignup

exports.postSignup = (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email})
        .then(user => {
            if (user){
                const err = new Error('Username is taken')
            return res.status(409).send({
                error: err
            
            })
        }
            return bcrypt
            .hash(password, 12)
            .then(hashed => {
                const user = new User({
                    firstName,
                    lastName,
                    email,
                    password: hashed
                })
                return user.save()
            })
            .then(user => {
                res.status(201).send({
                    message: "A new user was created"
                })
            })
        })


        .catch(err => {
                console.log(err);
            });
        };
