import { CpmtServicesService } from './../Services/cpmt-services.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GrpCmptService } from 'src/app/grp-competences/Services/grp-cmpt.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-cpmt',
  templateUrl: './edit-cpmt.component.html',
  styleUrls: ['./edit-cpmt.component.css']
})
export class EditCpmtComponent implements OnInit {

  id;
  formadd: FormGroup;
  libelle;
  grpCompts;
  grpAction1: string;
  grpAction2: string;
  grpAction3: string;
  crEv1: string;
  crEv2: string;
  crEv3: string;
  selectedGrpCompts;
  dropdownSettings: IDropdownSettings = {};


  constructor(
    private formBuilder: FormBuilder,
    private grpCmptservice: GrpCmptService,
    private comptService: CpmtServicesService,
    private router: Router,
    private url: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.url.snapshot.params['id'];
    this.formadd = this.formBuilder.group({
      libelle: ['', [ Validators.required]],
      selectedGrpCompts: '',
      grpAction1: ['', [ Validators.required]],
      grpAction2: ['', [ Validators.required]],
      grpAction3: ['', [ Validators.required]],
      crEv1: ['', [ Validators.required]],
      crEv2: ['', [ Validators.required]],
      crEv3: ['', [ Validators.required]],
    });

    this.grpCmptservice.findAllGrpCompetences().subscribe(
      (response: any) => {
        this.grpCompts = response['hydra:member'];
      }
    );

    this.comptService.findOnecmpt(this.id).subscribe(
      (response: any) => {
        console.log(response['hydra:member']);
        this.libelle = response['hydra:member'][0]['libelle'];
        this.selectedGrpCompts = response['hydra:member'][0]['grpeCompetences'];
        this.grpAction1 = response['hydra:member'][0]['niveau'][0]['groupeAction'];
        this.grpAction2 = response['hydra:member'][0]['niveau'][1]['groupeAction'];
        this.grpAction3 = response['hydra:member'][0]['niveau'][2]['groupeAction'];
        this.crEv1 = response['hydra:member'][0]['niveau'][0]['critereEvaluation'];
        this.crEv2 = response['hydra:member'][0]['niveau'][1]['critereEvaluation'];
        this.crEv3 = response['hydra:member'][0]['niveau'][2]['critereEvaluation'];

      }
    )

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'libelle',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  addCompt(){
    const niveaux = [
      {
        'libelle': 'Niveau1',
        'critereEvaluation': this.crEv1,
        'groupeAction': this.grpAction1,
      },
      {
        'libelle': 'Niveau2',
        'critereEvaluation': this.crEv2,
        'groupeAction': this.grpAction2,
      },
      {
        'libelle': 'Niveau3',
        'critereEvaluation': this.crEv3,
        'groupeAction': this.grpAction3,
      }
    ];
    const NouvComptetence = {
      'id': this.id,
      'libelle': this.libelle,
      'niveaux': niveaux,
      'grpeCompetences': this.selectedGrpCompts
    };
    console.log(NouvComptetence);
    this.comptService.putCpmt(this.id, NouvComptetence).subscribe(
      (response: any) => {
        console.log(response);
        Swal.fire(
          'Succes!',
          'Competence ajouter avec succes.',
          'success'
        )
        this.router.navigate(['/acceuil/cmpts']);
      },
      error => {
        console.log(error);
      }
    );
  }

}
