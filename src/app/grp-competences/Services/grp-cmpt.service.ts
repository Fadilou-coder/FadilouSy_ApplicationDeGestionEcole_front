import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GrpCmptService {

  constructor(
    private http: HttpClient,
  ) { }
  private baseUrl = '/api';


  findAllGrpCompetences(): any{
    return this.http.get(this.baseUrl + '/admin/gprecompetences');
  }

  archiverGrpCompetences(data: any): any{
    return this.http.delete(this.baseUrl + '/admin/grpecompetences/' +  data);
  }

  addGrpCpmt(data: any): any{
    return this.http.post(this.baseUrl + '/admin/grpecompetences',  data );
  }

  getOneGrpCompt(id: number): any{
    return this.http.get(this.baseUrl + '/admin/gprecompetences/' +  id);
  }

  editGrpCompt(id: number, data: any): any{
    return this.http.put(this.baseUrl + '/admin/grpecompetences/' +  id, data);
  }

  getOneGrpComptByGrpCompt(id: number): any{
    return this.http.get(this.baseUrl + '/grpe_competences/' +  id + '/competences');
  }
}
