// /src/Query.js
// This file contains all query resolver funtions for prisma server
// By Pi Project Team
// April, 2020
import { forwardTo } from 'prisma-binding'

const Query = {
    faculties: forwardTo('db'),
    faculty: forwardTo('db'),
    students: forwardTo('db'),
    student: forwardTo('db'),
    program: forwardTo('db'),
    programs: forwardTo('db'),
    enrollment: forwardTo('db'),
    enrollments: forwardTo('db'),
    course: forwardTo('db'),
    courses: forwardTo('db'),
    attendances: forwardTo('db'),
    attendance: forwardTo('db'),
    classes: forwardTo('db'),
    class: forwardTo('db'),
    instructings: forwardTo('db'),
    instructing: forwardTo('db'),



    // users(parent, args, { prisma }, info) {
    //     const opArgs = {
    //         first: args.first,
    //         skip: args.skip,
    //         after: args.after,
    //         orderBy: args.orderBy
    //     }

    //     if (args.query) {
    //         opArgs.where = {
    //             OR: [{
    //                 name_contains: args.query
    //             }]
    //         }
    //     }

    //     return prisma.query.users(opArgs, info)
    // },
    // me(parent, args, { prisma, request }, info) {
    //     const userId = getUserId(request)

    //     return prisma.query.user({
    //         where: {
    //             id: userId
    //         }
    //     })
    // }
}

export { Query as default }