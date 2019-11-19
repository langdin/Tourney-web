import { Component, OnInit } from '@angular/core';
import { MyTourneysService } from 'src/app/services/my-tourneys.service';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Tourney } from 'src/app/models/tourney';

@Component({
  selector: 'app-all-tourneys',
  templateUrl: './all-tourneys.component.html',
  styleUrls: ['./all-tourneys.component.css']
})
export class AllTourneysComponent implements OnInit {

  tourneys: Tourney[];

  constructor(
    private tourneysService: MyTourneysService,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getTourneys();
  }

  private getTourneys() {
    this.tourneysService.getAllTourneys().subscribe(data => {
      this.tourneys = data.tourneysList;
    });
  }

}
