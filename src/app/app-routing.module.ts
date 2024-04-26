import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AddTimeComponent } from './add-time/add-time.component';
import { PlayGroundComponent } from './play-ground/play-ground.component';

const routes: Routes = [
    { path: '', component: AddTimeComponent },
    { path: "play-ground/:playerTime", component: PlayGroundComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
