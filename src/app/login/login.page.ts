import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  /*   username: string;
  password: string;
  errorMessage: string; */
  errorMessage: any;

  loginForm: FormGroup;

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  /*   login() {
    // Replace this with your own authentication logic
    const username = this.loginForm.controls['email'].value;
    const password = this.loginForm.controls['password'].value;
    if (username === 'user@mail.com' && password === 'password') {
      this.authService.login();
      this.router.navigate(['/dishes-list']);
    }
  }
 */
  login() {
    const username = this.loginForm.controls['email'].value;
    const password = this.loginForm.controls['password'].value;
    this.authService.login(username, password).then((result) => {
      if (result) {
        console.log('Login successful!');
        this.router.navigate(['/dishes']);
      } else {
        console.log('Login failed!');
        this.errorMessage = 'Invalid login credentials';
      }
    });
  }
}
