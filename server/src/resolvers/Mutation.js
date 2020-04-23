// /src/Mutation.js
// This file contains all mutation resolver functions for prisma server
// By Pi Project Team
// April, 2020
import bcrypt from 'bcryptjs'
import getUserId from '../utils/getUserId'
import generateToken from '../utils/generateToken'
import hashPassword from '../utils/hashPassword'
import { forwardTo } from 'prisma-binding'

const Mutation = {
    createStudent: forwardTo('db'),
    updateStudent: forwardTo('db'),
    createProgram: forwardTo('db'),
    updateProgram: forwardTo('db'),
    createCourse: forwardTo('db'),
    updateCourse: forwardTo('db'),
    //createEnrollment: forwardTo('db'),
    //updateEnrollment: forwardTo('db'),
    createClass: forwardTo('db'),
    updateClass: forwardTo('db'),
    deleteClass: forwardTo('db'),
    deleteInstructing: forwardTo('db'),
    //createInstructing: forwardTo('db'),
    //updateInstructing: forwardTo('db'),
    deleteAttendance: forwardTo('db'),


    async login(parent, args, { prisma }, info) {
        const user = await prisma.query.faculty({
            where: {
                email: args.data.email
            }
        })

        if (!user) {
            throw new Error('Unable to login')
        }

        const isMatch = await bcrypt.compare(args.data.password, user.password)

        if (!isMatch) {
            throw new Error('Unable to login')
        }

        return {
            Faculty: user,
            token: generateToken(user.id)
        }
    },
    async createFaculty(parent, args, { prisma }, info) {
        const password = await hashPassword(args.data.password)
        const faculty = await prisma.mutation.createFaculty({
            data: {
                ...args.data,
                password
            }
        })

        return faculty

        // return {
        //     faculty,
        //     token: generateToken(faculty.id)
        // }
    },
    async updateFaculty(parent, args, { prisma }, info) {
        const password = await hashPassword(args.data.password)
        const faculty = await prisma.mutation.updateFaculty({
            data: {
                ...args.data,
                password
            },
            where: {
                id: args.where.id,
            }
        })

        return faculty

        // return {
        //     faculty,
        //     token: generateToken(faculty.id)
        // }
    },


    async createAttendance(parent, args, { prisma }, info) {
        var MS_PER_MINUTE = 60000
        var earlyArriveOffSetInMinutes = 10

        const parsedTime = new Date(args.data.time)
        const earlyArriveOffSetTime = new Date(parsedTime.getTime() + earlyArriveOffSetInMinutes * MS_PER_MINUTE)

        const classList = await prisma.query.classes(null, "{id, course{ id }, room, startTime, endTime}")
        var attendance = null
        for (var i = 0; i < classList.length; i++) {
            var startTime = new Date(classList[i].startTime)
            var endTime = new Date(classList[i].endTime)

            if (earlyArriveOffSetTime > startTime && parsedTime < endTime && args.data.room === classList[i].room) {
                console.log("created")
                attendance = await prisma.mutation.createAttendance({
                    data: {
                        time: args.data.time,
                        course: {
                            connect: {
                                id: classList[i].course.id
                            }
                        },
                        student: {
                            connect: {
                                id: args.data.student
                            }
                        },
                        class: {
                            connect: {
                                id: classList[i].id
                            }
                        }
                    }
                })
                break;
            }
        }
        return attendance
    },

    async createInstructing(parent, { data }, { prisma }, info) {
        const exists = await prisma.exists.Instructing({
            course: {
                id: data.course.connect.id
            },
            faculty: {
                id: data.faculty.connect.id
            }
        })
        if (exists) {
            throw new Error("This entry is existed")
        } else {
            return prisma.mutation.createInstructing({ data: data }, info)
        }
    },
    async updateInstructing(parent, { where, data }, { prisma }, info) {
        const thisInstructing = prisma.query.Instructing(where, "course{ id }, faculty{ id }")
        var exists = false
        if (data.course && data.faculty) {
            exists = prisma.exists.Instructing({
                course: {
                    id: data.course.connect.id
                },
                faculty: {
                    id: data.faculty.connect.id
                }
            })
        } else if (data.course) {
            exists = prisma.exists.Instructing({
                course: {
                    id: data.course.connect.id
                },
                faculty: {
                    id: thisInstructing.faculty.id
                }
            })
        } else if (data.faculty) {
            exsits = prisma.exists.Instructing({
                course: {
                    id: thisInstructing.course.id
                },
                faculty: {
                    id: data.faculty.connect.id
                }
            })
        }

        if (exists) {
            throw new Error("This entry is existed")
        } else {
            return prisma.mutation.updateInstructing({
                where: where,
                data: data
            })
        }
    },
    async createEnrollment(parent, { data }, { prisma }, info) {
        const exists = await prisma.exists.Enrollment({
            course: {
                id: data.course.connect.id
            },
            student: {
                id: data.student.connect.id
            }
        })
        if (exists) {
            throw new Error("This entry is existed")
        } else {
            return prisma.mutation.createEnrollment({ data: data }, info)
        }
    },
    async updateEnrollment(parent, { where, data }, { prisma }, info) {
        const thisEnrollment = prisma.query.Enrollment(where, "course{ id }, faculty{ id }")
        var exists = false
        if (data.course && data.student) {
            exists = prisma.exists.Enrollment({
                course: {
                    id: data.course.connect.id
                },
                student: {
                    id: data.student.connect.id
                }
            })
        } else if (data.course) {
            exists = prisma.exists.Enrollment({
                course: {
                    id: data.course.connect.id
                },
                student: {
                    id: thisEnrollment.student.id
                }
            })
        } else if (data.student) {
            exsits = prisma.exists.Enrollment({
                course: {
                    id: thisEnrollment.course.id
                },
                student: {
                    id: data.student.connect.id
                }
            })
        }

        if (exists) {
            throw new Error("This entry is existed")
        } else {
            return prisma.mutation.updateEnrollment({
                where: where,
                data: data
            })
        }
    },
}

export { Mutation as default }