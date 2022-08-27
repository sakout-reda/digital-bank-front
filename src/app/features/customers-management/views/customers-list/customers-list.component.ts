import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../services/customer.service";
import {catchError, map, Observable, of, startWith} from "rxjs";
import {AppDataState, DataStateEnum} from "../../../../core/models/loading-state.model";
import {NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {CustomerPagination} from "../../../../core/models/customer-pagination.model";

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {
  data$: Observable<AppDataState<CustomerPagination>> | undefined;
  errorMessage!: string;
  readonly DataStateEnum = DataStateEnum;
  addFormActive = true;
  elementPerPage = 10;
  pageNumber = 0;
  sortDirection = true;
  IsHidden = true;
  sortValue: string = "";
  positions = NbGlobalPhysicalPosition;


  constructor(private customerService: CustomerService, private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.fetchData();

  }

  fetchData() {
    this.data$ = this.customerService.getCustomers(this.elementPerPage, this.pageNumber, this.sortValue, this.sortDirection ? 'ASC' : 'DESC').pipe(
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

  toggleAddForm() {
    this.addFormActive = !this.addFormActive;
    console.log("im working");
  }

  sortBy(value: string) {
    if (this.sortValue == value.toString()) {
      this.sortDirection = !this.sortDirection;
    } else {
      this.sortDirection = true;
      this.sortValue = value;
    }
    this.fetchData();
  }


  showToast(message: string, title: string, status: string) {
    return this.toastrService.show(message, title, {status, duration: 0});
  }

  toTotalPages(i: number) {
    return new Array(i);
  }

  onElementPerPageChange(event: string) {
    this.elementPerPage = +event;
    this.pageNumber = 0;
    this.fetchData();

  }

  onPageNumberChange(event: number) {
    this.pageNumber = event;
    this.fetchData();
  }
}
