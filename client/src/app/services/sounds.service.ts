import { Injectable } from '@angular/core';

import { Howl } from 'howler';

@Injectable({
  providedIn: 'root'
})
export class SoundsService {

  private sounds: any;

  constructor() {
    this.sounds = {
      bell: '/assets/sounds/bell.mp3',
      tada: '/assets/sounds/ta-da.mp3'
    }
  }

  play(sound_name: string): void {

    try {
      if (!sound_name || !this.sounds[sound_name]) {
        throw Error('Sound is not found');
      }

      var sound = new Howl({
        src: [this.sounds[sound_name]]
      });

      sound.play();

    } catch(e) {
      console.error(e.message);
    }
  }
}
