import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'http://localhost:8080/api/category/';

  constructor(private http: HttpClient) {
  }

  getCategoryList(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>(`${this.baseUrl}`);
  }
}
