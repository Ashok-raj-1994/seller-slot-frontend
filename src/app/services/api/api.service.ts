import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get(endpoint) {
    return this.http.get(environment.url + endpoint);
  }

  post(endpoint, data) {
    return this.http.post(environment.url + endpoint, data);
  }

  put(endpoint, data) {
    return this.http.put(environment.url + endpoint, data);
  }
}
