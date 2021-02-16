import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfilSortieService {

  constructor(
    private http: HttpClient,
    ) { }
  private baseUrl = '/api';

  findAllProfilSortie(page: number){
    return this.http.get(this.baseUrl + '/admin/profilsorties?page=' + page);
  }

  archiverProfilSortie(id: number){
    return this.http.delete(this.baseUrl + '/admin/profilsortie/' +  id);
  }

  addprofilSortie(data: any){
    return this.http.post(this.baseUrl + '/admin/profilsorties', data);
  }

  getOneProfilSortie(data: any){
    return this.http.get(this.baseUrl + '/admin/profilsorties/' + data);
  }

  updateProfilSortie(id: any, body: any){
    return this.http.put(this.baseUrl + '/admin/profilsortie/' + id, body);
  }

  findAllAppOfProfilSortie(page: number, id: number){
    return this.http.get(this.baseUrl + '/profils_de_sorties/' +  id + '/apprenants?page=' + page);
  }


}
