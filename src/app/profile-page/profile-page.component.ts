import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserRegistrationService } from '../fetch-api-data.service'

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user: any = {};

  @Input() updatedUser = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: ''
  }

  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      console.log('response:', resp);
        this.user = resp;
        Birthday: new Date(resp.Birthday).toLocaleDateString()
        console.log(this.user);
        return this.user;
      });
    }

  /**
     * Update user info
     * 
     * @remarks
     * Make API call to update the user, reset the localstorage and reload the profile-page
     */
  updateUserAccount(): void {
    if (confirm('Are you happy with your changes?')) {
      this.fetchApiData.editUser(this.updatedUser).subscribe((response) => {
        // Logic for a successful user registration goes here! (To be implemented)
        localStorage.setItem('username', response.Username);
        this.snackBar.open('Your profile is updated successfully! You can log in again with your new credentials', 'OK', {
          duration: 4000
        });
        localStorage.clear();
        this.router.navigate(['welcome'])
      }, (response) => {
        //Error response
        //console.log('onUserUpdate() response2:', response);
        this.snackBar.open(response.errors[0].msg, 'OK', {
          duration: 6000
        });
      });
    }
  }

  /**
   * Get a confirmation from the user, if given, navigate to the welcome page
   * Inform the user of the changes and delete user data (deleteUser)
   * @function deleteUserAccount
   */
  deleteUserAccount(username: string): void {
    if (confirm('Your account will be permanently deleted, are you sure you want to continue?')) {
      this.router.navigate(['welcome']).then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        this.snackBar.open('Account Deleted.', 'OK', {
          duration: 5000,
        });
      });
      this.fetchApiData.deleteUser(username).subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }
}
