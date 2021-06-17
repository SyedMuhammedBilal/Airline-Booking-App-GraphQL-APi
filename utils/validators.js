module.exports.validatorRegisterInput = (
    username,
    email,
    password
) => {
    const errors = {};

    if(username.trim() === '') {
        errors.username = 'username connot be empty'
    }
    if(email.trim() === '') {
        errors.email = 'email connot be empty'
    } else {
        const regEx =  /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

        if(!email.match(regEx)) {
            errors.email = 'Email must be a valid email address'
        }
    }
    if(password === '') {
        errors.password = 'password connot be empty'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validatorLoginInput = (
    email,
    password
) => {
    const errors = {};

    if(email.trim() === '') {
        errors.email = 'email connot be empty'
    }

    if(password.trim() === '') {
        errors.password = 'password connot be empty'
    }

    return {
        errors,
        valid: Object.keys(errors.length < 1), 
    }
}