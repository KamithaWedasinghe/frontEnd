import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve, NavigationEnd, ActivatedRoute } from '@angular/router';
import { MainHttpService } from '../common/main-http.service';
import { environment } from 'src/environments/environment';
import { Observable, of, EMPTY }  from 'rxjs';
import { mergeMap, take }         from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiResolverGuard  implements Resolve<any> {
  previousUrl : string = "";
  constructor( private router: Router,
    private route : ActivatedRoute,
    private httpService : MainHttpService ) {
    
  }
 
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    let id = route.paramMap.get('id');
    const url = `${environment.serverUrl}/boq/api/boq/${id}`
    return this.httpService.get_auth(url).pipe(
      take(1),
      mergeMap(boq => {
        if (boq) {
          return of(boq);
        } else { 
          // id not found
          this.router.navigate(['../boq-list'],{relativeTo : this.route});
          return EMPTY;
        }
      })
    );
  }
}
