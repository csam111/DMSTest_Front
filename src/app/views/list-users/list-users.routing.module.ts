import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './list-users.component';

const routes: Routes = [
  {
    path: '',
    component: ListUsersComponent,
    data: {
      title: "Lista de Usuarios"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListUsersRoutingModule {
}
