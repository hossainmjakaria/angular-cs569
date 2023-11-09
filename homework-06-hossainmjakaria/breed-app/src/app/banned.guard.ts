import { CanActivateFn } from '@angular/router';
import { BannedBreedsService } from './banned-breeds.service';
import { inject } from '@angular/core';

export const bannedGuard: CanActivateFn = (route, state) => {
  if (inject(BannedBreedsService).isBanned(route.params['breed'])) {
    const confirmResult = window.confirm(`Breed '${route.params['breed']}' is banned. Do you want to continue?`);
    return confirmResult;
  }
  return true;
};