import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../../services/customer.service";
import {catchError, map, Observable, of, startWith} from "rxjs";
import {AppDataState, DataStateEnum} from "../../../../core/models/loading-state.model";
import {Customer} from "../../../../core/models/customer.model";
import {NbToastrService} from "@nebular/theme";

@Component({
  selector: 'DB-add-edit-customer',
  templateUrl: './add-edit-customer.component.html',
  styleUrls: ['./add-edit-customer.component.scss']
})
export class AddEditCustomerComponent implements OnInit {

  @Input()
  id!: number;
  data$: Observable<AppDataState<Customer>> | undefined;
  customerFormGroup!: FormGroup;
  readonly DataStateEnum = DataStateEnum;

  constructor(private customerService: CustomerService, private fb:FormBuilder,
              private toastrService: NbToastrService) {}

  ngOnInit(): void {
    this.initCustomerFormGroup();
  }

  initCustomerFormGroup() {

    if(this.id){
      this.fetchUserById();
    }
    else{
      this.initCustomerForm();
    }

  }

  fetchUserById() {

    this.data$ = this.customerService.getCustomer(this.id).pipe(
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

  initCustomerForm(){
    this.customerFormGroup = this.fb.group({
      fullName: this.fb.control(""),
    });
  }

  showToast(message: string, title: string, status: string) {
    return this.toastrService.show(message, title, {status, duration: 0});
  }
  onSaveCustomer(){

  }

}

