import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://movie-api-8cvs.onrender.com';
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  constructor(private http: HttpClient) {}

/**
   * User registration
   * @service POST to the user endpoint
   * @param userDetails 
   * @returns A JSON object holding data about the added user
   * @function userRegistration
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
    .post(`${apiUrl}/users`, userDetails)
    .pipe(
    catchError(this.handleError)
    );
  }

/**
 * User login 
 * @param userDetails 
 * @returns a JSON object about logged in user 
 * @function userLogin
 */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(`${apiUrl}/login`, userDetails)
      .pipe(catchError(this.handleError));
  }

/**
 * Get all movies 
 * @returns a JSON object with all movies
 * @function getAllMovies
 */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(`${apiUrl}/movies`,
      {headers: new HttpHeaders(
        { Authorization: 'Bearer ' + token, }
      )})
        .pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
  }

/**
 * Get a single movie
 * @param title 
 * @returns A JSON object of one movie
 * @function getMovie
 */
  getMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(`${apiUrl}/movies/${title}`,
      {headers: new HttpHeaders(
        { Authorization: 'Bearer ' + token, }
      )})
        .pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
  }

/**
 * Get data for onee director
 * @param directorName 
 * @returns A JSON object holding data about a director
 * @function getDirector
 */
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(`${apiUrl}/movies/directors/${directorName}`, 
      {headers: new HttpHeaders(
        { Authorization: 'Bearer ' + token, }
      )})
        .pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
  }

/**
 * Get data for a genre
 * @param genreName 
 * @returns A JSON object holding data about a genre
 * @function getGenre
 */
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(`${apiUrl}/movies/genre/${genreName}`, 
      {headers: new HttpHeaders(
        { Authorization: 'Bearer ' + token, }
      )})
        .pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
  }

/**
 * Get the data for one user
 * @returns A JSON object holding data about a user
 * @function getUser
 */
  getUser(): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
    .get(`${apiUrl}/profiles/${username}`, 
      {headers: new HttpHeaders(
        { Authorization: 'Bearer ' + token, }
      )})
        .pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
  }

/**
 * Get a list of favorite movies
 * @returns An array with the movieId of movies favorited by the user
 * @function getFavoriteMovies
 */
  getFavoriteMovies(): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
    .get(`${apiUrl}/profiles/${username}`, 
      {headers: new HttpHeaders(
        { Authorization: 'Bearer ' + token, }
      )})
        .pipe(
          map(this.extractResponseData),
          map((data) => data.FavoriteMovies),
          catchError(this.handleError)
        );
  }

/**
 * A function that adds a favorite movie to the array of FavoriteMovies of the user
 * @param movieId 
 * @returns A JSON object holding data about the updated user
 * @function addFavoriteMovie
 */
  addFavoriteMovie(movieId: string): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
    .post(`${apiUrl}/users/${username}/movies/${movieId}`, 
      { FavoriteMovie: movieId },
        {headers: new HttpHeaders(
          { Authorization: 'Bearer ' + token, }
          )})
          .pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
          );
  }

/**
 * A function that removes a favorite movie from the FavoriteMovie array of the user
 * @param movieId 
 * @returns A JSON object holding data about the updated user
 * @function removeFavoriteMovie
 */  
  removeFavoriteMovie(movieId: string): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
    .delete(`${apiUrl}/users/${username}/movies/${movieId}`, 
        {headers: new HttpHeaders(
          { Authorization: 'Bearer ' + token, }
          )})
          .pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
          );
  }

/**
 * A function for editin profile details
 * @param updatedUserDetails 
 * @returns A JSON object holding data about the updated user
 * @function editUser
 */
  editUser(updatedUserDetails: any): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
    .put(`${apiUrl}/users/${username}`, updatedUserDetails, 
        {headers: new HttpHeaders(
          { Authorization: 'Bearer ' + token, }
          )})
          .pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
          );
  }

/**
 * A function for deleting a user
 * @param username 
 * @returns A message notifying the deletion of the profile
 * @function deleteUser
 */
  deleteUser(username: string): Observable<any> {
    // const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
    .delete(`${apiUrl}/users/${username}`, 
        {headers: new HttpHeaders(
          { Authorization: 'Bearer ' + token, }
          )})
          .pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
          );
  }

// Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }

/**
 * Handle API call errors
 * @param error 
 * @returns error message
 * @function handleError
 */
private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
