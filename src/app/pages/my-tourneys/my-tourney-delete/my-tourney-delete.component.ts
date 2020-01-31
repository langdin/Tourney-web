import { Component, OnInit } from '@angular/core';
import { MyTourneysService } from 'src/app/services/my-tourneys.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-tourney-delete',
  templateUrl: './my-tourney-delete.component.html',
  styleUrls: ['./my-tourney-delete.component.css']
})
export class MyTourneyDeleteComponent implements OnInit {

  tourneyId: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private tourneysService: MyTourneysService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.tourneyId = this.activatedRoute.snapshot.params.id;
    this.deleteTurney();
  }

  private deleteTurney(): void {
    console.log('detele');
    this.tourneysService.deleteTourney(this.tourneyId).subscribe(data => {
      // deleted
      if (data.success) {
        this.flashMessage.show(data.msg, {cssClass: 'alert-warning', timeOut: 3000});
      } else {
        // error
        this.flashMessage.show('Delete Survey Failed', {cssClass: 'alert-danger', timeOut: 3000});
      }
      this.router.navigate(['/my_tourneys']);
    });
  }
}
