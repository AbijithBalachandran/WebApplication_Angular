import { Routes } from '@angular/router';
import { SigninComponent } from './StudentSide/signin/signin.component';
import { LoginComponent } from './StudentSide/login/login.component';
import { StudentComponent } from './StudentSide/student/student.component';
import { ProfileComponent } from './StudentSide/profile/profile.component';
import { EditProfileComponent } from './StudentSide/edit-profile/edit-profile.component';
import { AuthGuard } from './StudentSide/guards/auth.guard';
import { LogoutComponent } from './StudentSide/logout/logout.component';
import { GuestGuard } from './StudentSide/guards/guest.guard';

export const routes: Routes = [
    {path:'',component:SigninComponent,canActivate:[GuestGuard]},
    {path:'login',component:LoginComponent,canActivate:[GuestGuard]},
    {path:'dashboard',component:StudentComponent,canActivate:[AuthGuard]},
    {path:'profile/:slug',component:ProfileComponent,canActivate:[AuthGuard]},
    {path:'profile/edit/:slug',component:EditProfileComponent,canActivate:[AuthGuard]},
    {path:'logout',component:LogoutComponent}
];
