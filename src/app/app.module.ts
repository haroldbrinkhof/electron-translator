import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NameProjectComponent } from './components/name-project/name-project.component';
import { ProjectService } from './services/project.service';
import { EditTranslationsComponent } from './components/edit-translations/edit-translations.component';
import { SpecificLanguageEditorComponent } from './components/edit-translations/specific-language-editor/specific-language-editor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatBadgeModule} from '@angular/material/badge';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    AppComponent,
    NameProjectComponent,
    EditTranslationsComponent,
    SpecificLanguageEditorComponent
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
