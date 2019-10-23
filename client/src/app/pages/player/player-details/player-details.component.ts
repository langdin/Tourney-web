import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { Player } from 'src/app/models/player';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit {

  title: string;
  player: Player;
  playerId: string;
  boutId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private playerService: PlayerService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.title = this.activatedRoute.snapshot.data.title;
    this.playerId = this.activatedRoute.snapshot.params.id;
    this.player = new Player();
    if (this.title === 'Edit Participant') {
      this.getPlayer();
    }
    this.boutId = localStorage.getItem('boutId');
    this.player.boutId = this.boutId;
  }

  private getPlayer() {
    this.playerService.getPlayersById(this.playerId).subscribe(data => {
      if (data.success) {
        this.player = data.player;
      } else {
        this.router.navigate(['/my_tourneys']);
      }
    });
  }

  private onDetailsPageSubmit() {
    if (this.title === 'Add Participant') {
      this.playerService.addPlayer(this.player).subscribe(data => {
        if (data.success) {
          this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeOut: 3000});
          this.router.navigate(['/manage_bout/' + this.boutId]);
        }
      });
    } else if (this.title === 'Edit Participant') {
      this.playerService.updatePlayer(this.player).subscribe(data => {
        if (data.success) {
          this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeOut: 3000});
          this.router.navigate(['/manage_bout/' + this.boutId]);
        }
      });
    }
  }

}
