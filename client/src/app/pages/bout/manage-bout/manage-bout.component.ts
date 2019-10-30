import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoutService } from 'src/app/services/bout.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Bout } from 'src/app/models/bout';
import { PlayerService } from 'src/app/services/player.service';
import { Player } from 'src/app/models/player';

@Component({
  selector: 'app-manage-bout',
  templateUrl: './manage-bout.component.html',
  styleUrls: ['./manage-bout.component.css']
})
export class ManageBoutComponent implements OnInit {

  bout: Bout;
  boutId: string;
  players: Player[];
  // dropdown button name
  winners: string[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private playerService: PlayerService,
    private boutService: BoutService,
    private flashMessage: FlashMessagesService,
    private router: Router
    ) { }

  ngOnInit() {
    this.bout = new Bout();
    this.players = new Array<Player>();
    this.boutId = this.activatedRoute.snapshot.params.id;
    this.getBout();
    this.getPlayers();
    localStorage.setItem('boutId', this.boutId);
  }

  private selectWinner(chosen: Player) {
    const index = this.players.indexOf(chosen);
    if (index % 2 !== 0) {
      this.winners[index - 1] = chosen.name;
    } else {
      this.winners[index] = chosen.name;
    }
  }

  private getBout() {
    this.boutService.getBoutById(this.boutId).subscribe(data => {
      if (data.success) {
        this.bout = data.bout;
        localStorage.setItem('maxNumOfPlayers', '' + this.bout.maxNumOfPlayers );
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-warning', timeOut: 3000});
        this.router.navigate(['/my_tourneys']);
      }
    });
  }

  private getPlayers() {
    this.playerService.getPlayersByBout(this.boutId).subscribe(data => {
      if (data.success) {
        this.players = data.playersList;
        //

        this.winners = new Array<string>(this.players.length);
        this.winners.fill('Pick a winner');
      }
    });
  }

  private getWinners() {
  }
}
