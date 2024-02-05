import { getLocaleDayNames } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SystemService } from 'src/app/services/system.service';

@Component({
  selector: 'app-reservationcreate',
  templateUrl: './reservationcreate.component.html',
  styleUrls: ['./reservationcreate.component.css']
})
export class ReservationcreateComponent implements OnInit {
  listReservations: any[] = [
  ];

  listTypes: any[] = [
  ];

  selectedType: any = [];

  form: FormGroup;
  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private _SystemService: SystemService) {
    this.form = this.fb.group({
      contactname: ['', Validators.required],
      contacttype: ['', Validators.required],
      phonenumber: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
      birthdate: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.obtainReservations();
    this.obtainTypes();
  }
  obtainReservations() {
    this._SystemService.ListAllReservations().subscribe(data => {
      this.listReservations = data;
    },
      error => {
        console.log(error);
      }
    )
  }
  obtainTypes() {
    this._SystemService.ListAllTypes().subscribe(data => {
      console.log(data);
      this.listTypes = data;
    },
      error => {
        console.log(error);
      }
    )
  }

  getTypeById(idX: number) {
    this._SystemService.GetTypes(idX).subscribe(data => {
      console.log(data);
      this.selectedType = data;
      return data;
    },
      error => {
        console.log(error);
      }
    )
  }


  addReservation() {
    if (this.form.get('phonenumber')?.value == "" ||
      this.form.get('contactname')?.value == "" ||
      this.form.get('contacttype')?.value == "" ||
      this.form.get('birthdate')?.value == "" ||
      this.form.get('description')?.value == "") {
      this.toastr.error('Empty fields!', 'Some fields are empty');
    } else {
      if (this.form.get('phonenumber')?.value.length != 8) {
        this.toastr.error('Phone Example (53325539) ', 'Phone must have 8 digits');
      } else {
        if (this.containNotOnlyNumber(this.form.get('phonenumber')?.value) === true) {
          this.toastr.error('Phone Example (53325539) ', 'Phone must have only digits');
        } else {
          if (this.invalidBirthDate(this.form.get('birthdate')?.value) === true) {
            this.toastr.error('It shouldn’t be possible to add this date as a birthdate.', 'Birthdate invalid');
          } else {

            var typeX = this.listTypes.find(x => x.id == this.form.get('contacttype')?.value);

            const reservationAux: any = {
              contactname: this.form.get('contactname')?.value,
              contacttype: typeX,
              phonenumber: this.form.get('phonenumber')?.value,
              birthdate: this.form.get('birthdate')?.value,
              description: this.form.get('description')?.value,
              rating: "1",
              dateBooking: new Date().toISOString(),
              favorita: 0
            }


            this._SystemService.saveReservations(reservationAux).subscribe(data => {

              this.toastr.success('The reservation was created', 'Sucess creation');
              this.obtainReservations();
              this.form.reset();
            },
              error => {
                console.log(error);
                this.toastr.error('creation failed!', 'create reservation');
              }
            )
            this.form.reset();
          }
        }
      }
    }
  }


  containNotOnlyNumber(values: String) {
    var counter = 0;
    for (let i = 0; i < 8; i++) {
      let valor = values.charAt(i);
      if (valor == '0' || valor == '1' || valor == '2' || valor == '3' || valor == '4'
        || valor == '5' || valor == '6' || valor == '7' || valor == '8' || valor == '9') {
        counter++;
      }
    }
    if (counter == 8) { return false; }
    else { return true; }

  }

  invalidBirthDate(fechaNac: String) {
    var yearString = fechaNac.slice(0, 4);
    var monthString = fechaNac.slice(5, 7);
    var dayString = fechaNac.slice(8, 10);
    
    var yearNumber = parseInt(yearString);
    var monthNumber = parseInt(monthString);
    var dayNumber = parseInt(dayString);


    var fechaNacDate = new Date(yearNumber, monthNumber - 1, dayNumber + 1);
    
    var dNow = new Date();

    return fechaNacDate >dNow;
    /*console.log(dNow.getFullYear());
    console.log(dNow.getMonth() + 1);
    console.log(dNow.getDate());*/
  }

}
