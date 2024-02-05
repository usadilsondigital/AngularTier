import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SystemService } from 'src/app/services/system.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  listReservations: any[] = [    ];
  /*contactname contacttype phonenumber  birthdate 
description(string) not null
rating(int)<5 default y minimo 1 hasta 5
bookingdate(datetime or string) now por defecto
favorite(bool) false por defecto */

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private _SystemService: SystemService,
    private router: Router) { 


    }

  ngOnInit(): void {
    this.obtainReservations();
  }

  onListDA() {
    this._SystemService.ListDA().subscribe(data => {
      console.log(data);
      this.listReservations = data;
    },
      error => {
        console.log(error);
      }
    )
  }
  onListDD() {
    this._SystemService.ListDD().subscribe(data => {
      console.log(data);
      this.listReservations = data;
    },
      error => {
        console.log(error);
      }
    )
  } 
  onListAA() {
    this._SystemService.ListAA().subscribe(data => {
      console.log(data);
      this.listReservations = data;
    },
      error => {
        console.log(error);
      }
    )
  }
  onListAD() {
    this._SystemService.ListAD().subscribe(data => {
      console.log(data);
      this.listReservations = data;
    },
      error => {
        console.log(error);
      }
    )
  }
  onListRank() {
    this._SystemService.ListRank().subscribe(data => {
      console.log(data);
      this.listReservations = data;
    },
      error => {
        console.log(error);
      }
    )
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
  editarTarjeta(reservation:any) {
    console.log(reservation);
   
   this._SystemService.SetDato(reservation.id);
   this._SystemService.SetReservationAux(reservation);
   this.router.navigateByUrl('/reservationedit');

  }

  eliminarTarjeta(reservation:any) {
    this._SystemService.deleteTarjeta(reservation.id).subscribe(data => {
      this.toastr.error('La Reservacion fue eliminada con exito!','Eliminada');
      this.obtainReservations();
    }, error => {
      console.log(error);
    })
  }

  hacerFavorita(reservation:any) {
    this._SystemService.callFavorita(reservation.id).subscribe(data => {
      this.toastr.success('The reservation was make favorite', 'Sucess favorited');
          this.obtainReservations();
    }, error => {
      console.log(error);
    })

  }

  quitarFavorita(reservation:any) {
    this._SystemService.uncallFavorita(reservation.id).subscribe(data => {
      this.toastr.success('The reservation was removed from favorite', 'Sucess remove favorite');
          this.obtainReservations();
    }, error => {
      console.log(error);
    })

  }

  //Change_Rankings
  hacer5Estrellas(reservation:any) {
    this._SystemService.call5Stars(reservation.id).subscribe(data => {
      this.toastr.success('The reservation is ranking 5 stars', 'Sucess ranking');
          this.obtainReservations();
    }, error => {
      console.log(error);
    })
  }
  hacer4Estrellas(reservation:any) {
    this._SystemService.call4Stars(reservation.id).subscribe(data => {
      this.toastr.success('The reservation is ranking 4 stars', 'Sucess ranking');
          this.obtainReservations();
    }, error => {
      console.log(error);
    })
  }
  hacer3Estrellas(reservation:any) {
    this._SystemService.call3Stars(reservation.id).subscribe(data => {
      this.toastr.success('The reservation is ranking 3 stars', 'Sucess ranking');
          this.obtainReservations();
    }, error => {
      console.log(error);
    })
  }
  hacer2Estrellas(reservation:any) {
    this._SystemService.call2Stars(reservation.id).subscribe(data => {
      this.toastr.success('The reservation is ranking 2 stars', 'Sucess ranking');
          this.obtainReservations();
    }, error => {
      console.log(error);
    })
  }
  hacer1Estrella(reservation:any) {
    this._SystemService.call1Star(reservation.id).subscribe(data => {
      this.toastr.success('The reservation is ranking 1 star', 'Sucess ranking');
          this.obtainReservations();
    }, error => {
      console.log(error);
    })
  }
  

}
