import { Injectable } from '@angular/core';
import { Howl } from 'howler';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private sound: Howl;

  constructor() {
    this.sound = new Howl({
      src: ['assets/sound/capture.mp3']
    });
  }

  playSound() {
    this.sound.play();
  }
}
