import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { ProfessorComponent } from './professor-component/professor-component';
import { DisciplinaComponent } from './disciplina-component/disciplina-component';

const routes: Routes = [
    {path: '',        component: HomeComponent},
    {path: 'professor', component: ProfessorComponent},
    {path: 'disciplina',  component: DisciplinaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
