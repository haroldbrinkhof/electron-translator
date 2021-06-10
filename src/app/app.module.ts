import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectService } from './services/project.service';
import { EditTranslationsComponent } from './components/edit-translations/edit-translations.component';
import { SpecificLanguageEditorComponent } from './components/edit-translations/specific-language-editor/specific-language-editor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatBadgeModule} from '@angular/material/badge';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AboutComponent } from './components/about/about.component';
import { WelcomeUserComponent } from './components/welcome-user/welcome-user.component';
import { OpenProjectComponent } from './components/open-project/open-project.component';
import { StartNewProjectComponent } from './components/start-new-project/start-new-project.component';


@NgModule({
  declarations: [
    AppComponent,
    EditTranslationsComponent,
    SpecificLanguageEditorComponent,
    AddUserComponent,
    AboutComponent,
    WelcomeUserComponent,
    OpenProjectComponent,
    StartNewProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatListModule,
    MatGridListModule,
    MatBadgeModule,
    FlexLayoutModule,
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
