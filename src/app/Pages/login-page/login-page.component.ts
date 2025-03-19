import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-login-page',
  standalone: true, // ✅ Standalone component
  imports: [FormsModule, CommonModule], // ✅ Include FormsModule for ngModel
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
 
  constructor(private router: Router, private http: HttpClient) {}
 
  onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password';
      return;

    }
    const loginUrl = `http://localhost:8082/api/login/?email=${this.email}&password=${this.password}`;
 
    this.http.get(loginUrl, { responseType: 'text' }).subscribe({
     next: (response) => {
        alert(response); // Show success message

      if(response.includes("successfully Logged in")){
      setTimeout(() => {
        this.router.navigate(['/dashboard'])
      }, 1000);
    }
  }})
  //       this.router.navigate(['/dashboard']); // Navigate to dashboard after login
  //     }
  // });
 
    
  }
}

// .subscribe({
//   next:(response)=>{
//     alert(response)
//     if(response.includes("successfully Logged in")){
//       setTimeout(() => {
//         this.router.navigate(['/dashboard'])
//       }, 1000);