import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {CustomerPagination} from "../../../core/models/customer-pagination.model";
import {Customer} from "../../../core/models/customer.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  host = environment.host;

  constructor(private http: HttpClient) {
  }

  public getCustomers(elementPerPage: number, pageNumber: number, sortValue: string, sortDirection: String): Observable<CustomerPagination> {
    return this.http.get<CustomerPagination>(this.host + "customers?page=" + pageNumber + "&size=" + elementPerPage + "&sortBy=" + sortValue + "&direction=" + sortDirection);
    // return this.http.get<CustomerPagination>(this.host + "customers?page=" + pageNumber + "&size=" + elementPerPage + "&sortBy=" + sortValue + "&direction=" + sortDirection
    //   + "&fullName=" + customer.fullName + "&adress=" + customer.adress + "&email=" + customer.email + "&phoneNumber=" + customer.phoneNumber);
  }
}
