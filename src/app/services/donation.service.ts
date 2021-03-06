import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Donation} from '../models/donation';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  private baseUrl = 'http://localhost:8080/api/donation/';

  constructor(private http: HttpClient) {
  }

  getDonationCount(): Observable<any> {
    return this.http.get(this.baseUrl + '/count/');
  }

  getDonationList(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  addDonation(donationDto: Donation): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, donationDto);
  }
}
