import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../services/customer.service";
import {catchError, map, Observable, of, startWith} from "rxjs";
import {Customer} from "../../../../core/models/customer.model";
import {AppDataState, DataStateEnum} from "../../../../core/models/loading-state.model";
import {NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {
  customers$: Observable<AppDataState<Customer[]>> |undefined;
  errorMessage!:string;
  readonly DataStateEnum=DataStateEnum;
  addFormActive = true;
  elementPerPage = 10;
  positions = NbGlobalPhysicalPosition;


  constructor(private customerService:CustomerService, private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.customers$=this.customerService.getCustomers().pipe(
      map(data=>{
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message, this:this.showToast( 'Une erreur technique est survenue',"Erreur","danger")}))
    );
  }

  toggleAddForm() {
    this.addFormActive = !this.addFormActive;
    console.log("im working");
  }

  sortBy(value: string) {
    value.toString();
    switch (value) {
      case 'fullName': {
        console.log(("Sorting By : fullName"))
        break;
      }
      case 'birthday': {
        console.log(("Sorting By : birthday"))
        break;
      }
      case 'phoneNumber': {
        console.log(("Sorting By : phoneNumber"))
        break;
      }
      case 'adress': {
        console.log(("Sorting By : adress"))
        break;
      }
      case 'email': {
        console.log(("Sorting By : email"))
        break;
      }
    }
  }

  showToast(message:string, title:string, status:string) {
    this.toastrService.show( message, title,{status, duration:0} );
  }

}
