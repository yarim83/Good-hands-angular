import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  private baseUrl = 'http://localhost:8080/api/donation/';

  constructor(private http: HttpClient) {
  this.getDonationCount();
  }

  getDonationCount(): Observable<any> {
    return this.http.get(this.baseUrl + '/count/');
  }
}
