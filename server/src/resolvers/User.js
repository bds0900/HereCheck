// /src/User.js
// This file contains fragment relosvers for user type
// By Pi Project Team
// April, 2020
import getUserId from '../utils/getUserId'

const User = {
    email: {
        fragment: 'fragment userId on User { id }',
        resolve(parent, args, { request }, info) {
            const userId = getUserId(request, false)

            if (userId && userId === parent.id) {
                return parent.email
            } else {
                return null
            }
        }
    }
}

export { User as default }