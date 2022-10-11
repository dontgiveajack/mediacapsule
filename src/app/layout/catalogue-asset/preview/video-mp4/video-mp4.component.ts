import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-video-mp4',
  templateUrl: './video-mp4.component.html',
  styleUrls: ['./video-mp4.component.scss']
})
export class VideoMp4Component implements OnInit {

  assetUrl: string;
  @Input() assetId: number;
  @Input() fileType = '';

  constructor() {
    const token = localStorage.getItem('token').replace(/\//g, '.');
    const apiUrl = environment.apiUrl;

    this.assetUrl = `${apiUrl}/asset/StreamVideo/${token}`;
  }

  ngOnInit() { }

}
