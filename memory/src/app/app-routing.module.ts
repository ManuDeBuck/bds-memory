import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LearningPageComponent} from "./learning-page/learning-page.component";
import {MemoryComponent} from "./memory/memory.component";
import {StartingPageComponent} from "./starting-page/starting-page.component";

const routes: Routes = [
  { path: 'learning', component: LearningPageComponent },
  { path: 'memory', component: MemoryComponent },
  { path: '**', component: StartingPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
