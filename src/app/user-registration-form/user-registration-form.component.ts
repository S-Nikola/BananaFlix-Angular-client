import { Component, OnInit, Input } from '@angular/core';

// This import closes the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls
import { UserRegistrationService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

/**
 * A function that posts a new user to the API
 * @function registerUser
 */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
    this.dialogRef.close(); // This will close the modal on success!
    console.log(result)
    this.snackBar.open('Registration successful', 'OK', {
        duration: 2000
    });
    }, (result) => {
      console.log(result)
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}