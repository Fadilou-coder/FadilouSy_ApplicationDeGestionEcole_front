import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenService} from '../../token/service/token.service';
import jwt_decode from 'jwt-decode';
import { ReferentielService } from 'src/app/referentiel/Service/referentiel.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-item-referentiel',
  templateUrl: './item-referentiel.component.html',
  styleUrls: ['./item-referentiel.component.css']
})
export class ItemReferentielComponent implements OnInit {

  constructor(
    private referentielservice: ReferentielService,
    private tokenService: TokenService,
    private url: ActivatedRoute,
    private _location: Location,

  ) { }

  page = 1;
  grpCpmt: any;
  nbrPage: any = 1;
  token = this.tokenService.getLocalStorageToken();
  decoded: any = '';
  role = '';
  id = this.url.snapshot.params['id'];
  ref;
  nbrGrp = 0;
  message;

  ngOnInit(): void {
    if (this.token){
      this.decoded = jwt_decode(this.token.token);
      this.role = this.decoded.roles[0];
    }
    this.referentielservice.getOneRef(this.id).subscribe(
      (response: any) => {
        this.ref = response['hydra:member'][0];
      }
      ,
      (error: any) => { console.log(error); }
    );
    this.referentielservice.getGrpComptByRef(this.id).subscribe(
      (response: any) => {
        this.grpCpmt = response['hydra:member'];
        this.nbrGrp = response['hydra:member'].length;
        if (!this.nbrGrp) {
          this.message = 'Cette Referentiel n\'a pas de Groupe de Compétences';
        }
        if (response['hydra:view']){
          this.nbrPage = response['hydra:view']['hydra:last'];
          this.nbrPage = this.nbrPage.split('=')[1];
        }
      }
      ,
      (error: any) => { console.log(error); }
    );
  }

  suivant(): any{
    this.page++;
    this.referentielservice.getGrpComptByRef(this.id).subscribe(
      (response: any) => {
        console.log(response);
        this.grpCpmt = response['hydra:member'];
        if (response['hydra:view']){
          this.nbrPage = response['hydra:view']['hydra:last'];
          this.nbrPage = this.nbrPage.split('=')[1];
        }
        console.log(this.nbrPage);
      }
      ,
      (error: any) => {console.log(error)}
    );
  }
  precedent(): any{
    this.page--;
    this.referentielservice.getGrpComptByRef(this.id).subscribe(
      (response: any) => {
        console.log(response);
        this.grpCpmt = response['hydra:member'];
        if (response['hydra:view']){
          this.nbrPage = response['hydra:view']['hydra:last'];
          this.nbrPage = this.nbrPage.split('=')[1];
        }
        console.log(this.nbrPage);
      }
      ,
      (error: any) => {console.log(error)}
    );
  }

  PagePrecedente(){
    this._location.back();
  }

}
