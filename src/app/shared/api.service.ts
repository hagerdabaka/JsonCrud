import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { companyModel } from '../Model/companyModel';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  apiurl = 'http://localhost:3000/company';

  Getallcompany(): Observable<companyModel[]> {
    return this.http.get<companyModel[]>(this.apiurl);
  }

  GetCompanyByCode(id: any): Observable<companyModel> {
    return this.http.get<companyModel>(this.apiurl + '/' + id);
  }

  RemoveCompanyByCode(id: any) {
    return this.http.delete(this.apiurl + '/' + id);
  }

  Createcompany(companydata: any) {
    return this.http.post(this.apiurl, companydata);
  }

  Updatecompany(id: any, companydata: any) {
    return this.http.put(this.apiurl + '/' + id, companydata);
  }
}
