
const Student = require('../models/student');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = require('../config/config');
const generateSlug = require('../config/generateSlug');

//=============================================================================================================


//=================== password hashing ===========================

const sequirepassword = async(password)=>{
    try{
        const passwordHash = await bcrypt.hash(password,10);
        return passwordHash;
    }catch(error){
        throw error;
    }
    

}

//==============================Inserting Student (signing Student)========================================

const insertStudent = async(req,res)=>{
    try{
       const sPassword =  await sequirepassword(req.body.password);
       
       const slug = await generateSlug(req.body.name)

       const student = new Student({
        name:req.body.name,
        slug:slug,
        email:req.body.email,
        mobile:req.body.mobile,
        password:sPassword,
        is_admin:0,
       });

       const studentData = await student.save();
 
     return res.status(201).json({message:"student registered successfully",student});
         
    }catch(error){
       throw error;
    }
}




// ==================================Login  the user =========================================================================

const loginStudent = async(req,res)=>{
     try {
        
        const { email , password} = req.body;

       const studentData = await Student.findOne({email});

       if(studentData){
        const passwordMatch  = await bcrypt.compare(password,studentData.password);

        if(passwordMatch){
            
            const token =jwt.sign(
                {id:studentData._id,email:studentData.email},
                secretKey,
                {expiresIn:'1h'}
            );

            res.cookie('token',token,{
                httpOnly:true,
                secure:false,
                sameSite:'strict',
                maxAge: 60 * 60 * 1000
            });

            return res.status(200).json({message:"loging successfully",
                token:token,
                student:{
                    id:studentData._id,
                    name:studentData.name,
                    email:studentData.email,
                    mobile:studentData.mobile,
                    slug:studentData.slug
                }});


        }else{
          return  res.status(400).json({message:"Invalid credencials"})
        }
       }else{
         return res.status(400).json({message:"Invalid credencials"})
       }

     } catch (error) {
        throw error
     }
}


// ====================================== show the student welcome page =================================================

const studentDetails = async (req, res)=>{
    try {
        
         const slug = req.params.slug

        const student = await Student.findOne({slug});
         if(!student){
            return res.status(404).json({message:"Student not found"})
         }
       return res.status(201).json(student);
    } catch (error) {
        throw error;
    }

}

// =======================================Get the studnet profile edit page ===============================================

const getStudentEdit = async(req,res)=>{
    try {
        const slug  = req.params.slug;
       
        const student = await Student.findOne({slug});
       
        if(student){
            res.status(200).json({student});
        }else{
            res.status(404).json({message:'student not found'})
        }


    } catch (error) {
         console.error(error);
    }
}

//=======================================Edit the student details (Profile)=========================================================

const updateStudent = async(req,res)=>{

    try {
        
        const slug = req.params.slug;

        const updatedData = {
            name:req.body.name,
            email:req.body.email,
            mobile:req.body.mobile
        }

        if(req.file){
            updatedData.profileImg = req.file.filename; 
        }

        const student = await Student.findOneAndUpdate(
            {slug:slug},
            updatedData,
            {new:true}

        );

        if(!student){
            return res.status(404).json({error:"User not found"});
        }

         return res.status(200).json({message:"student updated successfully",student:student});

    } catch (error) {
        console.error("Error in update student profile")
        return res.status(500).json({ message: "Internal Server Error", error: error.message });

    }
}

// =====================================================student Logout =======================================================


const LogoutStudent = async(req,res)=>{
    res.clearCookie('token',{
        httpOnly:true,
        secure:false,
        sameSite:'strict',
    });

     return res.status(200).json({message:"Logout Successful"})
}








module.exports ={
    insertStudent,
    loginStudent,
    studentDetails,
    getStudentEdit,
    updateStudent,
     LogoutStudent
}
