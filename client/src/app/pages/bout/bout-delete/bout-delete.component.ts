import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoutService } from 'src/app/services/bout.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-bout-delete',
  templateUrl: './bout-delete.component.html',
  styleUrls: ['./bout-delete.component.css']
})
export class BoutDeleteComponent implements OnInit {

  boutId: string;
  tourneyId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private boutService: BoutService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.tourneyId = this.activatedRoute.snapshot.params.tid;
    this.boutId = this.activatedRoute.snapshot.params.bid;
    this.removeBout();
  }

  private removeBout() {
    this.boutService.deleteBout(this.boutId).subscribe(data => {
      if (data.success) {
        this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeOut: 3000 });

      } else {
        this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeOut: 3000 });
      }
      this.router.navigate(['/manage_tourney/' + this.tourneyId]);
    });
  }

}
