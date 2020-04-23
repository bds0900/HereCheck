// /utils/getUserId.js
// This file contains utility function helping verify user info contained within requests
// By Pi Project Team
// April, 2020
import jwt from 'jsonwebtoken'

const getUserId = (request, requireAuth = true) => {
    const header = request.request ? request.request.headers.authorization : request.connection.context.Authorization

    if (header) {
        const token = header.replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        return decoded.userId
    }

    if (requireAuth) {
        throw new Error('Authentication required')
    }

    return null
}

export { getUserId as default }