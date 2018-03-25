import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  readonly videos: Media[] = [{
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  }, {
    src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  }, {
    src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
  }];
}

export interface Media {
  src: string;
}
