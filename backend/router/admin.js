const express = require('express');
const admin_router = express.Router()

const upload = require("../config/multer")

const adminComtroller = require('../controller/adminController');


admin_router.post('/login',adminComtroller.adminLogin);
admin_router.get('/dashboard',adminComtroller.dashboardWithAllStudent);
admin_router.put('/edit/:slug',adminComtroller.updateStudent);
admin_router.delete('/delete/:slug',adminComtroller.deleteStudent);

module.exports = admin_router