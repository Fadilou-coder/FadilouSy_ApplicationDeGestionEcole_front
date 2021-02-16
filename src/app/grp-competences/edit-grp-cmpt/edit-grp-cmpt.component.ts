import { CpmtServicesService } from './../../competences/Services/cpmt-services.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GrpCmptService } from '../Services/grp-cmpt.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit-grp-cmpt',
  templateUrl: './edit-grp-cmpt.component.html',
  styleUrls: ['./edit-grp-cmpt.component.css']
})
export class EditGrpCmptComponent implements OnInit {

  formadd: FormGroup;
  libelle;
  descriptif;
  competences = [];
  cmptSuggestions = [];
  id;
  dropdownSettings: IDropdownSettings = {};


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private grpCpmtservice: GrpCmptService,
    private cpmtService: CpmtServicesService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.formadd = this.formBuilder?.group({
      libelle: ['', [ Validators.required]],
      descriptif: ['', [ Validators.required]],
      competences: [],
      id: this.id,
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'libelle',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };

    this.grpCpmtservice.getOneGrpCompt(this.id).subscribe(
      (response: any) => {
        this.competences = response['hydra:member'][0]['competences'];
        this.libelle = response['hydra:member'][0]['libelle'];
        this.descriptif = response['hydra:member'][0]['descriptif'];
      }
    )

    this.cpmtService.findAllCompetences().subscribe(
      (comp: any) => {
        this.cmptSuggestions = comp['hydra:member'];
      }
    )
  }

  // tslint:disable-next-line: typedef
  get f(){
    return this.formadd?.controls
  }

  editGrpCompt(): void{
    console.log(this.formadd.value);
    this.grpCpmtservice.editGrpCompt(this.id, this.formadd.value).subscribe(
      (response: any) => {
        console.log(response);
        Swal.fire(
          'Succes!',
          'Groupe Competence Modifier avec succes.',
          'success'
        );
        this.router.navigate(['/acceuil/grpCmpts']);
      },
      error => {
        console.log(error);
        alert(error.error.detail);
      }
    );
  }


}
