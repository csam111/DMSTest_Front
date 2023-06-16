import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { AuthGuard } from '../app/security/Auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'ListUser',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: 'ListUsers',

        loadChildren: () =>
          import('./views/list-users/list-users.module').then((m) => m.ListUsersModule),
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
      {
        path: 'MyAccount',
        loadChildren: () =>
          import('./views/my-account/account.module').then((m) => m.AccountModule)
      },
    ]
  },
  {
    path: 'Login',
    component: LoginComponent,
    data: {
      title: 'Iniciar Sesion'
    }
  },
  {
    path: 'Register',
    component: RegisterComponent,
    data: {
      title: 'Registro'
    }
  },
  {path: '**', redirectTo: 'ListUsers'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash : true,
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
