import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyTourneysService } from 'src/app/services/my-tourneys.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Tourney } from 'src/app/models/tourney';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-my-tourney-details',
  templateUrl: './my-tourney-details.component.html',
  styleUrls: ['./my-tourney-details.component.css']
})
export class MyTourneyDetailsComponent implements OnInit {
  title: string;
  tourney: Tourney;
  currentUser: User;
  tourneyId: string;
  // dropdown text
  ddNum: string;
  //
  disabled: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tourneyService: MyTourneysService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isLoggedIn();
    this.disabled = false;
    this.tourney = new Tourney();
    this.tourney.description = '';
    this.tourneyId = this.activatedRoute.snapshot.params.id;
    this.title = this.activatedRoute.snapshot.data.title;
    if (this.title === 'Edit Tourney') {
      this.getTourney();
      this.disabled = true;
    }
    this.ddNum = 'Choose Number';
  }

  private getTourney() {
    this.tourneyService.getTourney(this.tourneyId).subscribe(data => {
      if (data.success) {
        this.tourney = data.tourney;
        this.ddNum = this.tourney.numberOfPlayers.toString();
      }
    });
  }

  public onDetailsPageSubmit() {
    this.tourney.ownerId = this.currentUser['id'];
    this.tourney.numberOfPlayers = +this.ddNum;
    if (this.title === 'Add Tourney') {
      // Add New Tourney
      this.tourney.status = 'Not Active';
      this.tourneyService.addTourney(this.tourney).subscribe(data => {
        if (data.success) {
          this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeOut: 3000});
          this.router.navigate(['/my_tourneys']);
        } else {
          this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeOut: 3000});
          this.router.navigate(['/my_tourneys/add']);
        }
      });
    } else {
      // Update Tourney
      this.tourneyService.updateTourney(this.tourney).subscribe(data => {
        if (data.success) {
          this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeOut: 3000});
          this.router.navigate(['/my_tourneys']);
        } else {
          this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeOut: 3000});
          this.router.navigate(['/my_tourneys/edit/' + this.tourney._id]);
        }
      });
    }
  }

  private isLoggedIn(): boolean {
    const result = this.authService.loggedIn();
    if (result) {
      this.currentUser = JSON.parse(localStorage.getItem('user'));
    }
    return result;
  }

  private selectNumOfPlayers(num: string) {
    this.ddNum = num;
  }
}
