import { CpmtServicesService } from './../../competences/Services/cpmt-services.service'
import { Component, OnInit } from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {Router} from '@angular/router'
import {GrpCmptService} from '../Services/grp-cmpt.service'
import {Observable} from 'rxjs'
import {setTheme} from 'ngx-bootstrap/utils'
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-grp-cmpt',
  templateUrl: './add-grp-cmpt.component.html',
  styleUrls: ['./add-grp-cmpt.component.css']
})
export class AddGrpCmptComponent implements OnInit {


  formadd: FormGroup
  libelle
  descriptif
  competences = []
  cmptSuggestions = [];
  dropdownSettings: IDropdownSettings = {};


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private grpCpmtservice: GrpCmptService,
    private cpmtService: CpmtServicesService
  ) { setTheme('bs4') }
  ngOnInit(): void {
    this.formadd = this.formBuilder?.group({
      libelle: ['', [ Validators.required]],
      descriptif: ['', [ Validators.required]],
      competences: [],
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

  addGrpCompt(): void{
    console.log(this.formadd.value);
    this.grpCpmtservice.addGrpCpmt(this.formadd.value).subscribe(
      (response: any) => {
        console.log(response);
        Swal.fire(
          'Succes!',
          'Groupe Competence ajouter avec succes.',
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
