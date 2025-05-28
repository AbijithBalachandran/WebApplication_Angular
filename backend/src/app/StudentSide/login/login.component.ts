import { Component } from '@angular/core';
import { StudentService } from '../sevices/student.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginSuccess } from '../store/actions/auth.actions';


@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  student={
     email:'',
     password:''
  }

  constructor(private studentService:StudentService, 
    private router:Router,
    private store:Store
  ){};

  onSubmit(){
    console.log('login student :',this.student)
    this.studentService.loging(this.student).subscribe({
      next:res=>{
        alert(res.message);
        this.store.dispatch(loginSuccess({token:res.token ,student:res.student}));
        console.log(res.student)
        this.router.navigate(['/dashboard'])
      },
      error:err=>alert(err.error.message)
    })
  }

}
