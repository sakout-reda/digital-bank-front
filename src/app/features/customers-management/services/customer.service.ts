import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {CustomerPagination} from "../../../core/models/customer-pagination.model";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  host = environment.host;

  constructor(private http: HttpClient) {
  }

  // public getCustomers(elementPerPage: number, pageNumber: number, sortValue: string, sortDirection: String): Observable<CustomerPagination> {
  //   return this.http.get<CustomerPagination>(this.host + "customers?page=" + pageNumber + "&size=" + elementPerPage + "&sortBy=" + sortValue + "&direction=" + sortDirection);
  // }

  public searchCustomer(elementPerPage: number, pageNumber: number, sortValue: string, sortDirection: String, searchFormGroup: FormGroup): Observable<CustomerPagination> {
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
}
