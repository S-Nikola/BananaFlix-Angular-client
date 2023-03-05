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
 // Making the api call for the user registration endpoint

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
    .post(`${apiUrl}/users`, userDetails)
    .pipe(
    catchError(this.handleError)
    );
  }

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(`${apiUrl}/login`, userDetails)
      .pipe(catchError(this.handleError));
  }

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

  addFavoriteMovie(movieId: string): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
    .post(`${apiUrl}/users/${username}/movies/${movieId}`, 
        {headers: new HttpHeaders(
          { Authorization: 'Bearer ' + token, }
          )})
          .pipe(
            map(this.extractResponseData),
            map((data) => data.FavoriteMovies),
            catchError(this.handleError)
          );
  }

  editUser(): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
    .put(`${apiUrl}/users/${username}`, 
        {headers: new HttpHeaders(
          { Authorization: 'Bearer ' + token, }
          )})
          .pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
          );
  }

  deleteUser(): Observable<any> {
    const username = localStorage.getItem('user');
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

// Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }

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
