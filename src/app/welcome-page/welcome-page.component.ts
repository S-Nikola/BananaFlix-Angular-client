import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent {
  constructor(public dialog: MatDialog) { }

/**
 * A function that opens the registration dialog
 * @function openUserRegistrationDialog
 */  
    openUserRegistrationDialog(): void {
      this.dialog.open(UserRegistrationFormComponent, {
        width: '280px'
      });
    }

/**
 * A function that opens the login dialog
 * @function openUserLoginDialog
 */  
    openUserLoginDialog(): void {
      this.dialog.open(UserLoginFormComponent, {
      width: '280px'
      });
    }
}