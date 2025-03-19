import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginPageComponent } from "./Pages/login-page/login-page.component";
import { LayoutComponent } from './Pages/layout/layout.component';
import { NavBarComponent } from "./Pages/nav-bar/nav-bar.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'algo_bot_trading_app';
}
