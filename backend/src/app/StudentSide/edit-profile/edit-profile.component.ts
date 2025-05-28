import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../sevices/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { updateStudentProfileSuccess } from '../store/actions/student.action';
import { loginSuccess } from '../store/actions/auth.actions';
import { selectToken } from '../store/selectors/auth.selectors';
import { take } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  imports: [FormsModule ,CommonModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  
  
student:any ={};
selectedFile:File|null = null;
profileImageUrl : string = '';


@ViewChild('fileInput') fileInput !: ElementRef<HTMLInputElement>;

  constructor(private studentService:StudentService,
     private route:ActivatedRoute ,
    private router: Router,
    private store:Store){};

    token:string = '';
    
   ngOnInit(): void {

    this.store.select(selectToken).pipe(take(1)).subscribe(token=>{
      this.token = token ||'';
    })

    const slug = this.route.snapshot.paramMap.get('slug');

     if(slug){
    this.studentService.editStudent(slug).subscribe({
      next:(res)=>{
        this.student = res.student;
        
        this.updateprofileImage();

        console.log('student loaded in profile edit page:',this.student)
      },
      error:(err)=>console.error("Error in edit profile:",err)

    })
  }

   }


   updateprofileImage(){
    
    if (this.student.profileImg) {
      this.profileImageUrl = `http://localhost:3000/uploads/${this.student.profileImg}`;
    } else {
      this.profileImageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(this.student.name || 'User')}`;
    }
    
   }


  triggerFileInput(){
     this.fileInput.nativeElement.click();
  }


  onFileSelected(event:Event){
    const file = (event.target as HTMLInputElement).files?.[0];

    if(file){
      
      this.selectedFile = file;  

      const reader = new FileReader();
      reader.onload = (e:any) =>{
        this.profileImageUrl = e.target.result;
      };
      reader.readAsDataURL(file);

    }
  }
  

  uploadProfile(){

     const slug = this.route.snapshot.paramMap.get('slug');
      if(!slug) return;

       const formData = new FormData();
       formData.append('name',this.student.name);
       formData.append('email',this.student.email);
       formData.append('mobile',this.student.mobile);

       if(this.selectedFile){
        formData.append('image',this.selectedFile);
       }
  

  this.studentService.updateStudentProfile(slug,formData).subscribe({

    next:(res) =>{console.log('Profile update successfully',res);
      this.store.dispatch(loginSuccess({
        student: res.student,
        token: this.token
      }));
      this.router.navigate(['/profile', slug]);
    },
    error:(err) =>{console.error('Profile update failed',err)}
  }
  )
  
}

}