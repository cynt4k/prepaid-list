
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { StartView } from 'src/app/views/app-start/app-start.view';


const routes: Routes = [
  {
    path: '',
    component: StartView
  }
  // },
  // {
  //   path: 'login',
  //   component: HostLoginComponent
  // },
  // {
  //   path: 'register',
  //   children: [{
  //     path: '',
  //     component: RegisterComponent,
  //   },
  //   {
  //     path: 'spotify',
  //     children: [{
  //       path: '',
  //       component: RegisterSpotifyComponent,
  //     },
  //     {
  //       path: 'token',
  //       component: TokenSpotifyComponent,
  //     }]
  //   }
  //   ]
  // },
  // {
  //   path: 'signedUp',
  //   children: [
  //     {
  //       path: '',
  //       component: SignedUpComponent
  //     }
  //   ]
  // },
  // {
  //   path: 'guest/:playlistId',
  //   children: [
  //     {
  //       path: 'guestLogin',
  //       component: GuestLoginComponent
  //     },
  //     {
  //       path: 'playlist',
  //       component: PlaylistComponent
  //     }
  //   ]
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preload all modules; optionally we could
    // implement a custom preloading strategy for just some
    // of the modules (PRs welcome 😉)
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
