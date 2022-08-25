import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../../../core/models/customer.model";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  host = environment.host;
  constructor(private http:HttpClient) { }

  public getCustomers():Observable<Customer[]>{
    return this.http.get<Customer[]>(this.host+"customers");
  }
}
