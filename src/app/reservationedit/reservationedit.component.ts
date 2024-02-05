import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SystemService } from 'src/app/services/system.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservationedit',
  templateUrl: './reservationedit.component.html',
  styleUrls: ['./reservationedit.component.css']
})
export class ReservationeditComponent implements OnInit {
  listReservations: any[] = [];
  listTypes: any[] = [];

  form: FormGroup;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private _SystemService: SystemService,
    private router: Router) {
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
    if (this._SystemService.GetDato() == 0) {
      this.toastr.error('Opss.. no data to load', 'Error');
    } else {
      //console.log(this._SystemService.GetReservationAux());
      this.form.controls['contactname'].setValue(this._SystemService.GetReservationAux().contactname);
      this.form.controls['contacttype'].setValue(this._SystemService.GetReservationAux().contacttype);
      this.form.controls['phonenumber'].setValue(this._SystemService.GetReservationAux().phonenumber);
      this.form.controls['birthdate'].setValue(this._SystemService.GetReservationAux().birthdate);
      this.form.controls['description'].setValue(this._SystemService.GetReservationAux().description);
    }
  }

  obtainReservations() {
    this._SystemService.ListAllReservations().subscribe(data => {
      console.log(data);
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

  editar() {
    if (this.form.get('phonenumber')?.value == "" ||
      this.form.get('contactname')?.value == "" ||
      this.form.get('contacttype')?.value == "" ||
      this.form.get('birthdate')?.value == "" ||
      this.form.get('description')?.value == "") {
      this.toastr.error('Empty fields!', 'Some fields are empty');
    } else {
      if (this.form.get('phonenumber')?.value.length != 8) {
        this.toastr.error('Phone Example (56788765) ', 'Phone must have 8 digits');
      } else {
        var typeX = this.listTypes.find(x => x.id == this.form.get('contacttype')?.value);

        const reservationAux: any = {
          id: this._SystemService.GetDato(),
          contactname: this.form.get('contactname')?.value,
          contacttype: typeX,
          phonenumber: this.form.get('phonenumber')?.value,
          birthdate: this.form.get('birthdate')?.value,
          description: this.form.get('description')?.value,
          rating: "1",
          dateBooking: new Date().toISOString(),
          favorita: 0
        }
        console.log(reservationAux);
        this._SystemService.UpdateReservations(reservationAux.id, reservationAux).subscribe(data => {

          this.toastr.success('The reservation was updated', 'Success update');
          this._SystemService.ResetReservationAux();
          this.form.reset();
          this.router.navigateByUrl('/reservation');
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
