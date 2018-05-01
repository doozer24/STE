import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { UserService } from './services/user.service';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login/login.component';
import { CreateTimeCardComponent } from './create-time-card/create-time-card.component';
import { TimeCardComponent } from './time-card/time-card.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { TimeCardService } from './services/time-card.service';
import { ProjectService } from './services/project.service';
import { AuthGuardService } from './services/auth-guard.service';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { ManageProjectsComponent } from './manage-projects/manage-projects.component';

const routes: Routes = [
  {path: '', component: MainComponent, canActivate: [AuthGuardService], children:
    [
      {path: '', component: HomeComponent},
      {path: 'create-time-card', component: CreateTimeCardComponent},
      {path: 'time-card/:id', component: TimeCardComponent},
      {path: 'manage-users', component: ManageUsersComponent},
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'recover-password', component: RecoverPasswordComponent},
  {path: 'add-user', component: AddUserComponent},
  {path: 'add-project', component: AddProjectComponent},
  {path: 'manage-projects', component: ManageProjectsComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HomeComponent,
    LoginComponent,
    CreateTimeCardComponent,
    TimeCardComponent,
    HeaderComponent,
    FooterComponent,
    RecoverPasswordComponent,
    ManageUsersComponent,
    AddUserComponent,
    AddProjectComponent,
    ManageProjectsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FlexLayoutModule,
    FormsModule,
    HttpModule,
    DialogModule,
    BrowserAnimationsModule
  ],
  providers: [
    UserService,
    TimeCardService,
    ProjectService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
