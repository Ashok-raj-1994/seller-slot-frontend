import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTimeSlotComponent } from './pages/add-time-slot/add-time-slot.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-slot/:seller', component: AddTimeSlotComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
