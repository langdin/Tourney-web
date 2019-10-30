import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bout } from '../models/bout';

@Injectable({
  providedIn: 'root'
})
export class BoutService {

  private endpoint = 'http://localhost:3000/bouts/';

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

  public getBoutById(id: string): Observable<any> {
    return this.httpClient.get(this.endpoint + id, this.httpOptions);
  }

  public getBoutsByTourney(tourneyId: string): Observable<any> {
    return this.httpClient.get(this.endpoint + 'by_tourney/' + tourneyId, this.httpOptions);
  }

  public addBout(bout: Bout): Observable<any> {
    return this.httpClient.post(this.endpoint + 'add', bout, this.httpOptions);
  }

  public deleteBout(boutId: string): Observable<any> {
    return this.httpClient.get(this.endpoint + 'delete/' + boutId, this.httpOptions);
  }
}
