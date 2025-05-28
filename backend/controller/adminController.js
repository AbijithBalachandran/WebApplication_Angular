
const Admin  = require('../models/student');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const secretKey = require('../config/config');
const student = require('../models/student');




// ====================admin Login =================================

const adminLogin = async (req,res)=>{
     try {
        
        const {email,password} = req.body;
        const adminData = await Admin.findOne({email:email});

        if(adminData){
          const checkPassword = await bcrypt.compare(password,adminData.password)

          if(checkPassword && adminData.is_admin){
              
            const token = jwt.sign(
                {id:adminData._id ,email:adminData.email},
                secretKey ,
                {expiresIn:'1h'}
            )

            res.cookie('token',token,{
                httpOnly:true,
                secure:false,
                sameSite:'strict',
                maxAge: 60 * 60 * 1000
            });
               
             return res.status(200).json({message:'Login successfully ..!',
                token:token,
                student:student
          })
          }else{
             return res.status(400).json({message:'Invalid credentials...!'})
          }
        }{
             return res.status(400).json({message:'Invalid credentials....!'})
        }

     } catch (error) {
        console.error(error)
     }
}


// =============================== Dashboard with the all student details ==============================


const dashboardWithAllStudent = async(req,res)=>{
       try {
        
        const students = await Admin.find({});
        console.log(students)

        res.status(200).json({message:'enter to dashboard',students})

       } catch (error) {
        console.error(error);
        return res.status(500).json({message:'server error'});
       }
}


// ================================== update Student ==============================================

const updateStudent = async(req,res)=>{
    try {
      
       const slug = req.params.slug;

       const updatedData = {
          name:req.body.name,
          email:req.body.email,
          mobile:req.body.mobile
       }

       if(req.file){
          updatedData.profileImg = req.file.fileName;
       }

       const student = await Admin.findOneAndUpdate(
         {slug:slug},
         updatedData,
         {new:true}
      );

      if(!student){
         return res.status(404).json({message:'student not found'});
      }

      return res.status(200).json({message:'Update successfully..!'});

    } catch (error) {
      console.log(error);
      return res.status(500).json({message:'Internal server error'})
    }
}


//  =============================Delete Student Data +========================================================================


const deleteStudent = async(req,res)=>{
    
   try {

     const slug = req.params;

     await Admin.findOneAndDelete({slug:slug});

     res.status(200).json({message:'successfully delete the student'})
      
   } catch (error) {
      console.error(error);
      return res.status(500).json({message:'Internal server error'});
   }
}


module.exports = {
   adminLogin ,
   dashboardWithAllStudent,
   updateStudent,
   deleteStudent
}