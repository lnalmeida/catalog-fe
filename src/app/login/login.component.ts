import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/models/User';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email: String = "";
  password: String = "";
  dataSource: any;
  isLoadingResults = false;

  constructor(private router: Router, private authService: AuthService, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      'email': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }

  ngOnInit(): void {

  }

   addLogin() {
    this.isLoadingResults = true;
    const user: User = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      token: ""
    };
    this.authService.login(user)
        .subscribe(res => {
          console.log("Token: "+res.token);
          this.dataSource = res;
          localStorage.setItem('jwt', this.dataSource.token);
          this.isLoadingResults = false;
          this.router.navigate(['/categories']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
}
