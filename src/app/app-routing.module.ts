import { Routes } from '@angular/router';
import { ConfirmacaoComponent } from './component/confirmacao/confirmacao.component';
import { LoginComponent } from './component/login/login.component';
import { FullComponent } from './layouts/full/full.component';


export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      }
    ]
  },
  {
    path: 'entrar',
    component: LoginComponent
  },
  {
    path: 'registrar-se',
    component: LoginComponent
  },
  {
    path: 'confirmar/:token',
    component: ConfirmacaoComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
