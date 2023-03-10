import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserRegistrationService } from '../fetch-api-data.service';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';
import { Token } from '@angular/compiler';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  favoriteMovies: any[] = [];
  constructor(
    public fetchApiData: UserRegistrationService, 
    public dialog: MatDialog,
    public snackBar: MatSnackBar    
    ) { }

ngOnInit(): void {
  this.getMovies();
  this.getFavorites();
}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      // console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * opens the MovieGenreComponent dialog
   * @param name 
   * @param description
   * @function openGenreDialog 
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        Name: name,
        Description: description,
      },
      // Assigning the dialog a width
      width: '280px'
    });
  }

  openDirectorDialog(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      },
      // Assigning the dialog a width
      width: '280px'
    });
  }

  openSynopsisDialog(description: string): void {
    this.dialog.open(SynopsisCardComponent, {
      data: {
        Description: description,
      },
      // Assigning the dialog a width
      width: '280px'
    });
  }

   /**
   * fetch favorite movies from FetchApiDataService service
   * @returns an empty array or an array of movies favorited by the user
   * @function getFavorites
   */
   getFavorites(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp;
      console.log('fav movies:', this.favoriteMovies);
      return this.favoriteMovies;
    });
  }

  toggleFavoriteMovie(id: string) {
    if (!this.favoriteMovies.includes(id)) {
      this.fetchApiData.addFavoriteMovie(id).subscribe((res) => {
        this.favoriteMovies = res.FavoriteMovies;
        this.snackBar.open('Added to favorites.', 'OK', {
          duration: 3000
        })
      }, (res) => {
        this.snackBar.open(res.message, 'OK', {
          duration: 3000
        });
      })
    } else {
      this.fetchApiData.removeFavoriteMovie(id).subscribe((res) => {
        this.favoriteMovies = res.FavoriteMovies;
        this.snackBar.open('Removed from favorites.', 'OK', {
          duration: 3000
        })
      }, (res) => {
        this.snackBar.open(res.message, 'OK', {
          duration: 3000
        });
      })
    }
  }

}
