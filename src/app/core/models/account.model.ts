import {AccountStatus} from "./account-status.model";
import {Customer} from "./customer.model";

export interface Account{
  id?: string;
  balance?: number;
  createdAt?: Date;
  status?:AccountStatus;
  customerDTO?: Customer;
  overDraft?:number;
  interestRate?:number;
  type?:string;
}
