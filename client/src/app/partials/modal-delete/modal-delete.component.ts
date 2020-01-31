import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent implements OnInit {

  @Input() tourneyId: string;

  constructor() { }

  ngOnInit() {
  }

}
