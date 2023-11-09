import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BannedBreedsComponent } from './banned-breeds.component';
import { bannedGuard } from './banned.guard';
import { BreedsComponent } from './breeds.component';
import { SubBreedImageComponent } from './sub-breed-image.component';
import { SubBreedsComponent } from './sub-breeds.component';

const routes: Routes = [
  { path: '', component: BreedsComponent, pathMatch: 'full' },
  {
    path: 'sub-breeds/:breed', component: SubBreedsComponent,
    children: [
      { path: ':subbreed', component: SubBreedImageComponent },
    ],
    canActivate: [bannedGuard]
  },
  { path: 'banned-breeds', component: BannedBreedsComponent },
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
