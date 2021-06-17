const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const {SECRET_KEY}=require('../../config');
const User = require("../../models/User");
const { UserInputError } = require('apollo-server')
const {validatorRegisterInput} = require('../../utils/validators')
const {validatorLoginInput} = require('../../utils/validators')

function generateToken(user) {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username,
    }, SECRET_KEY, {
        expiresIn: "24H"
    })
}

module.exports = {
    Mutation: {
        async login(_, { email, password }) {
            const { valid, errors } = validatorLoginInput(email, password);

            if(!valid) {
                throw new UserInputError('Errors', { errors })

            }
            const user = await User.findOne({ email })
            
            if(!user) {
                errors.general = 'user not found';
                throw new UserInputError('Wrong credentials', { errors })
            }

            const match = await bcrypt.compare(password, user.password);

            if(!match) {
                errors.general = 'Wrong credentials';
                throw new UserInputError('Wrong credentials', { errors })
            }

            const token = generateToken(user);

            return {
                ...user._doc,
                id: user.id,
                token
            }
        },

        async register(_, {
            registerInput: {
                username, email, password
            }
        }, context, info) {
            const { valid, errors } = validatorRegisterInput(username, email, password)

            if(!valid) {
                throw new UserInputError('Errors', {
                    errors
                })
            }
            const user = await User.findOne({ email });

            if(user) {
                throw new UserInputError('this email is already resgistered', {
                    errors: {
                        email: 'This email is already in use'
                    }
                })
            }

            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                username, 
                email, 
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            const token = generateToken(res)

            return {
                ...res._doc,
                id: res.id,
                token
            }
        },
    }
}