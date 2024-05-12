import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SoundService } from '../sound.service';


class Player {
  minutes: number;
  seconds: number;
  timer?: any;
  isRunning: boolean;
}

@Component({
  selector: 'app-play-ground',
  templateUrl: './play-ground.component.html',
  styleUrls: ['./play-ground.component.css']
})
export class PlayGroundComponent implements OnInit {
  isGameStarted: boolean = false;
  whitePlayerTimer: boolean = false;
  blackPlayerTimer: boolean = false;
  gamePaused: boolean = false;
  disableWhiteButton: boolean = true;
  disableBlackButton: boolean = true;
  remainingTime: any;
  isPaused: boolean = false;
  showAlert: boolean = false;

  whitePlayer: Player = {
    minutes: 0,
    seconds: 0,
    isRunning: false
  };

  blackPlayer: Player = {
    minutes: 0,
    seconds: 0,
    isRunning: false
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private soundService: SoundService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const pt = params.get('playerTime');
      if (pt) {
        this.setTotalTime(Number(pt));
      }
    });
  }

  setTotalTime(value: number) {
    this.whitePlayer.minutes = value;
    this.blackPlayer.minutes = value;
  };

  startGame() {
    this.vibrate();
    this.isGameStarted = true;
    this.startAndStopClock(true);
  }

  pauseGame() {
    this.vibrate();
    this.isPaused = !this.isPaused;
    if (this.isPaused) {
      this.disableWhiteButton = true;
      this.disableBlackButton = true;
    } else {
      this.disableWhiteButton = this.blackPlayer.isRunning;
      this.disableBlackButton = this.whitePlayer.isRunning;
    }
  }

  startAndStopClock(isWhite: boolean) {
    if (!this.isGameStarted && !isWhite) {
      return;
    } else {
      this.isGameStarted = true;
      this.disableWhiteButton = !isWhite;
      this.disableBlackButton = isWhite;
      const player = isWhite ? this.whitePlayer : this.blackPlayer;
      const secondPlayer = isWhite ? this.blackPlayer : this.whitePlayer;
      if (secondPlayer.isRunning) {
        return;
      }

      if (!player.isRunning) {
        player.isRunning = true;
        player.timer = setInterval(() => {

          if (!this.isPaused) {
            if (player.minutes >= 0) {
              if (player.seconds > 0) {
                player.seconds = player.seconds - 1;
              }
              else {
                if (player.minutes == 0) {
                  clearInterval(player.timer);
                }
                else {
                  player.minutes = player.minutes - 1;
                  player.seconds = 59;
                }
              }
            }
          }

        }, 1000)
      } else {
        player.isRunning = false;
        clearInterval(player.timer);
        this.startAndStopClock(!isWhite);
      }
    }
  }

  reset() {
    this.vibrate();
    this.showAlert = true;
    this.isPaused = true;
  }

  resetPlayer(player: Player) {
    player.minutes = 0;
    player.seconds = 0;
    player.isRunning = false;
    clearInterval(player.timer);
  }

  onClickOk() {
    this.vibrate();
    this.resetPlayer(this.whitePlayer);
    this.resetPlayer(this.blackPlayer);
    this.isGameStarted = false;
    this.router.navigate([`/`]);
  }

  onClickNo() {
    this.vibrate();
    this.showAlert = false;
    if (!this.isPaused) {
      this.isPaused = true;
    } else {
      this.isPaused = false;
    }
  }

  toggleBlackInput() {
    this.soundService.playSound();
    this.vibrate();
    this.startAndStopClock(false);
  }

  toggleWhiteInput() {
    this.soundService.playSound();
    this.vibrate();
    this.startAndStopClock(true);
  }

  vibrate(): void {
    if (!window) {
      return;
    }

    if (!window.navigator) {
      return;
    }

    if (!(window.navigator as any).vibrate) {
      return;
    }
    (window.navigator as any).vibrate([100, 100]);
  }
}
