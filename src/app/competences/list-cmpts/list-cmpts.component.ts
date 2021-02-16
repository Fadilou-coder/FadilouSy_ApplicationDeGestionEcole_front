import jwt_decode from 'jwt-decode';
import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/token/service/token.service';
import { CpmtServicesService } from '../Services/cpmt-services.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-cmpts',
  templateUrl: './list-cmpts.component.html',
  styleUrls: ['./list-cmpts.component.css']
})
export class ListCmptsComponent implements OnInit {

  constructor(
    private Cmptservice: CpmtServicesService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
  ) { }

  page = 1;
  Cpmts: any;
  nbrPage: any = 1;
  token = this.tokenService.getLocalStorageToken();
  decoded: any = '';
  role = '';
  form: FormGroup;
  idCompt;
  cmpt;


  ngOnInit(): void {
    if (this.token){
      this.decoded = jwt_decode(this.token.token);
      this.role = this.decoded.roles[0];
      console.log(this.role);
    }
    console.log(this.page);
    this.form = this.formBuilder.group({
      idCompt: ''
    });
    this.Cmptservice.findAllCompetences().subscribe(
      (response: any) => {
        console.log(response);
        this.Cpmts = response['hydra:member'];
        this.idCompt = this.Cpmts[0].id;
        this.Cmptservice.findOnecmpt(this.idCompt).subscribe(
          (response: any) => {
            this.cmpt = response['hydra:member'][0];
          }
        );
        if (response['hydra:view']){
          this.nbrPage = response['hydra:view']['hydra:last'];
          this.nbrPage = this.nbrPage.split('=')[1];
        }
      }
      ,
      (error: any) => { console.log(error); }
    );
  }

  compt(){
   this.Cmptservice.findOnecmpt(this.idCompt).subscribe(
      (response: any) => {
        this.cmpt = response['hydra:member'][0];
      }
    );

  }
}


