import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';

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

const routes: Routes = [
  {path: '', component: MainComponent, children:
    [
      {path: '', component: HomeComponent},
      {path: 'create-time-card', component: CreateTimeCardComponent},
      {path: 'time-card/:id', component: TimeCardComponent}
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'recover-password', component: RecoverPasswordComponent}
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
    RecoverPasswordComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FlexLayoutModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    TimeCardService,
    ProjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
