import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../../services/customer.service";
import {first, Observable} from "rxjs";
import {AppDataState} from "../../../../core/models/loading-state.model";
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
  @Input()
  viewMode!: boolean;

  data$: Observable<AppDataState<Customer>> | undefined;
  customerFormGroup!: FormGroup;
  submitted = false;

  constructor(private customerService: CustomerService, private fb: FormBuilder,
              private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.initCustomerFormGroup();
    console.log(this.viewMode);
  }

  initCustomerFormGroup() {

    this.customerFormGroup = this.fb.group({
      fullName: [{value: '', disabled: this.viewMode}, Validators.required],
      birthday: [{value: '', disabled: this.viewMode}, Validators.required],
      phoneNumber: [{value: '', disabled: this.viewMode}, Validators.required],
      adress: [{value: '', disabled: this.viewMode}, Validators.required],
      email: [{value: '', disabled: this.viewMode}, Validators.required],
    })

    if (this.id) {
      this.customerService.getCustomer(this.id)
        .pipe(first()).subscribe(c => {
        c.birthday = new Date(c.birthday);
        this.customerFormGroup.patchValue(c);
      });
    }
  }

  get c() {
    return this.customerFormGroup.controls;
  }

  showToast(message: string, title: string, status: string) {
    return this.toastrService.show(message, title, {status});
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.customerFormGroup.invalid || this.customerFormGroup.errors) {
      this.showToast('Formulaire invalid', 'Erreur', 'danger')
    }

    if (this.id) {
      console.log("Updating User");
    } else {
      console.log("New User");
    }
  }

}

