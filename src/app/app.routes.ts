//import { Routes } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { RegistrationPageComponent } from './Pages/registration-page/registration-page.component';
import { AboutUsComponent } from './Pages/about-us/about-us.component';
import { LandingPageComponent } from './Pages/landing-page/landing-page.component';
//import { EmailVerificationComponent } from './Pages/email-verification/email-verification.component';
import { NgModule } from '@angular/core';

import {VerifyEmailComponent} from './Pages/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './Pages/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './Pages/new-password/new-password.component';
import { PasswordUpdateComponent } from './Pages/password-update/password-update.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';


export const routes: Routes = [

    {
        path: '',
        redirectTo: 'landingPage',
        pathMatch: "full"
    },

    {
        path: 'Registration',
        component: RegistrationPageComponent
    },

    {
        path: 'Login',
        component: LoginPageComponent

    },
    {
        path: 'AboutUs',
        component: AboutUsComponent
    },
    {
        path: 'landingPage',
        component:LandingPageComponent
    },
  {
    path: 'otp', component: VerifyEmailComponent
  } ,

  {

    path: 'forgot-password',
    component: ForgotPasswordComponent
  }
 ,
  {
  path: 'new-password',
  component: NewPasswordComponent
  },
  {
    path: 'passwordConfirmation',
    component: PasswordUpdateComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {path:'dashboard',
    component:DashboardComponent
  }

];
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}



