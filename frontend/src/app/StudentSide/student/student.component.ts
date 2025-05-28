import { Component  ,OnInit} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectStudent } from '../store/selectors/auth.selectors';

@Component({
  selector: 'app-student',
  imports: [RouterModule],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
        
  studentName:string='';
  slug:string = '';
  constructor(private store:Store){};

  
  ngOnInit(){
    this.store.select(selectStudent).subscribe((student)=>{
      console.log('student from the store :',student);
      
      this.slug = student?.slug||'';
      console.log('student slug :',this.slug);
      this.studentName = student?.name||'Student';
    })
   
  }

}
