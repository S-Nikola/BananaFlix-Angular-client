import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis-card',
  templateUrl: './synopsis-card.component.html',
  styleUrls: ['./synopsis-card.component.scss']
})
export class SynopsisCardComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) 
      public data: {
        Description: string;
      }
  ) {}
}
