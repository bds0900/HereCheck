import React, { Component } from 'react'


export interface ProgramType {
    id: string;
    name: string;
    courses: CourseType[];
    faculties: FacultyType[];
    students: StudentType[];   
}

export interface CourseType{
    id: string;
    name: string;
    numOfStudent: number;
    program: ProgramType;
    enrollments: EnrollmentType[];
    instructings:InstructingType[];
    attendances:Array<AttendanceType>;// same with Attendance[]
    classes:ClassType[];
}

export interface StudentType{
    id: string
    FirstName: string
    LastName: string
    email: string
    password: string
    status: string
    program: ProgramType
    enrollments: EnrollmentType[]
    attendances: AttendanceType[]
}

export interface FacultyType{
    id: string
    FirstName: string
    LastName: string
    email: string
    password: string
    status: string
    program: ProgramType
    instructings: InstructingType[]

}

export interface ClassType{
    id: string
    course: CourseType
    room: string
    startTime: string
    endTime: string
}

export interface EnrollmentType{
    id: string
    course: CourseType
    student: StudentType
}

export interface InstructingType{
    id: string
    course: CourseType
    faculty: FacultyType
}

export interface AttendanceType{
    id: string
    course: CourseType
    student: StudentType
    time: string
    class:ClassType
}

export const type = {
    program: "Program",
    course: "Course",
    student: "Student",
    faculty: "Faculty",
    enrollment: "Enrollment",
    instructing: "Instructing",
    attendance: "Attendance",
}



export interface AttendanceSubscriptionPayload {
    mutation: MutationType
    node: AttendanceType
    updatedFields: string[]
    previousValues: AttendancePreviousValues
}

export enum  MutationType {
    CREATED,
    UPDATED,
    DELETED,
}
export interface AttendancePreviousValues{
    id: string
    time: string
}

export enum Role {
    SUPERADMIN="SUPERADMIN", 
    ADMIN="ADMIN",
    USER="USER"
}

export interface CourseSubscriptionPayload{
    mutation: MutationType
    node: CourseType
    updatedFields: string[]
    previousValues: CoursePreviousValues
}
export interface CoursePreviousValues{
    id: string
    time: string
    numOfStudent:number
}
export interface ClassSubscriptionPayload{
    mutation: MutationType
    node: ClassType
    updatedFields: string[]
    previousValues: ClassPreviousValues
}
export interface ClassPreviousValues{
    id: string
    room: string
    startTime: string
    endTime: string
}
export interface AttendanceSubscriptionPayload{
    mutation: MutationType
    node: AttendanceType
    updatedFields: string[]
    previousValues: AttendancePreviousValues
}
export interface AttendancePreviousValues{
    id: string
    time: string
}