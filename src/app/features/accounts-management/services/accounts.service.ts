import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {KeycloakService} from "keycloak-angular";
import {AccountPagination} from "../../../core/models/account-pagination.model";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  host = environment.host;

  constructor(private http: HttpClient, private keycloakService:KeycloakService) {
  }


  public searchAccounts(elementPerPage: number, pageNumber: number, sortValue: string, sortDirection: string): Observable<AccountPagination> {
    return this.http.get<AccountPagination>(this.host + "accounts?page=" + pageNumber +
      "&size=" + elementPerPage +
      "&sortBy=" + sortValue +
      "&direction=" + sortDirection);
  }
}
