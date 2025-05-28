import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../sevices/student.service';
import swal from 'sweetalert2';
import {Router, RouterModule} from '@angular/router' ;

 
interface Student{
  name:string;
  email:string;
  mobile:string;
  password:string
}

@Component({
  selector: 'app-signin',
  standalone:true,
  imports: [FormsModule,RouterModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent {
  
  student:Student={
    name:'',
    email:'',
    mobile:'',
    password:''
  };


  constructor(private studentService:StudentService ,private router:Router){};

  onSubmit(){
    this.studentService.signIn(this.student).subscribe(
     { next:res =>{
        swal.fire({
          icon:'success',
          title:'Sign In',
          text:"Student Sign in Successfully..!"
        })
        this.router.navigate(['/login'])
      },
      error:err=>{
        console.log('Error is',err);
        alert("error while sign in");
      }}

  );
  }

}
