import { CpmtServicesService } from './../../competences/Services/cpmt-services.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GrpCmptService } from '../Services/grp-cmpt.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-item-grp-cmpt',
  templateUrl: './item-grp-cmpt.component.html',
  styleUrls: ['./item-grp-cmpt.component.css']
})
export class ItemGrpCmptComponent implements OnInit {

  constructor(
    private Cmptservice: CpmtServicesService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private grpCmptservice: GrpCmptService,
    private _location: Location
  ) { }
  Cpmts: any;
  form: FormGroup;
  idCompt;
  cmpt;
  id = this.route.snapshot.params['id'];
  grpCompt;
  nbrGrp = 0;
  message;


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idCompt: ''
    });
    this.grpCmptservice.getOneGrpCompt(this.id).subscribe(
      grpCompt => {
        this.grpCompt = grpCompt['hydra:member'][0]["libelle"];
      }
    )
    this.grpCmptservice.getOneGrpComptByGrpCompt(this.id).subscribe(
      (response: any) => {
        this.Cpmts = response['hydra:member'];
        this.nbrGrp = response['hydra:member'].length;
        if (!this.nbrGrp) {
          this.message = 'Cet Groupe de Compétences n\'a pas de Compétences';
        }
        this.idCompt = this.Cpmts[0].id;
        this.Cmptservice.findOnecmpt(this.idCompt).subscribe(
          (response: any) => {
            this.cmpt = response['hydra:member'][0];
          }
        );
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

  PagePrecedente(){
    this._location.back();
  }

}
