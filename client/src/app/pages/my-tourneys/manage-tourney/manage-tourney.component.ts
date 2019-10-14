import { Component, OnInit } from '@angular/core';
import { MyTourneysService } from 'src/app/services/my-tourneys.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
import { Tourney } from 'src/app/models/tourney';
import { BoutService } from 'src/app/services/bout.service';
import { Bout } from 'src/app/models/bout';

@Component({
  selector: 'app-manage-tourney',
  templateUrl: './manage-tourney.component.html',
  styleUrls: ['./manage-tourney.component.css']
})
export class ManageTourneyComponent implements OnInit {

  tourneyId: string;
  tourney: Tourney;
  bouts: Bout[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private tourneysService: MyTourneysService,
    private boutService: BoutService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.tourney = new Tourney();
    this.bouts = new Array<Bout>();
    this.tourneyId = this.activatedRoute.snapshot.params.id;
    this.getBouts();
    this.getTourney();
  }

  private getTourney() {
    this.tourneysService.getTourney(this.tourneyId).subscribe(data => {
      if (data.success) {
        this.tourney = data.tourney;
      }
    });
  }

  private getBouts() {
    this.boutService.getBoutsByTourney(this.tourneyId).subscribe(data => {
      if (data.success) {
        this.bouts = data.boutList;
        console.log(this.bouts);
      }
    });
  }

  private addBout() {
    const bout = new Bout();
    bout.number = this.bouts.length + 1;
    bout.tourneyId = this.tourneyId;
    if (bout.number > this.tourney.numberOfPlayers / 2) {
      this.flashMessage.show('New bouts can not be added.', {cssClass: 'alert-warning', timeOut: 3000});
    } else {
      this.boutService.addBout(bout).subscribe(data => {
        if (data.success) {
          this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeOut: 3000});
          this.router.navigate(['/manage_tourney/' + this.tourneyId]);
        } else {
          this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeOut: 3000});
          this.router.navigate(['/manage_tourney/' + this.tourneyId]);
        }
      });
    }
  }
}
