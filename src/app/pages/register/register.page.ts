import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  formRegister = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.nullValidator]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
  });
  constructor(private router: Router,public navCtrl: NavController, private apiService: AuthService) {}

  ngOnInit() {}

  register() {
    const isInvalidEmail = this.formRegister.controls.email.invalid;
    const isInvalidPassword = this.formRegister.controls.password.invalid;
    const isInvalidName = this.formRegister.controls.name.invalid;
    const isInvalidPhone = this.formRegister.controls.phone.invalid;
    // if (isInvalidEmail === false && isInvalidPassword === false && isInvalidName === false && isInvalidPhone===false) {
      const tempEmail = this.formRegister.get('email').value.toLowerCase();
      const tempPassword = this.formRegister.get('password').value;
      const tempPhone = this.formRegister.get('phone').value;
      const tempName = this.formRegister.get('name').value;
      this.apiService
        .postRegister(tempEmail, tempPassword, tempName, tempPhone)
        .subscribe((data) => {
          if (data.res === 'success') {
            this.navCtrl.setDirection('back');
            this.router.navigate(['/login']);
            console.log(data);
          }
          console.log(data);
        });
    // }
  }
}
