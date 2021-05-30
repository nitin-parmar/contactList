import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculateDaysComponent } from './view/calculate-days/calculate-days.component';
import { ContactComponent } from './view/contact/contact.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'calculate-days',
    pathMatch: 'full'
  },
  {
    path: 'contacts',
    component: ContactComponent,
  },
  {
    path: 'calculate-days',
    component: CalculateDaysComponent,
  }

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
