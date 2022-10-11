import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-screening-room',
  templateUrl: './screening-room.component.html',
  styleUrls: ['./screening-room.component.scss']
})
export class ScreeningRoomComponent implements OnInit {

  rows = [
    { name: 'File 1', date: '01/24/2019', comments: 'Comment 1' },
    { name: 'File 2', date: '02/22/2019', comments: 'Comment 2' },
    { name: 'File 3', date: '03/01/2019', comments: 'Comment 3' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
