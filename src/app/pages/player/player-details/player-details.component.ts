import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Player } from 'src/app/models/player';
import { BoutService } from 'src/app/services/bout.service';
import { Bout } from 'src/app/models/bout';
import { Point } from 'src/app/models/point';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit {

  title: string;
  // player
  player: Player;
  playerId: string;
  // bout
  boutId: string;
  bout: Bout;
  numOfPlayers: number;
  boutNum: number; // number of current bout
  // score in current bout for display
  score: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private playerService: PlayerService,
    private boutService: BoutService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.title = this.activatedRoute.snapshot.data.title;
    this.playerId = this.activatedRoute.snapshot.params.id;
    this.boutId = localStorage.getItem('boutId');
    this.getBout();
    this.player = new Player();
    this.player.boutId = this.boutId;
    if (this.title === 'Edit Participant') {
      this.getPlayer();
    }
    console.log(this.player);
  }

  private getPlayer() {
    this.playerService.getPlayersById(this.playerId).subscribe(data => {
      if (data.success) {
        this.player = data.player;
        this.score = this.player.points[this.boutNum].score;
      } else {
        this.router.navigate(['/my_tourneys']);
      }
    });
  }

  private getBout() {
    this.boutService.getBoutById(this.boutId).subscribe(data => {
      if (data.success) {
        this.bout = data.bout;
        this.boutNum = this.bout.number - 1;
        this.player.points = new Array<Point>(this.bout.maxNumOfPlayers / 2).fill({score: 0});
      } else {
        this.router.navigate(['/my_tourneys']);
      }
    });
  }

  private onDetailsPageSubmit() {
    if (this.title === 'Add Participant') {
      this.player.points[this.boutNum] = { score: this.score };
      this.playerService.addPlayer(this.player).subscribe(data => {
        if (data.success) {
          this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeOut: 3000});
          this.router.navigate(['/manage_bout/' + this.boutId]);
        }
      });
    } else if (this.title === 'Edit Participant') {
      this.player.points[this.boutNum] = { score: this.score };
      this.playerService.updatePlayer(this.player).subscribe(data => {
        if (data.success) {
          this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeOut: 3000});
          this.router.navigate(['/manage_bout/' + this.boutId]);
        }
      });
    }
  }

}
