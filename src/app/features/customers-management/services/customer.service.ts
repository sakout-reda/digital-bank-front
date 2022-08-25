import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {CustomerPagination} from "../../../core/models/customer-pagination.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  host = environment.host;
  constructor(private http:HttpClient) { }

  public getCustomers():Observable<CustomerPagination>{
    return this.http.get<CustomerPagination>(this.host+"customers");
  }
}
