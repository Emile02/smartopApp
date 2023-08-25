import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterventionsComponent } from './interventions/interventions.component';

const routes: Routes = [
  { path: 'interventions', component: InterventionsComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
