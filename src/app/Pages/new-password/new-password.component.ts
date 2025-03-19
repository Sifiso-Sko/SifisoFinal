import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class NewPasswordComponent {
  // passwordForm: FormGroup = new FormGroup({
  //   password: new FormControl(""),
  //   confirmPassword: new FormControl("")
  // })
  //   ;

  // constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
  //   this.passwordForm = this.fb.group(
  //     {
  //       password: ['', [Validators.required, Validators.minLength(8)]],
  //       confirmPassword: ['', Validators.required],
  //     },
  //     { validators: this.passwordMatchValidator }
  //   );
  // }
  // passwordMatchValidator(form: FormGroup) {
  //   const password = form.get('password')?.value;
  //   const confirmPassword = form.get('confirmPassword')?.value;
  //   return password === confirmPassword ? null : { mismatch: true };
  // }


    passwordForm: FormGroup;
    showMessageBox = false;
   
    constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
      this.passwordForm = this.fb.group({
        password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
        confirmPassword: ['', Validators.required]
      }, { validators: this.passwordMatchValidator });
    }
   
    // Custom Validator: Checks password strength
    passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
      const password = control.value;
      if (!password) return null;
   
      const hasLowerCase = /[a-z]/.test(password);
      const hasUpperCase = /[A-Z]/.test(password);
      const hasNumber = /\d/.test(password);
      const hasMinLength = password.length >= 8;
   
      return hasLowerCase && hasUpperCase && hasNumber && hasMinLength ? null : { weakPassword: true };
    }
   
    // Custom Validator: Check if passwords match
    passwordMatchValidator(form: FormGroup): ValidationErrors | null {
      const password = form.get('password')?.value;
      const confirmPassword = form.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { mismatch: true };
    }
   
    // Show validation message box when user focuses on password field
    onFocus() {
      this.showMessageBox = true;
    }
   
    // Hide message box when user leaves the password field
    onBlur() {
      this.showMessageBox = false;
    }
   
    // Check validation for real-time updates
    getPasswordValidationStatus(rule: string): boolean {
      const password = this.passwordForm.get('password')?.value || '';
      switch (rule) {
        case 'lowercase': return /[a-z]/.test(password);
        case 'uppercase': return /[A-Z]/.test(password);
        case 'number': return /\d/.test(password);
        case 'length': return password.length >= 8;
        default: return false;
      }
    }

  onSubmit() {
    const email = localStorage.getItem("verifiedEmail"); // Retrieve stored email
    const password = this.passwordForm.get('password')?.value;
    const confirmPassword = this.passwordForm.get('confirmPassword')?.value;
    const apiurl = `http://localhost:8082/password-recovery/reset-password?password=${password}&confirmPassword=${confirmPassword}&email=${email}`;
    if (this.passwordForm.valid && email) {
      const payload = {
        email: email,
        password: this.passwordForm.value.password,
        newPassword: this.passwordForm.value.confirmPassword
      };
      //console.log('Form Submitted', this.passwordForm.value);
      this.http.post(apiurl, {}, { responseType: 'text' })
        .subscribe({
          next: (response) => {
            alert(response)
            //debugger
            localStorage.removeItem("verifiedEmail"); // Clear email after password reset
            this.router.navigate(['/passwordConfirmation']); // Redirect after password reset

          }
        }
        )
    }

  }
}