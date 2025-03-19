import { CommonModule, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgIf],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {


  emailForm: FormGroup = new FormGroup({
    userName: new FormControl("", [Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)])
  })
  constructor(private http: HttpClient, private router: Router) {
  }
  OnSave() {
    localStorage.setItem("verificationType", "forgot-password");

    if (this.emailForm.valid) {
      const userEmail = this.emailForm.get('userName')?.value; // Get email value
      localStorage.setItem("verifiedEmail", userEmail); // Store email in localStorage to temporary  store the email so we can link the emails on different pages


      // const email = localStorage.getItem("verifiedEmail"); // Retrieve stored email

      const apiurl = `http://localhost:8082/password-recovery/send-otp?email=${userEmail}`;
      // const formValue = this.emailForm.value;
      this.http.post(apiurl, {}, { responseType: 'text' }).subscribe({
        next: (response) => {
          alert(response);
          //debugger;
          if (response != "Email not registered.") {
            setTimeout(() => {
              this.router.navigate(['/otp']);

            }, 1000);
          }
        },
      })


    }
  }
}





