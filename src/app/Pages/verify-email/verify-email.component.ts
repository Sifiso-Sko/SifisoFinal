import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [FormsModule, CommonModule], // Add CommonModule
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css'
})
export class VerifyEmailComponent {
  otp: string[] = ["", "", "", "", "", ""];
  ot: string = "";
  otp1: any;
  otp2: any;
  otp3: any;
  otp4: any;
  otp5: any;
  otp6: any;
  verificationType:string="";
  apiurl:any;

  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit(){
     this.verificationType= localStorage.getItem("verificationType")||"forgot-password";
  }

  moveFocus(event: any, index: number) {
    if (event.target.value.length === 1 && index < this.otp.length) {
      const nextInput = event.target.nextElementSibling;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  onVerify(otp1: any, otp2: any, otp3: any, otp4: any, otp5: any, otp6: any) {
    this.otp = [otp1, otp2, otp3, otp4, otp5, otp6];

    //const email: string = "khensanin2002@gmail.com";

    const email = localStorage.getItem("verifiedEmail"); // Retrieve stored email
    this.ot = this.otp.join(""); // Concatenate OTP values
    //directing different api for sign up and login

    if(this.verificationType === "forgot-password"){
       this.apiurl = `http://localhost:8082/password-recovery/verify-otp?email=${email}&otp=${this.ot}`;
    }
    else{
    this.apiurl = `http://localhost:8082/api/signUp/validate-otp?email=${email}&otp=${this.ot}`;
    }


    this.http.post(this.apiurl, {}, { responseType: 'text' }).subscribe({
      next: (response) => {
        alert(response+"");
       
        if (!response.includes("Invalid or expired OTP.")) {
          //localStorage.setItem("verifiedEmail", email); // Store email in localStorage to temporary  store the email so we can link the emails on different pages
         
          setTimeout(() => {
            if(this.verificationType==="forgot-password"){
              this.router.navigate(['/new-password']); 
            }
            if(this.verificationType==="Register"){
              this.router.navigate(['/Login']); 
            }           
          }, 1000); // Redirect to login after 2 seconds
        }
      }

    });
  }
  onResend(){
    if(this.verificationType==="forgot-password"){
      this.router.navigate(['/forgot-password']); 
    }
    if(this.verificationType==="Register"){
      this.router.navigate(['/Registration']); 
    }           

  }
}
