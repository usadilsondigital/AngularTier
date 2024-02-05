import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  private myAppUrl = "http://localhost:47453/";
  private myApiReservationsUrl = "api/Reservations/";
  private myApiTypesUrl = "api/Types/";
  private myApiContactsUrl = "api/Contacts/";

  private datoID = 0;
  private reservationAuxiliar: any = {
    contactname: "",
    contacttype: [],
    phonenumber: "",
    birthdate: "",
    description: "",
    rating: "1",
    dateBooking: new Date().toISOString(),
    favorita: 0
  }


  constructor(private http: HttpClient) { }

  ListAllReservations(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiReservationsUrl);
  }

  ListAllTypes(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiTypesUrl);
  }

  ListAllContacts(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiContactsUrl);
  }

  /* Stored procedure testing*/
  ListGetAlphabeticTypesAscending(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiTypesUrl + "GetAlphabeticTypesAscending");
  }

  ListAA(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiReservationsUrl + "AlphabeticAscending");
  }

  ListAD(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiReservationsUrl + "AlphabeticDescending");
  }

  ListDA(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiReservationsUrl + "DateAscending");
  }

  ListDD(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiReservationsUrl + "DateDescending");
  }
  ListRank(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiReservationsUrl + "Ranking");
  }

  saveReservations(reservation: any): Observable<any> {
    console.log(this.myAppUrl + this.myApiReservationsUrl);
    return this.http.post(this.myAppUrl + this.myApiReservationsUrl, reservation);
  }

  UpdateReservations(id: number, reservation: any) {
    console.log(id);
    console.log(reservation);

    return this.http.put(this.myAppUrl + this.myApiReservationsUrl + id, reservation);
  }

  GetDato() {
    return this.datoID;
  }

  SetDato(dato_param: number) {
    this.datoID = dato_param;
  }

  ResetReservationAux() {
    this.reservationAuxiliar.contactname = "",
      this.reservationAuxiliar.contacttype = null,
      this.reservationAuxiliar.phonenumber = "",
      this.reservationAuxiliar.birthdate = new Date().toISOString(),
      this.reservationAuxiliar.description = "",
      this.reservationAuxiliar.rating = "1",
      this.reservationAuxiliar.dateBooking = new Date().toISOString(),
      this.reservationAuxiliar.favorita = 0
  }
  GetReservationAux() {
    return this.reservationAuxiliar;
  }
  SetReservationAux(reservationAuxiliar: any) {
    this.reservationAuxiliar = reservationAuxiliar;
  }


  GetTypes(id: number): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiTypesUrl + id);
  }
/**Delete */
deleteTarjeta(id: number): Observable<any> {
  console.log(this.myAppUrl + this.myApiReservationsUrl + id);
  return this.http.delete(this.myAppUrl + this.myApiReservationsUrl + id)
}

callFavorita(id: number): Observable<any>{
  console.log(this.myAppUrl + this.myApiReservationsUrl +"Favorite/"+ id);
  return this.http.get(this.myAppUrl + this.myApiReservationsUrl+"Favorite/"+id);
}

uncallFavorita(id: number): Observable<any>{
  console.log(this.myAppUrl + this.myApiReservationsUrl +"Unfavorite/"+ id);
  return this.http.get(this.myAppUrl + this.myApiReservationsUrl+"Unfavorite/"+id);
}

//rankings
call5Stars(id: number): Observable<any>{
  console.log(this.myAppUrl + this.myApiReservationsUrl +"Ranking5/"+ id);
  return this.http.get(this.myAppUrl + this.myApiReservationsUrl+"Ranking5/"+id);
}
call4Stars(id: number): Observable<any>{
  console.log(this.myAppUrl + this.myApiReservationsUrl +"Ranking4/"+ id);
  return this.http.get(this.myAppUrl + this.myApiReservationsUrl+"Ranking4/"+id);
}
call3Stars(id: number): Observable<any>{
  console.log(this.myAppUrl + this.myApiReservationsUrl +"Ranking3/"+ id);
  return this.http.get(this.myAppUrl + this.myApiReservationsUrl+"Ranking3/"+id);
}
call2Stars(id: number): Observable<any>{
  console.log(this.myAppUrl + this.myApiReservationsUrl +"Ranking2/"+ id);
  return this.http.get(this.myAppUrl + this.myApiReservationsUrl+"Ranking2/"+id);
}
call1Star(id: number): Observable<any>{
  console.log(this.myAppUrl + this.myApiReservationsUrl +"Ranking1/"+ id);
  return this.http.get(this.myAppUrl + this.myApiReservationsUrl+"Ranking1/"+id);
}

}
