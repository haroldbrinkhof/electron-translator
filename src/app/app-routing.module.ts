import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NameProjectComponent } from './components/name-project/name-project.component';
import { EditTranslationsComponent } from './components/edit-translations/edit-translations.component';

const routes: Routes = [
	{ path: 'NameProject', component: NameProjectComponent },
	{ path: 'EditTranslations', component: EditTranslationsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
