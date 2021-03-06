import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MemoryComponent } from './memory/memory.component';
import { StartingPageComponent } from './starting-page/starting-page.component';
import { LearningPageComponent } from './learning-page/learning-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GameCardComponent } from './game-card/game-card.component';
import { FinishedComponent } from './finished/finished.component';

@NgModule({
  declarations: [
    AppComponent,
    MemoryComponent,
    StartingPageComponent,
    LearningPageComponent,
    GameCardComponent,
    FinishedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
