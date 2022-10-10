import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {CustomerPagination} from "../../../core/models/customer-pagination.model";
import {FormGroup} from "@angular/forms";
import {Customer} from "../../../core/models/customer.model";
import {KeycloakService} from "keycloak-angular";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  host = environment.host;

  constructor(private http: HttpClient, private keycloakService:KeycloakService) {
  }

  public getCustomer(id:number): Observable<Customer> {
    return this.http.get<Customer>(this.host + "customers/" + id);
  }

  public searchCustomer(elementPerPage: number, pageNumber: number, sortValue: string, sortDirection: string, searchFormGroup: FormGroup): Observable<CustomerPagination> {
    return this.http.get<CustomerPagination>(this.host + "customers/search?page=" + pageNumber +
      "&size=" + elementPerPage +
      "&sortBy=" + sortValue +
      "&direction=" + sortDirection +
      "&fullName=" + searchFormGroup.controls['fullName'].value +
      "&adress=" + searchFormGroup.controls['adress'].value +
      "&email=" + searchFormGroup.controls['email'].value +
      "&phoneNumber=" + searchFormGroup.controls['phoneNumber'].value +
      "&birthday=" + searchFormGroup.controls['birthday'].value);

    // "&fullName=" + searchFormGroup.controls['fullName'].value.toLowerCase() +
    // "&adress=" + searchFormGroup.controls['adress'].value.toLowerCase() +
    // "&email=" + searchFormGroup.controls['email'].value.toLowerCase() +
    // "&phoneNumber=" + searchFormGroup.controls['phoneNumber'].value.toLowerCase());
  }

  public saveCustomer(customer:Customer): Observable<Customer> {
    return this.http.post<Customer>(this.host + "customers/", customer);
  }

  public updateCustomer(id:number, customer:Customer): Observable<Customer> {
    return this.http.put<Customer>(this.host + "customers/"+id, customer);
  }

  public deleteCustomer(id:number){
    return this.http.delete(this.host + "customers/"+id);
  }
}
