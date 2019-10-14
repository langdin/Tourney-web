import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { MyTourneysComponent } from './pages/my-tourneys/my-tourneys.component';
import { MyTourneyDetailsComponent } from './pages/my-tourneys/my-tourney-details/my-tourney-details.component';
import { AuthGuard } from './guards/auth.guard';
import { MyTourneyDeleteComponent } from './pages/my-tourneys/my-tourney-delete/my-tourney-delete.component';
import { ManageTourneyComponent } from './pages/my-tourneys/manage-tourney/manage-tourney.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

  {path: 'my_tourneys', component: MyTourneysComponent, canActivate: [AuthGuard]},
  {path: 'my_tourneys/add', component: MyTourneyDetailsComponent, data: {title: 'Add Tourney'}, canActivate: [AuthGuard]},
  {path: 'my_tourneys/edit/:id', component: MyTourneyDetailsComponent, data: {title: 'Edit Tourney'}, canActivate: [AuthGuard]},
  {path: 'my_tourneys/delete/:id', component: MyTourneyDeleteComponent, canActivate: [AuthGuard]},

  {path: 'manage_tourney/:id', component: ManageTourneyComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
