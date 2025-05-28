
const express = require('express');
const student_router = express.Router();
const upload = require('../config/multer')


const studentController = require('../controller/studentController');
const verifyToken = require('../middleware/jwtVerification')

student_router.post('/',studentController.insertStudent);
student_router.post('/login',studentController.loginStudent);
student_router.get('/profile/:slug',verifyToken,studentController.studentDetails);
student_router.get('/profile/edit/:slug',verifyToken,studentController.getStudentEdit)
student_router.put('/profile/edit/:slug',verifyToken,upload.single('image'),studentController.updateStudent);
student_router.post('/logout',studentController.LogoutStudent);


module.exports = student_router;