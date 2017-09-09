import { ServerResolver } from './servers/server/server-resolver.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { AuthGuard } from './auth-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'users', component: UsersComponent, children: [
    { path: ':id/:name', component: UserComponent }
  ]
 },
  { path: 'servers', 
    //canActivate: [AuthGuard],  // authorization for root
    canActivateChild: [AuthGuard], // authorization for children
    component: ServersComponent, children: [ // make sure servers are only accessible if authguard returns true 
    { path: ':id', component: ServerComponent, resolve: {server: ServerResolver} },
    { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
  ] },
  //{ path: 'not-found', component: PageNotFoundComponent },
    { path: 'not-found', component: ErrorPageComponent, data: {message: "Page meot found!"} }, /// pass error to errorComponent
  { path: 'something', redirectTo: '/not-found' },
  { path: '**', redirectTo: '/not-found' } // make sure it is last route
];

@NgModule({
    imports: [    
        RouterModule.forRoot(appRoutes, { useHash: true })], 
        exports: [RouterModule]
})

export class AppRoutingModule{

}