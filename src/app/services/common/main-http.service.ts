import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class MainHttpService {

  constructor(private http: HttpClient) { }

  setHttpOptions() {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return httpOptions;
  }
  
  getAll(url): Observable<any> {
    return this.http.get(url)
  }
  post(url,obj) : Observable<any>{
    return this.http.post(url,obj)
  }
  put(url,obj) : Observable<any>{
    return this.http.put(url,obj)
  }
  delete(url) : Observable<any>{
    return this.http.delete(url)
  }

  get_auth(url): Observable<any> {
    return this.http.get(url,this.setHttpOptions())
  }
  post_auth(url,obj) : Observable<any>{
    return this.http.post(url,obj,this.setHttpOptions())
  }
  put_auth(url,obj) : Observable<any>{
    return this.http.put(url,obj,this.setHttpOptions())
  }
  delete_auth(url) : Observable<any>{
    return this.http.delete(url,this.setHttpOptions())
  }
}
