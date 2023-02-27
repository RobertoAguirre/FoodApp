import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login(username: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // Simulate a login request to the server
      setTimeout(() => {
        if (username === 'user@mail.com' && password === 'password') {
          localStorage.setItem('isLoggedIn', 'true');
          resolve(true);
        } else {
          localStorage.removeItem('isLoggedIn');
          resolve(false);
        }
      }, 2000);
    });
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
  }
}
