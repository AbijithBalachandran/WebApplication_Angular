import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StudentService } from '../sevices/student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [RouterModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{


   student:any;
   
   constructor(private studentService :StudentService , private route:ActivatedRoute){};
 
   ngOnInit(): void {
     
     const slug = this.route.snapshot.paramMap.get("slug");
           if(slug){
         
            console.log('profile slug :',slug)
              this.studentService.studentDetail(slug).subscribe((student)=>{
                this.student = student;
              })
           }
       
   }

   
   
}
