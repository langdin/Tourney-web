import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyTourneysService {


  private endpoint = 'http://localhost:3000/tourneys';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  public getUserTourneys(userId: any): Observable<any> {
    return this.httpClient.post(this.endpoint + '/my', userId, this.httpOptions);
  }

}
