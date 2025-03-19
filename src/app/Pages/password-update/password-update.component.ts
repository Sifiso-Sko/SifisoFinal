
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-password-update',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './password-update.component.html',
  styleUrl: './password-update.component.css'
})
export class PasswordUpdateComponent {
  constructor(private router: Router) {
    
  }
  goToPasswordUpdate(){

    this.router.navigate(['/passwordConfirmation']);
    }
  }
