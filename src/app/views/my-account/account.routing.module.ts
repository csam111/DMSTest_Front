import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyAccountComponent } from './my-account.component';

const routes: Routes = [
  {
    path: '',
    component: MyAccountComponent,
    data: {
      title: "Mi cuenta"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {
}
