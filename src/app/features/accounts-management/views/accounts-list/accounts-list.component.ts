import {Component, OnInit} from '@angular/core';
import {catchError, map, Observable, of, startWith} from "rxjs";
import {AppDataState, DataStateEnum} from "../../../../core/models/loading-state.model";
import {NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {FormGroup} from "@angular/forms";
import {AccountPagination} from "../../../../core/models/account-pagination.model";
import {AccountsService} from "../../services/accounts.service";
import {AccountStatus} from "../../../../core/models/account-status.model";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements OnInit {

  data$: Observable<AppDataState<AccountPagination>> | undefined;
  errorMessage!: string;
  readonly DataStateEnum = DataStateEnum;
  AccountStatus = AccountStatus;
  elementPerPage = 10;
  pageNumber = 0;
  sortDirection = false;
  IsHidden = true;
  sortValue: string = "";
  currenSearchValue: string = "";
  positions = NbGlobalPhysicalPosition;
  firstEntry = true;
  searchFormGroup!: FormGroup;

  constructor(private accountService: AccountsService, private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.searchAccount();
  }

  searchAccount() {
    this.data$ = this.accountService.searchAccounts(this.elementPerPage, this.pageNumber, this.sortValue, this.sortDirection ? 'ASC' : 'DESC').pipe(
      map(response => {
        return ({dataState: DataStateEnum.LOADED, data: response})
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({
        dataState: DataStateEnum.ERROR,
        errorMessage: err.message,
        this: this.showToast('Une erreur technique est survenue', "Erreur", "danger")
      }))
    );
  }

  showToast(message: string, title: string, status: string) {
    return this.toastrService.show(message, title, {status, duration: 0});
  }
  onElementPerPageChange(event: string) {
    this.elementPerPage = +event;
    this.pageNumber = 0;
    this.searchAccount();

  }

  sortBy(value: string) {
    if (this.sortValue == value.toString()) {
      this.sortDirection = !this.sortDirection;
    } else {
      this.sortDirection = true;
      this.sortValue = value;
    }
    this.searchAccount();
  }

  onPageNumberChange(event: number) {
    this.pageNumber = event;
    this.searchAccount();
  }
  toTotalPages(i: number) {
    return new Array(i);
  }

}
