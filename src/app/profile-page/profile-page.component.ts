import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service'

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user: any = {};
  constructor(public fetchApiData: UserRegistrationService) { }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
        this.user = resp;
        Birthday: new Date(resp.Birthday).toLocaleDateString()
        console.log(this.user);
        return this.user;
      });
    }

}
