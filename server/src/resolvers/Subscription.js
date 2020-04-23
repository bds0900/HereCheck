// /src/Subscription.js
// This file contains all subscription resovler definition for primsa server
// By Pi Project Team
// April, 2020

const Subscription = {
    attendance: {
        subscribe(parent, args, { prisma }, info) {
            return prisma.subscription.attendance({
                where: {
                    node: {
                        time: args.time,
                        student: args.student,
                    }
                }
            }, info)
        }
    },


}

export { Subscription as default }