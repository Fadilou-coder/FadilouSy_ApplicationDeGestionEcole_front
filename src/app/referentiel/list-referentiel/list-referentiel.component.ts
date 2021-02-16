import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ReferentielService } from 'src/app/referentiel/Service/referentiel.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-list-referentiel',
  templateUrl: './list-referentiel.component.html',
  styleUrls: ['./list-referentiel.component.css']
})
export class ListReferentielComponent implements OnInit {

  constructor(
    private refService: ReferentielService,
    private sanitizer: DomSanitizer
  ) { }

  page = 1;
  Refs: any;
  nbrPage: any = 1;

  ngOnInit(): void {
    console.log(this.page);
    this.refService.findAllRefs().subscribe(
      (response: any) => {
        console.log(response);
        this.Refs = response['hydra:member'];
        if (response['hydra:view']){
          this.nbrPage = response['hydra:view']['hydra:last'];
          this.nbrPage = this.nbrPage.split('=')[1];
        }
        console.log(this.nbrPage);
      }
      ,
      (error: any) => { console.log(error); }
    );
  }
  archiverRef(id: any): any{
    Swal.fire({
      title: 'Etes vous sure?',
      text: 'Vous voulais vraiment supprimmer cet Utilisateur!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OUI!',
      cancelButtonText: 'Non, Annuler'
    }).then((result) => {
      if (result.value) {
              this.refService.archiverRef(id).subscribe(
                (response: any) => {
                  console.log(response);
                  Swal.fire(
                    'Deleted!',
                    'Your imaginary file has been deleted.',
                    'success'
                  )
                  this.refService.findAllRefs().subscribe(
                    // tslint:disable-next-line:no-shadowed-variable
                    (response: any) => {
                      console.log(response);
                      this.Refs = response['hydra:member'];
                      if (response['hydra:view']){
                        this.nbrPage = response['hydra:view']['hydra:last'];
                        this.nbrPage = this.nbrPage.split('=')[1];
                      }
                      console.log(this.nbrPage);
                    }
                    ,
                    (error: any) => {console.log(error)}
                  );
                },error => {
                  console.log(error);
                  alert(error.error.detail);
                })
      }
    });
  }

  suivant(): any{
    this.page++;
    this.refService.findAllRefs().subscribe(
      (response: any) => {
        console.log(response);
        this.Refs = response['hydra:member'];
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
    this.refService.findAllRefs().subscribe(
      (response: any) => {
        console.log(response);
        this.Refs = response['hydra:member'];
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

  downloadPdf(base64String, fileName){
    if(window.navigator && window.navigator.msSaveOrOpenBlob){
      // download PDF in IE
      let byteChar = atob(base64String);
      let byteArray = new Array(byteChar.length);
      for(let i = 0; i < byteChar.length; i++){
        byteArray[i] = byteChar.charCodeAt(i);
      }
      let uIntArray = new Uint8Array(byteArray);
      let blob = new Blob([uIntArray], {type : 'application/pdf'});
      window.navigator.msSaveOrOpenBlob(blob, `${fileName}.pdf`);
    } else {
      // Download PDF in Chrome etc.
      const source = `data:application/pdf;base64,${base64String}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `${fileName}.pdf`
      link.click();
    }
  }
  onClickDownloadPdf(r){
      let base64String = r.programme;
      this.downloadPdf(base64String,'Programme ('+r.libelle+')');
  }

}
