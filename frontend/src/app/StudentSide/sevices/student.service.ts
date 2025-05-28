import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http:HttpClient) { };

  signIn(studentData:any):Observable<any>{
    return this.http.post(`${this.baseUrl}`,studentData);
  }

  loging(credentials:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/login`,credentials,{withCredentials:true});
  }

  
  studentDetail(slug:string):Observable<any>{
    console.log('calling bakend with Id :',slug);
     return this.http.get(`${this.baseUrl}/profile/${slug}`, { withCredentials: true })
  }

  editStudent(slug:string):Observable<any>{
    console.log('calling backend with slug',slug);
    return this.http.get(`${this.baseUrl}/profile/edit/${slug}`, { withCredentials: true })
  }
  
  updateStudentProfile(slug:string,formData:FormData):Observable<any>{
    return this.http.put(`${this.baseUrl}/profile/edit/${slug}`,formData, { withCredentials: true });
  }

  logout():Observable<any>{
    return this.http.post(`${this.baseUrl}/logout`,{},{withCredentials:true});
  }


}
