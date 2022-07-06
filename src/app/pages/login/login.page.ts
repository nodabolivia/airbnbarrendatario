import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.nullValidator]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(private router: Router, private apiService: AuthService) {}
  login() {
    const isInvalidEmail = this.formLogin.controls.email.invalid;
    const isInvalidPassword = this.formLogin.controls.password.invalid;
    // if (isInvalidEmail === false && isInvalidPassword === false) {
      const tempEmail = this.formLogin.get('email').value.toLowerCase();
      const tempPassword = this.formLogin.get('password').value;
      this.apiService.postLogin(tempEmail, tempPassword).subscribe((response) => {
        if (response.res === 'success') {
          // ['/room/' + roomId]
          const userId = response.data.id;
          this.router.navigate(['/home/'+userId]);
          console.log(response);
        }
      });
    // }

  }


  ngOnInit() {}
}
