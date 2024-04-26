import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-time',
  templateUrl: './add-time.component.html',
  styleUrls: ['./add-time.component.css']
})
export class AddTimeComponent implements OnInit {
  form: FormGroup;

  public get getPlayerTimeControl(): AbstractControl | null {
    return this.form.get('playerTime');
  }

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      playerTime: new FormControl<number | null>(null, [Validators.required, Validators.maxLength(2)]),
    });
  }

  getModel(): { playerTime: string } {
    let rawValues = this.form.getRawValue();
    return {
      playerTime: rawValues.playerTime,
    }
  }

  submit() {
    const self = this;
    const model = this.getModel();
    const pt = parseInt(model.playerTime);
    if (pt) {
      this.router.navigate([`/play-ground/${model.playerTime}`]);
    }
  }
}
