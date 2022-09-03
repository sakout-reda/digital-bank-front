import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../../services/customer.service";
import {first, Observable} from "rxjs";
import {AppDataState} from "../../../../core/models/loading-state.model";
import {Customer} from "../../../../core/models/customer.model";
import {NbToastrService} from "@nebular/theme";

@Component({
  selector: 'DB-add-edit-customer',
  templateUrl: './crud-customer.component.html',
  styleUrls: ['./crud-customer.component.scss']
})
export class CrudCustomerComponent implements OnInit {

  @Input()
  id!: number;
  @Input()
  viewMode!: boolean;
  @Input()
  delete!: boolean;

  data$: Observable<AppDataState<Customer>> | undefined;
  customerFormGroup!: FormGroup;
  submitted = false;

  constructor(private customerService: CustomerService, private fb: FormBuilder,
              private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.initCustomerFormGroup();
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
    if (!this.customerFormGroup.valid) {
      this.onCustomerInvalid();
    } else if (this.id && this.customerFormGroup.valid) {
      this.onUpdateCustomer();
    } else if (!this.id && this.customerFormGroup.valid) {
      this.onAddCustomer();
    }
  }

  onCustomerInvalid() {
    this.showToast('Formulaire invalid', 'Erreur', 'danger');
  }

  onAddCustomer() {
    let customer: Customer = this.customerFormGroup.value;
    this.customerService.saveCustomer(customer).subscribe({
      next: () => {
        this.showToast('Customer Added', 'Success', 'success');
      },
      error: () => {
        this.showToast('Une erreur est survenu', 'Erreur', 'danger');
      }
    });
  }

  onUpdateCustomer() {
    let customer: Customer = this.customerFormGroup.value;
    this.customerService.updateCustomer(this.id, customer).subscribe({
      next: () => {
        this.showToast('Customer updated', 'Success', 'success');
      },
      error: () => {
        this.showToast('Une erreur est survenu', 'Erreur', 'danger');
      }
    });
  }

  onDelete() {
    this.customerService.deleteCustomer(this.id).subscribe({
      next: () => {
        this.showToast('Customer Deleted', 'Success', 'success');
      },
      error: () => {
        this.showToast('Une erreur est survenu', 'Erreur', 'danger');
      }
    });
  }
}

