import { CpmtServicesService } from './../../competences/Services/cpmt-services.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GrpCmptService } from '../Services/grp-cmpt.service';

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
  ) { }
  Cpmts: any;
  form: FormGroup;
  idCompt;
  cmpt;
  id = this.route.snapshot.params['id'];
  grpCompt;


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

}
