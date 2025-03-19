import { CommonModule, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, NgIf],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.css'
})
export class RegistrationPageComponent {
  signUpForm: FormGroup;
 
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.signUpForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^[A-Za-z]+(?: [A-Za-z]+)*$') // Allows only letters and spaces
        ]
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^[A-Za-z]+(?: [A-Za-z]+)*$') // Allows only letters and spaces
        ]
      ],
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\W).{8,}$")
      ]),
      confirmPassword: new FormControl('', [Validators.required])
    },
    { validators: this.passwordsMatchValidator });
  }
 
  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }
 
  get firstName() { return this.signUpForm.get('firstName'); }
  get lastName() { return this.signUpForm.get('lastName'); }
  get email() { return this.signUpForm.get('email'); }
  get password() { return this.signUpForm.get('password'); }
  get confirmPassword() { return this.signUpForm.get('confirmPassword'); }
 
  trader: any = {
    "firstName": "",
    "lastName": "",
    "email": "",
    "password": "",
    "confirmPassword": ""
  };
 
  onSignUp() {
    if (this.signUpForm.invalid) {
      alert("Please fill out the form correctly.");
      return;
    }
    const apiurl = `http://localhost:8082/api/signUp/create`;
    // http://localhost:8082/api/signUp/create
    const userEmail=this.signUpForm.get('email')?.value;
    localStorage.setItem("verifiedEmail", userEmail);
    localStorage.setItem("verificationType", "Register");
 
    this.http.post(apiurl, this.signUpForm.value, { responseType: 'text' }).subscribe({
      next: (response) => {
        alert(response);
        if(response==="OTP sent to "+userEmail){
         setTimeout(() => {
          this.router.navigate(['/otp']); // Redirect to login after 2 seconds
        }, 2000);
      }
      }
 
    });
  }
}