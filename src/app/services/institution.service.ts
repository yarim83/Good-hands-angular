import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {

  private baseUrl = 'http://localhost:8080/api/institution/';

  constructor(private httpClient: HttpClient) {
    this.getInstitutionList();
  }

  getInstitutionList(): Observable<Array<Institution>> {
    return this.httpClient.get<Array<Institution>>(`${this.baseUrl}`);
  }

  getInstitutionLimitList(page: number, limit: number): Observable<Array<Institution>> {
    return this.httpClient.get<Array<Institution>>(`${this.baseUrl}` + 'page/' + page + '/limit/' + limit);
  }
}
