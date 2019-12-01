import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { Player } from 'src/app/models/player';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-tourney',
  templateUrl: './view-tourney.component.html',
  styleUrls: ['./view-tourney.component.css']
})
export class ViewTourneyComponent implements OnInit {
  players: Player[];
  tourneyId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private playerService: PlayerService
  ) { }

  ngOnInit() {
    this.tourneyId = this.activatedRoute.snapshot.params.id;
    this.getPlayers();
  }

  private getPlayers(): void {
    this.playerService.getPlayersByTourney(this.tourneyId).subscribe(data => {
      this.players = data.playersList;
      console.log(this.players);
    })
  }
}
