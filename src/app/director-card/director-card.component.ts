import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-card',
  templateUrl: './director-card.component.html',
  styleUrls: ['./director-card.component.scss']
})
export class DirectorCardComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) 
      public data: {
        Name: string;
        Bio: string;
        Birth: string;
      }
  ) {}
}
