// /utils/hashPassword.js
// This file contains utility function helping hash password
// By Pi Project Team
// April, 2020
import bcrypt from 'bcryptjs'

const hashPassword = (password) => {
    if (password.length < 8) {
        throw new Error('Password must be 8 characters or longer.')
    }

    return bcrypt.hash(password, 10)
}

export { hashPassword as default }