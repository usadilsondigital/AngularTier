import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ReservationcreateComponent } from './reservationcreate/reservationcreate.component';
import { ReservationeditComponent } from './reservationedit/reservationedit.component';



const routes: Routes = [
  { path: '',   redirectTo: '/reservation', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'reservation', component: ReservationComponent},
  { path: 'reservationcreate', component: ReservationcreateComponent},
  { path: 'reservationedit', component: ReservationeditComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
