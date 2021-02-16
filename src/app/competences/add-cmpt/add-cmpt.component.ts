import { CpmtServicesService } from './../Services/cpmt-services.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GrpCmptService } from 'src/app/grp-competences/Services/grp-cmpt.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-cmpt',
  templateUrl: './add-cmpt.component.html',
  styleUrls: ['./add-cmpt.component.css']
})
export class AddCmptComponent implements OnInit {

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
    private router: Router
  ) { }

  ngOnInit(): void {
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

//   selectedStudents(grpCompts){
//     this.grpComptArray = grpCompts;
//  }

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
      'libelle': this.libelle,
      'niveaux': niveaux,
      'grpeCompetences': this.selectedGrpCompts
    };
    console.log(NouvComptetence);
    this.comptService.addCpmt(NouvComptetence).subscribe(
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
        alert('Cet Compétence existe deja');
        console.log(error);
      }
    );
  }

}
