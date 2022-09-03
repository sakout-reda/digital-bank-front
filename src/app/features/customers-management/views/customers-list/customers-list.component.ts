import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../services/customer.service";
import {catchError, debounceTime, map, Observable, of, startWith} from "rxjs";
import {AppDataState, DataStateEnum} from "../../../../core/models/loading-state.model";
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {CustomerPagination} from "../../../../core/models/customer-pagination.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CrudCustomerComponent} from "../crud-customer/crud-customer.component";

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {
  data$: Observable<AppDataState<CustomerPagination>> | undefined;
  errorMessage!: string;
  readonly DataStateEnum = DataStateEnum;
  // addFormActive = true;
  elementPerPage = 10;
  pageNumber = 0;
  sortDirection = false;
  IsHidden = true;
  sortValue: string = "";
  currenSearchValue: string = "";
  positions = NbGlobalPhysicalPosition;
  firstEntry = true;
  searchFormGroup!: FormGroup;

  constructor(private customerService: CustomerService, private toastrService: NbToastrService,
              private fb: FormBuilder, private dialogService: NbDialogService) {
  }

  ngOnInit(): void {
    // this.fetchData();
    this.initSearchForm();
    this.searchCustomerByKeyword();
  }

  searchCustomerByKeyword() {
    this.data$ = this.customerService.searchCustomer(this.elementPerPage, this.pageNumber, this.sortValue, this.sortDirection ? 'ASC' : 'DESC', this.searchFormGroup).pipe(
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

  // toggleAddForm() {
  //   this.addFormActive = !this.addFormActive;
  // }

  sortBy(value: string) {
    if (this.sortValue == value.toString()) {
      this.sortDirection = !this.sortDirection;
    } else {
      this.sortDirection = true;
      this.sortValue = value;
    }
    this.searchCustomerByKeyword();
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
    this.searchCustomerByKeyword();

  }

  onPageNumberChange(event: number) {
    this.pageNumber = event;
    this.searchCustomerByKeyword();
  }

  // onSearch(value: string, event: any) {
  onSearch() {
    this.searchFormGroup.valueChanges.pipe(
      debounceTime(1000)).subscribe(() => {
        this.searchCustomerByKeyword();
      }
    );

  }

  initSearchForm() {
    this.searchFormGroup = this.fb.group({
      fullName: this.fb.control(""),
      birthday: this.fb.control(""),
      phoneNumber: this.fb.control(""),
      adress: this.fb.control(""),
      email: this.fb.control(""),
    });
    this.onSearch();
  }

  onCrudCustomer(viewMode: boolean, id?: number, deleteMode?:boolean) {
    this.dialogService.open(CrudCustomerComponent, {
      context: {
        viewMode: viewMode,
        id: id,
        delete:deleteMode
      },
    });
  }
}
