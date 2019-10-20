import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private endpoint = 'http://localhost:3000/players/';

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


  public getPlayersByBout(boutId: string): Observable<any> {
    return this.httpClient.get(this.endpoint + 'by_bout/' + boutId, this.httpOptions);
  }

  public addPlayer(player: Player): Observable<any> {
    return this.httpClient.post(this.endpoint + 'add/', player, this.httpOptions);
  }

  public getPlayersById(id: string): Observable<any> {
    return this.httpClient.get(this.endpoint + id, this.httpOptions);
  }

  public updatePlayer(updatedPlayer: Player): Observable<any> {
    return this.httpClient.post(this.endpoint + 'edit/', updatedPlayer, this.httpOptions);
  }

  public deletePlayers(id: string): Observable<any> {
    return this.httpClient.get(this.endpoint + 'delete/' + id, this.httpOptions);
  }
}
