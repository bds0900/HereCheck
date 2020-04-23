# HereCheck
![github-small](https://bds0900.github.io/ML2020/Logo.jpg)

## Overview
HereCheck is a fully automate attendance recording system. Taking the advantage of updating face recognition technology, our solution helps taking students/employees attendance with ease. HereCheck also provides a Web-App UI for instructors/employers to view and manage all the records. Time and effort will be saved. After uploading pictures of students/employees, the entire process will be done at the moment that people showing up in front of our camera devices.

Relevant users can always extract attendance data from the database as a basis for work or performance evaluation whenever they need it.


## The System
Components :

### Rasberry Pi
Capture images and do inference

### Server
Receive data from Raspberry Pi and record it in DB
the server will also include user validation function, user privilege function, record attendance function

### DB
Store all significant data for the system

### Manager UI
Display attendence records in real time, which will also include login page, faculty page and admin page.
login page is used for user login
faculty page is used to select program/courses and attendance sheet page
admin page is used for admin account, they can create programs, create courses, create user accounts, update and delete them.

## Specification
Hardware (Min. Requirement): 
    Raspberry Pi 4
    Raspberry Pi Camera Module
    Coral usb Accelerator
    Computer/Laptop (Sever + Database + UI display)

Software Module:
    Tensorflow (Python)
    Server (Javascript + Nodejs)
    UI (Javascript + HTML + CSS)

    
