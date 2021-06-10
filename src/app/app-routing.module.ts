import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditTranslationsComponent } from './components/edit-translations/edit-translations.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AboutComponent } from './components/about/about.component';
import { WelcomeUserComponent } from './components/welcome-user/welcome-user.component';
import { ChangeUserComponent } from './components/change-user/change-user.component';

const routes: Routes = [
	{ path: 'EditTranslations', component: EditTranslationsComponent },
	{ path: 'AddUser', component: AddUserComponent },
	{ path: 'About', component: AboutComponent },
	{ path: 'WelcomeUser', component: WelcomeUserComponent },
	{ path: 'ChangeUser', component: ChangeUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
