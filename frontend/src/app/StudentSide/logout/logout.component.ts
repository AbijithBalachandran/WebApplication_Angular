import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { StudentService } from '../sevices/student.service';
import { Store } from '@ngrx/store';
import {logout} from '../store/actions/auth.actions'

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

   constructor(
     private studentService:StudentService,
     private store:Store,
     private router:Router
   ){};

   ngOnInit():void{
     this.studentService.logout().subscribe({
       next:()=>{
        this.store.dispatch(logout());
        this.router.navigate(['/login']);
       },
       error:()=>{
         this.store.dispatch(logout());
         this.router.navigate(['/login']);
       }
     });
   }
}