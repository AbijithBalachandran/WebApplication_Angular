import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectToken } from '../store/selectors/auth.selectors';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GuestGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate() {
    return this.store.select(selectToken).pipe(
      map(token => {
        if (token) {
          this.router.navigate(['/dashboard']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
