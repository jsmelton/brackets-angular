import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { RegistrationRequest } from '../models/requests/registrationRequest';
import { RegistrationResponse } from '../models/responses/registrationResponse';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor (private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  url: string = 'http://localhost:8080/registrations';

  async getAllRegistrations(): Promise<RegistrationResponse[]> {
    const data = await fetch(`${this.url}/registrations`);
    return (await data.json()) ?? [];
  }

  async getRegistrationByTournamentId(id: number): Promise<RegistrationResponse> {
    const data = await fetch(`${this.url}/registration/${id}`);
    return (await data.json()) ?? {};
  }

  createRegistration(registration: RegistrationRequest): Observable<RegistrationResponse> {
    console.log("inside service:  " + JSON.stringify(registration));
    return this.http.post<RegistrationResponse>(`${this.url}/registration`, registration, this.httpOptions).pipe(
      tap((newRegistration: RegistrationResponse) => console.log(`added registration w/ id=`)),
      catchError(this.handleError<RegistrationResponse>("testing"))
    );
  }

  deleteRegistration(registrationId: number): Observable<string> {
    console.log("inside service:  " + registrationId);
    return this.http.delete<string>(`${this.url}/registration/${registrationId}`).pipe(
      tap((response: string) => console.log(`added registration w/ id=` + response)),
      catchError(this.handleError<string>("testing"))
    );
  }

  updateRegistration(registration: RegistrationRequest): Observable<RegistrationResponse> {
    console.log("inside service:  " + JSON.stringify(registration));
    return this.http.patch<RegistrationResponse>(`${this.url}/registration/${registration.tournamentId}`, registration, this.httpOptions).pipe(
      tap((modifiedRegistration: RegistrationResponse) => console.log(`added registration w/ id=`)),
      catchError(this.handleError<RegistrationResponse>("testing"))
    );
  }

  /*handleError<T>(arg0: string): (err: any, caught: import("rxjs").Observable<any>) => import("rxjs").ObservableInput<any> {
    throw new Error('Method not implemented.' + arg0);
  }*/

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
