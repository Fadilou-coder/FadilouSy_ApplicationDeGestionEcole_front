import { ReferentielService } from './../Service/referentiel.service';
import { GrpCmptService } from './../../grp-competences/Services/grp-cmpt.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit-referentiel',
  templateUrl: './edit-referentiel.component.html',
  styleUrls: ['./edit-referentiel.component.css']
})
export class EditReferentielComponent implements OnInit {

  formadd;
  libelle;
  presentation;
  programme;
  critereEvaluation;
  critereAdmission;
  pdfSrc;
  compts;
  selectedCompts;
  dropdownSettings: IDropdownSettings = {};

  constructor(
    private comptService: GrpCmptService,
    private refService: ReferentielService,
    private FormBuilder: FormBuilder,
    private route : ActivatedRoute,
    private router: Router
  ) { }

  id = this.route.snapshot.params['id'];

  ngOnInit(): void {
    this.refService.  getOneRef(this.id).subscribe(
      (response: any) => {
        const ref = response['hydra:member'][0];
        console.log(ref);
        this.libelle = ref.libelle;
        this.presentation = ref.presentation;
        this.critereAdmission = ref.critereAdmission;
        this.critereEvaluation = ref.critereEvaluation;
        this.selectedCompts = ref.grpeCompetences;
      }
    );


    this.formadd = this.FormBuilder.group({
      libelle: ['', [ Validators.required]],
      presentation: ['', [ Validators.required]],
      programme: ['', [ Validators.required]],
      critereEvaluation: ['', [ Validators.required]],
      critereAdmission: ['', [ Validators.required]],
      selectedCompts: '',
    });

    this.comptService.findAllGrpCompetences().subscribe(
      (response: any) => {
        this.compts = response['hydra:member'];
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

  upload(event: any){
    this.pdfSrc = event.target.files[0];
  }

  addRef(){
    console.log(this.formadd.value)
    console.log(this.pdfSrc);
    var formData = new FormData();
    formData.append('libelle', this.formadd.value.libelle);
    formData.append('presentation', this.formadd.value.presentation);
    formData.append('critereEvaluation', this.formadd.value.critereEvaluation);
    formData.append('critrreAdmission', this.formadd.value.critereAdmission);
    if (this.pdfSrc) {
      formData.append('programme', this.pdfSrc);
    }
    formData.append('grpCmpt', this.formadd.value.selectedCompts);
    this.refService.editRef(this.id, formData).subscribe(data => {
      console.log(data);
      Swal.fire(
        'Succes!',
        'Referentiel Modifier avec succes.',
        'success'
      );
      this.router.navigate(['/acceuil/referentiel'])

    }, err => { console.log(err); });
  }

}
