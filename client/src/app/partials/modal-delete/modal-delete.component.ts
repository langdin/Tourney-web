import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MyTourneysService } from 'src/app/services/my-tourneys.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent implements OnInit {

  @Input() tourneyId: string;

  constructor(
    private tourneysService: MyTourneysService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public deleteTurney(): void {
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
