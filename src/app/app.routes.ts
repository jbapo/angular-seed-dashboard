import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './components/common/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './components/common/layouts/auth-layout/auth-layout.component';

import { AuthService } from './services/auth/auth.service';

export const rootRouterConfig: Routes = [
  { 
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '', 
    component: AuthLayoutComponent,
    children: [
      { 
        path: 'sessions', 
        loadChildren: './views/sessions/sessions.module#SessionsModule',
        data: { title: 'Session'} 
      }
    ]
  },
  {
    path: '', 
    component: AdminLayoutComponent,
    canActivate: [AuthService],
    children: [
      { 
        path: 'dashboard', 
        loadChildren: './views/dashboard/dashboard.module#DashboardModule', 
        data: { title: 'Dashboard', breadcrumb: 'DASHBOARD'}
      },
      {
        path: 'profile', 
        loadChildren: './views/profile/profile.module#ProfileModule', 
        data: { title: 'Profile', breadcrumb: 'PROFILE'}
      }
    ]
  },
  { 
    path: '**', 
    redirectTo: 'sessions/404'
  }
];