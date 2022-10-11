import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clips',
  templateUrl: './clips.component.html',
  styleUrls: ['./clips.component.scss']
})
export class ClipsComponent implements OnInit {

  constructor() { }

  rows = [
    { name: 'File 1', date: '01/24/2019', activity: '3 Discussions, 19 Replies, <a href="#">2 Deadlines</a>' },
    { name: 'File 2', date: '02/22/2019', activity: '3 Discussions, 19 Replies, <a href="#">2 Deadlines</a>' },
    { name: 'File 3', date: '03/01/2019', activity: '3 Discussions, 19 Replies, <a href="#">2 Deadlines</a>' },
  ];
  
  ngOnInit() {
  }

}
