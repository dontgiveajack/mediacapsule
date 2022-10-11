import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'src/services/authentication.service';
import { Router } from '@angular/router';
import * as uuid from 'uuid';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {

  public userName: string;
  public password: string;
  public lastErrorMessage: string;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() { }

  login() {
    this.authenticationService.login(this.userName, this.password, 'system').subscribe(
      data => {
        if (data.success) {
          localStorage.setItem('token', data.result.token);
          if (this.userName === 'sa' && this.password === 'masterPassword1') {
            localStorage.setItem('imu', `${uuid.v4().substr(0, 8)}5${uuid.v4().substr(0, 8)}`);
          } else {
            localStorage.setItem('imu', `${uuid.v4().substr(0, 8)}7${uuid.v4().substr(0, 8)}`);
          }
          this.router.navigate(['/']);
          return;
        } else {
          this.lastErrorMessage = data.errorMessage;
          alert(this.lastErrorMessage);
        }
      },
      error => { this.lastErrorMessage = error; });
  }
}
