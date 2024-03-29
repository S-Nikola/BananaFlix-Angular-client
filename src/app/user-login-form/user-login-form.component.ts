import { Component, OnInit, Input } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls
import { UserRegistrationService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: ''};

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit(): void {
  }
 
/**
 * A function that sends login details to the backend
 * @function loginUser
 */
  loginUser(): void {
      this.fetchApiData.userLogin(this.userData).subscribe((result) => {
        localStorage.setItem('user', result.user.Username);
        localStorage.setItem('token', result.token);
      this.dialogRef.close(); // This will close the modal on success!
      console.log(result)
      this.snackBar.open('Login successful', 'OK', {
          duration: 2000
      });
      this.router.navigate(['movies']);
      }, (result) => {
        console.log(result)
        this.snackBar.open(result, 'OK', {
          duration: 2000
        });
      });
    }

}
